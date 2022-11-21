import { getLatestBlockNumber } from "src/utils/getLatestBlockNumber";
import { provider } from "./../../../core-testnet/src/tokenlist/weightedPools";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { parseEther } from "ethers/lib/utils";
import { ethers } from "hardhat";
import { HardhatRuntimeEnvironment } from "hardhat/types";

import { deployCoreVoting } from "src/scripts/deployCoreVoting";
import { deployGSCVault } from "src/scripts/deployGSCVault";
import { deployLockingVault } from "src/scripts/deployLockingVault";
import { deploySpender } from "src/scripts/deploySpender";
import { deployTimelock } from "src/scripts/deployTimelock";
import { deployTreasury } from "src/scripts/deployTreasury";
import { deployVestingVault } from "src/scripts/deployVestingVault";
import { deployVotingToken } from "src/scripts/deployVotingToken";

const SMALL_SPEND_LIMIT = parseEther("1");
const MEDIUM_SPEND_LIMIT = parseEther("10");
const HIGH_SPEND_LIMIT = parseEther("100");

export interface GovernanceContracts {
  elementToken: string;
  coreVoting: string;
  gscCoreVoting: string;
  gscVault: string;
  timeLock: string;
  lockingVault: string;
  vestingVault: string;
  optimisticRewardsVault: string;
  optimisticGrants: string;
  treasury: string;
  spender: string;
  airdrop: string;
  githubTier1Airdrop: string;
  githubTier2Airdrop: string;
  githubTier3Airdrop: string;
  discordTier1Airdrop: string;
  discordTier2Airdrop: string;
  discordTier3Airdrop: string;
}

export async function deployGovernanace(
  hre: HardhatRuntimeEnvironment,
  signer: SignerWithAddress,
): Promise<GovernanceContracts> {
  console.log("signer", signer.address);
  console.log("block", await hre.ethers.provider.getBlockNumber());
  const votingToken = await deployVotingToken(hre, signer);
  console.log("deployed voting token");

  // deploy core voting contract, we'll have to fill in address values later
  const coreVoting = await deployCoreVoting(
    hre,
    signer,
    [],
    signer.address,
    // set quorum to 50 ELFI so any test account can pass a vote
    "50",
    // set minProposalPower to 50 ELFI so any test account can make a proposal
    "50",
    // don't care about the gsc vault yet, that will get set after we deploy the gsc vault
    ethers.constants.AddressZero,
    // can execute a proposal 10 blocks after it gets created
    "10",
    // can vote on a proposal up to 300k blocks ~ 1 week on goerli
    300_000,
  );
  console.log("deployed empty core voting");

  // deploy the core voting vault controlled by the GSC Vault
  const gscCoreVoting = await deployCoreVoting(
    hre,
    signer,
    [],
    // setting the signer here to the timelock owner here so I can use 'authorize' later.
    signer.address,
    // base quorum is 1, any gsc member can pass a vote
    "1",
    // min proposal power to 1, not actually checked, isAuthorized is used to bypass for gsc
    "1",
    ethers.constants.AddressZero,
  );
  console.log("deployed empty gsc core voting");

  const timeLock = await deployTimelock(
    hre,
    signer,
    // can execute a proposal 10 blocks after it gets created
    "10",
    signer.address,
    signer.address,
  );
  console.log("deployed timelock");

  const gscVault = await deployGSCVault(
    hre,
    signer,
    // GSC vault depends on core voting contract to get the list of verified vaults which is used to
    // prove membership on the GSC.
    coreVoting.address,
    // any test account can get onto GSC with this much vote power
    "100",
    // set owner to signer for now
    signer.address,
  );
  console.log("deployed gsc vault");

  // deploy locking vault behind a proxy so it's upgradeable
  const lockingVault = await deployLockingVault(
    hre,
    signer,
    votingToken.address,
    timeLock.address,
    // set queryVotePower 300k.  a user's vote power can be used on proposal for this long.
    // can vote on a proposal up to 300k blocks ~ 1 week on goerli
    300_000,
  );
  console.log("deployed locking vault");

  // deploy vesting vault
  const vestingVault = await deployVestingVault(
    hre,
    signer,
    votingToken.address,
    timeLock.address,
    // set queryVotePower 300k.  a user's vote power can be used on proposal for this long.
    // can vote on a proposal up to 300k blocks ~ 1 week on goerli
    300_000,
  );
  console.log("deployed vesting vault");

  const treasuryContract = await deployTreasury(hre, signer, timeLock.address);
  console.log("deployed treasury contract");

  const spenderContract = await deploySpender(
    hre,
    signer,
    timeLock.address,
    treasuryContract.address,
    votingToken.address,
    SMALL_SPEND_LIMIT,
    MEDIUM_SPEND_LIMIT,
    HIGH_SPEND_LIMIT,
  );

  // add approved voting vaults. signer is still the owner so we can set these
  await coreVoting.changeVaultStatus(lockingVault.address, true);
  await coreVoting.changeVaultStatus(vestingVault.address, true);
  console.log("added vaults to core voting");

  // set idle duration to 1 minute
  await gscVault.setIdleDuration(60);
  // add approved governance vaults. signer is still the owner so we can set these
  await gscCoreVoting.changeVaultStatus(gscVault.address, true);
  console.log("added vaults to gsc core voting");

  // finalize permissions for coreVoting contract, gscCoreVoting is authorized to make proposoals
  // without needing minimum proposal power, setting the owner to timelock so that it can execute
  // proposals.
  await coreVoting.setOwner(timeLock.address);
  console.log("set permissions for core voting");

  // finalize permissions for timeLock contract,
  // gsc is authorized so that it can delay the execution of proposals in the timelock
  await timeLock.authorize(gscCoreVoting.address);
  // coreVoting is the owner so that it can post proposals to the timelock.
  await timeLock.setOwner(coreVoting.address);
  console.log("set permissions for time lock contract");

  // finalize permissions for gscCoreVoting contract
  // timelock is owner so upgrades to this contract have to go through normal proposal flow.
  await gscCoreVoting.setOwner(timeLock.address);
  console.log("set permissions for time gsc core voting");

  // finalize permissions for vestingVault contract
  await vestingVault.setTimelock(timeLock.address);
  console.log("Set permissions for vesting vault");

  return {
    airdrop: ethers.constants.AddressZero,
    coreVoting: coreVoting.address,
    discordTier1Airdrop: ethers.constants.AddressZero,
    discordTier2Airdrop: ethers.constants.AddressZero,
    discordTier3Airdrop: ethers.constants.AddressZero,
    elementToken: votingToken.address,
    githubTier1Airdrop: ethers.constants.AddressZero,
    githubTier2Airdrop: ethers.constants.AddressZero,
    githubTier3Airdrop: ethers.constants.AddressZero,
    gscCoreVoting: gscCoreVoting.address,
    gscVault: gscVault.address,
    lockingVault: lockingVault.address,
    optimisticGrants: ethers.constants.AddressZero,
    optimisticRewardsVault: ethers.constants.AddressZero,
    spender: spenderContract.address,
    timeLock: timeLock.address,
    treasury: treasuryContract.address,
    vestingVault: vestingVault.address,
  };
}
