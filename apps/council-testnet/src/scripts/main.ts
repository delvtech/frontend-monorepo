import { vestingContract } from "src/contracts";
import "hardhat-ethernal";

import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { AddressesJsonFile } from "@elementfi/council-tokenlist";
import {
  GSCVault__factory,
  LockingVault__factory,
  MockERC20__factory,
  VestingVault__factory,
} from "@elementfi/council-typechain";
import { BigNumber, ethers, Signer } from "ethers";
import { BytesLike, formatEther, parseEther } from "ethers/lib/utils";
import fs from "fs";
import hre from "hardhat";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import {
  deployGovernanace,
  GovernanceContracts,
} from "src/scripts/deployGovernance";

async function main() {
  const signers: SignerWithAddress[] = await hre.ethers.getSigners();
  const [
    owner,
    signer1,
    gscMember1,
    gscMember2,
    gscMember3,
    candidate1,
    candidate2,
    candidate3,
  ] = signers;
  const accounts = signers.map((s) => s.address);
  const governanceContracts = await deployGovernanace(hre, owner, signers);
  console.log("governanceContracts", governanceContracts);
  const {
    elementToken,
    lockingVault,
    vestingVault,
    treasury,
    gscVault,
    timeLock,
  } = governanceContracts;

  await giveVotingPowerToAccount(owner, "50", elementToken, lockingVault);
  await giveVotingPowerToAccount(signer1, "50", elementToken, lockingVault);
  await giveVotingPowerToAccount(gscMember1, "110", elementToken, lockingVault);
  await giveVotingPowerToAccount(gscMember2, "120", elementToken, lockingVault);
  await giveVotingPowerToAccount(gscMember3, "130", elementToken, lockingVault);
  await giveVotingPowerToAccount(candidate1, "90", elementToken, lockingVault);
  await giveVotingPowerToAccount(candidate2, "80", elementToken, lockingVault);
  await giveVotingPowerToAccount(candidate3, "70", elementToken, lockingVault);

  await giveAccountsVotingTokens(owner, accounts, elementToken);

  await giveTreasuryVotingTokens(owner, treasury, elementToken);

  await allocateGrants(hre, elementToken, vestingVault, signers);

  // finalize permissions for vestingVault contract
  const vestingVaultContract = VestingVault__factory.connect(
    vestingVault,
    owner,
  );
  await vestingVaultContract.setManager(timeLock);
  await vestingVaultContract.setTimelock(timeLock);

  console.log("Set permissions for vesting vault");

  await joinGSC(gscMember1, gscVault, [lockingVault], ["0x00"]);
  await joinGSC(gscMember2, gscVault, [lockingVault], ["0x00"]);
  await joinGSC(gscMember3, gscVault, [lockingVault], ["0x00"]);
  await changeDelegation(gscMember3, gscMember2.address, lockingVault);
  await kickGSC(gscMember3, gscVault);

  writeAddressesJson(governanceContracts);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

function writeAddressesJson(governanceContracts: GovernanceContracts) {
  // Produce a schema-compliant testnet.addresses.json file
  const addressesJson: AddressesJsonFile = {
    chainId: 31337,
    addresses: {
      ...governanceContracts,
    },
  };
  const schemaAddresses = JSON.stringify(addressesJson, null, 2);

  console.log("testnet.addresses.json", schemaAddresses);
  fs.writeFileSync("./src/addresses/testnet.addresses.json", schemaAddresses);
}

async function giveAccountsVotingTokens(
  tokenOwner: Signer,
  accounts: string[],
  votingTokenAddress: string,
) {
  const tokenContract = MockERC20__factory.connect(
    votingTokenAddress,
    tokenOwner,
  );
  await Promise.all(
    accounts.map((address) =>
      // seed balances
      tokenContract.setBalance(address, parseEther("50")),
    ),
  );
  console.log("accounts given voting tokens");
}

async function giveTreasuryVotingTokens(
  tokenOwner: Signer,
  treasuryAddress: string,
  votingTokenAddress: string,
) {
  const tokenContract = MockERC20__factory.connect(
    votingTokenAddress,
    tokenOwner,
  );
  await tokenContract.setBalance(treasuryAddress, parseEther("5000000"));
  console.log("treasury given balance");
}

// give grants to signer[2] and signer[3]
async function allocateGrants(
  hre: HardhatRuntimeEnvironment,
  grantTokenAddress: string,
  vestingVault: string,
  signers: SignerWithAddress[],
) {
  const tokenContract = MockERC20__factory.connect(
    grantTokenAddress,
    signers[0],
  );
  // signers[0] is the owner of the vesting vault
  const vestingVaultContract = VestingVault__factory.connect(
    vestingVault,
    signers[0],
  );

  // set multiplier to 5%
  await vestingVaultContract.changeUnvestedMultiplier(5);

  // depsoit tokens to the vesting vault for allocating grants
  await (
    await tokenContract.setBalance(signers[0].address, parseEther("200"))
  ).wait(1);
  await (
    await tokenContract.setAllowance(
      signers[0].address,
      vestingVault,
      ethers.constants.MaxUint256,
    )
  ).wait(1);
  await (await vestingVaultContract.deposit(parseEther("200"))).wait(1);

  // grants with cliff of 50 blocks and expiration of 100 blocks:

  // signer 2 is delegating to signer 1
  const provider = hre.ethers.getDefaultProvider();
  const blockNumber = await provider.getBlockNumber();
  await (
    await vestingVaultContract.addGrantAndDelegate(
      signers[2].address,
      parseEther("100"),
      blockNumber,
      blockNumber + 100,
      50,
      signers[1].address,
    )
  ).wait(1);

  // fully vested grant
  await (
    await vestingVaultContract.addGrantAndDelegate(
      signers[3].address,
      parseEther("100"),
      blockNumber,
      blockNumber,
      0,
      signers[3].address,
    )
  ).wait(1);

  console.log("vesting grants given to signers[2] and signers[3]");
}

async function giveVotingPowerToAccount(
  account: SignerWithAddress,
  amount: string,
  elementToken: string,
  lockingVault: string,
) {
  const lockingVaultContract = LockingVault__factory.connect(
    lockingVault,
    account,
  );

  const elementTokenContract = MockERC20__factory.connect(
    elementToken,
    account,
  );
  const setBalTx = await elementTokenContract.setBalance(
    account.address,
    parseEther(amount),
  );
  await setBalTx.wait(1);

  const setAllowanceTx = await elementTokenContract.setAllowance(
    account.address,
    lockingVault,
    ethers.constants.MaxUint256,
  );
  await setAllowanceTx.wait(1);

  const depositTx = await lockingVaultContract.deposit(
    account.address,
    parseEther(amount),
    account.address,
  );
  await depositTx.wait(1);

  const latestBlock = await hre.ethers.provider.getBlockNumber();
  const votePower: BigNumber = (await lockingVaultContract.queryVotePowerView(
    account.address,
    latestBlock,
  )) as unknown as BigNumber;

  console.log(
    Number(formatEther(votePower)),
    " vote power given to ",
    account.address,
  );
}

async function joinGSC(
  signer: SignerWithAddress,
  gscVaultAddress: string,
  vaultAddresses: string[],
  extraData: BytesLike[],
) {
  const gscVault = GSCVault__factory.connect(gscVaultAddress, signer);

  await gscVault.proveMembership(vaultAddresses, extraData);
}

async function kickGSC(signer: SignerWithAddress, gscVaultAddress: string) {
  const gscVault = GSCVault__factory.connect(gscVaultAddress, signer);

  await gscVault.kick(signer.address, ["0x00"]);
}

async function changeDelegation(
  account: SignerWithAddress,
  who: string,
  lockingVault: string,
) {
  const lockingVaultContract = LockingVault__factory.connect(
    lockingVault,
    account,
  );

  await lockingVaultContract.changeDelegation(who);
}
