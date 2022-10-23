import {
  CoreVoting__factory,
  SimpleProxy__factory,
  Timelock__factory,
  VestingVault__factory,
} from "@elementfi/council-typechain";
import { Provider } from "@ethersproject/providers";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { BytesLike, ethers } from "ethers";
import hre from "hardhat";

import addressesJson from "src/addresses";
import timelockInterface from "src/interfaces/Timelock.json";
import vaultInterface from "src/interfaces/UnfrozenVestingVault.json";
import { UnfrozenVestingVault__factory } from "src/interfaces/UnfrozenVestingVault__factory";

const DAY_IN_BLOCKS = 6496;

const grants: Grants[] = [
  {
    method: "removeGrant",
    who: "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC", // signer 2 (has a grant)
  },
  {
    method: "addGrantAndDelegate",
    who: "0x70997970C51812dc3A010C7d01b50e0d17dc79C8", // signer 1 (doesn't have a grant)
    amount: "1000000000000000000", // 1e18
    startTime: "0",
    expiration: "1000",
    cliff: "100",
    delegatee: "0x0000000000000000000000000000000000000001", // delegate to the ONE address
  },
];

async function main() {
  const signers: SignerWithAddress[] = await hre.ethers.getSigners();
  const [owner, signer0, signer1, signer2, signer3] = signers;
  const provider = hre.ethers.getDefaultProvider();

  //*************************************************//
  // first, deploy the unfrozen vesting vault
  //*************************************************//
  console.log("first, deploy the unfrozen vesting vault");
  const deployer = new UnfrozenVestingVault__factory(owner);
  const staleBlockLag = DAY_IN_BLOCKS * 30;
  const { elementToken } = addressesJson.addresses;
  const unfrozenVault = await deployer.deploy(elementToken, staleBlockLag);

  //*************************************************//
  // now create the proposoal
  //*************************************************//
  console.log("now create the proposal");
  const { coreVoting, timeLock, vestingVault, lockingVault } =
    addressesJson.addresses;
  console.log("vestingVault", vestingVault);
  const vestingVaultProxy = SimpleProxy__factory.connect(vestingVault, owner);
  const frozenVaultAddress = await vestingVaultProxy.proxyImplementation();

  const votingVaultAddresses = [lockingVault];

  // note that lockingVault doesn't require extra data when querying vote power, so we stub with "0x00"
  const extraVaultData = ["0x00"];

  const proposalInfo = await createVestingGrantsUpgradeProposal(
    owner,
    provider,
    coreVoting,
    timeLock,
    vestingVault,
    unfrozenVault.address,
    frozenVaultAddress,
    votingVaultAddresses,
    extraVaultData,
    grants,
  );

  //*************************************************//
  // expire the proposal so it passes
  //*************************************************//
  // first check that it's passing
  const { proposalId, targets, callDatas, targetsTimeLock, calldatasTimeLock } =
    proposalInfo;
  const coreVotingContract = CoreVoting__factory.connect(coreVoting, owner);
  const votingPower = await coreVotingContract.getProposalVotingPower(
    proposalId,
  );
  const quorum = await coreVotingContract.baseQuorum();
  // [yes, no, maybe] voting power
  if (votingPower[0].lt(quorum)) {
    console.log("not enough voting power to pass");
    return;
  }
  const lockDuration = await coreVotingContract.lockDuration();
  const lockDurationHexString = lockDuration.toHexString().replace("0x0", "0x");
  console.log("lockDurationHexString", lockDurationHexString);
  // hardcoding for now because formatting is hard
  await hre.network.provider.send("hardhat_mine", [lockDurationHexString]);

  console.log("execute proposal");
  const result = await coreVotingContract.execute(
    proposalId,
    targets,
    callDatas,
  );
  const txReceipt = await result.wait(1);
  console.log("txReceipt status", txReceipt.status);

  const timeLockContract = Timelock__factory.connect(timeLock, owner);
  const waitTime = await timeLockContract.waitTime();
  const waitTimeHexString = waitTime.add(1).toHexString().replace("0x0", "0x");
  console.log("waitTimeHexString", waitTimeHexString);
  // hardcoding for now because formatting is hard
  await hre.network.provider.send("hardhat_mine", [waitTimeHexString]);
  await timeLockContract.execute(targetsTimeLock, calldatasTimeLock);

  //*************************************************//
  // check to see that vesting vault address is the original
  //*************************************************//
  const vestingProxy = SimpleProxy__factory.connect(vestingVault, owner);
  const implementationAddress = await vestingProxy.proxyImplementation();
  console.log("implementationAddress", implementationAddress);
  console.log("frozenVaultAddress", frozenVaultAddress);

  //*************************************************//
  // check to see that the grants are updated as expected
  //*************************************************//
  const vestingVaultContract = VestingVault__factory.connect(
    vestingVault,
    owner,
  );

  const signer1Grant = await vestingVaultContract.getGrant(signer1.address);
  const signer2Grant = await vestingVaultContract.getGrant(signer2.address);
  console.log("signer1Grant", signer1Grant);
  console.log("signer2Grant", signer2Grant);
}
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

type Grants = RemoveGrant | AddGrant;
interface RemoveGrant {
  method: "removeGrant";
  // address of who gets grant
  who: string;
}

interface AddGrant {
  method: "addGrantAndDelegate";
  // address of who gets grant
  who: string;
  // amount of the grant
  amount?: string;
  // when the grant starts in unix seconds
  startTime?: string;
  // when the grant ends in unix seconds
  expiration?: string;
  // when the grant starts vesting in unix seconds
  cliff?: string;
  // who to initially delegate to
  delegatee?: string;
}

interface ProposalInfo {
  proposalId: string;
  votingVaults: string[];
  extraVaultData: string[];
  targets: string[];
  callDatas: string[];
  targetsTimeLock: string[];
  calldatasTimeLock: string[];
  lastCall: string;
  ballot: string;
}

export async function createVestingGrantsUpgradeProposal(
  owner: SignerWithAddress,
  provider: Provider,
  coreVotingAddress: string,
  timeLockAddress: string,
  // vesting vault proxy address
  vestingVaultAddress: string,
  // upgraded vesting vault implementation address
  unfrozenVaultAddress: string,
  // original vesting vault implementation address
  frozenVaultAddress: string,
  // voting vaults to query vote power from to submit proposal
  votingVaultAddresses: string[],
  // extra data for voting vaults if necessary
  extraVaultData: string[],
  // grants to add/remove
  grants: Grants[],
): Promise<ProposalInfo> {
  /********************************************************************************
   * Set up a new proposal.  This proposal will perform 3 actions:
   *   1. temporarily upgrade the VestingVault's implementation to one that can add AND remove grants
   *   2. perform necessary updates to grants
   *   3. reset the VestingVault back to the original implementation.
   ********************************************************************************/

  // step 1 is to update the vesting vault implementation address
  const proxyInterface = new ethers.utils.Interface(SimpleProxy__factory.abi);
  const calldataProxyUpgrade = proxyInterface.encodeFunctionData(
    "upgradeProxy",
    [unfrozenVaultAddress],
  );

  // step 2 is to add/remove a bunch of grants
  const vestingVaultInterface = new ethers.utils.Interface(vaultInterface.abi);
  const callDatasUpdateGrant: string[] = [];
  grants.forEach((grant) => {
    const { method } = grant;
    if (method === "addGrantAndDelegate") {
      const { who, amount, startTime, expiration, cliff, delegatee } = grant;
      const values = [who, amount, startTime, expiration, cliff, delegatee];
      const calldata = vestingVaultInterface.encodeFunctionData(method, values);
      callDatasUpdateGrant.push(calldata);
    }

    if (method === "removeGrant") {
      const { who } = grant;
      const values = [who];
      const calldata = vestingVaultInterface.encodeFunctionData(method, values);
      callDatasUpdateGrant.push(calldata);
    }
  });

  // step 3 is to reset the vesting vault implementation address
  const calldataProxyDowngrade = proxyInterface.encodeFunctionData(
    "upgradeProxy",
    [frozenVaultAddress],
  );

  const calldatasTimeLock = [
    calldataProxyUpgrade,
    ...callDatasUpdateGrant,
    calldataProxyDowngrade,
  ];

  // we are only hitting the vesting vault's proxy address
  const targetsTimeLock = calldatasTimeLock.map(() => vestingVaultAddress);
  const callHashTimelock = await createCallHash(
    calldatasTimeLock,
    targetsTimeLock,
  );

  // console the info sent to the timelock
  console.log("calldatasTimeLock", calldatasTimeLock);
  console.log("targetsTimeLock", targetsTimeLock);
  console.log("callHashTimelock", callHashTimelock);
  console.log("");

  // create the arguments to coreVoting.proposal()
  const coreVotingContract = CoreVoting__factory.connect(
    coreVotingAddress,
    owner,
  );
  const tInterface = new ethers.utils.Interface(timelockInterface.abi);
  const calldataCoreVoting = tInterface.encodeFunctionData("registerCall", [
    callHashTimelock,
  ]);

  const targets = [timeLockAddress];
  const callDatas = [calldataCoreVoting];
  const currentBlock = await provider.getBlockNumber();
  // last chance to execute to vote is ~14 days from current block
  const lastCall = DAY_IN_BLOCKS * 14 + currentBlock;

  const ballot = 0; // 0 - YES, 1 - NO, 2 - ABSTAIN
  const tx = await coreVotingContract.proposal(
    votingVaultAddresses,
    extraVaultData,
    targets,
    callDatas,
    lastCall,
    ballot,
  );
  await tx.wait(1);

  // just getting the proposalId
  const proposalCreatedEvents = await coreVotingContract.queryFilter(
    coreVotingContract.filters.ProposalCreated(),
    currentBlock,
  );
  const proposalId = proposalCreatedEvents[0].args[0].toNumber();

  const proposalArgs = [
    ["proposalId", proposalId],
    ["votingVaults", votingVaultAddresses],
    ["extraVaultData", extraVaultData],
    ["targets", targets],
    ["callDatas", callDatas],
    ["targetsTimeLock", targetsTimeLock],
    ["calldatasTimeLock", calldatasTimeLock],
    ["lastCall", lastCall],
    ["ballot", ballot],
  ];

  console.log("Proposal created with:");
  proposalArgs.forEach(([name, value]) => console.log(name, value));

  const proposalInfo: ProposalInfo = Object.fromEntries(proposalArgs);
  return proposalInfo;
}

async function createCallHash(
  calldata: BytesLike[],
  targets: string[],
): Promise<string> {
  const toBeHashed = ethers.utils.defaultAbiCoder.encode(
    ["address[]", "bytes[]"],
    [targets, calldata],
  );
  return ethers.utils.keccak256(toBeHashed);
}
