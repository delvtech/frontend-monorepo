import {
  CoreVoting__factory,
  GSCVault__factory,
} from "@elementfi/council-typechain";
import { Provider } from "@ethersproject/providers";
import { parseEther } from "@ethersproject/units";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { BytesLike, ethers } from "ethers";

// TODO: get from tokenlist
const goerliAddressList = {
  addresses: {
    airdrop: "0xb7920477F7A39c3DffA925076857eB1585503e1B",
    coreVoting: "0x0CB8aa45068EE31e97B717b0B35e26A43884c84c",
    elementToken: "0x2b1a91De5B9C3Ad6439eeAeD0E481F8cf6E22601",
    gscCoreVoting: "0x600c4926c9F88beCE3533ceaAA36804d6E23F1c1",
    gscVault: "0x0A575bFA79454112c37B9Af2a6362c9c68f7d2e3",
    lockingVault: "0xb5E8AF575Ee302A24c6C7746a99D895BeF67cb5D",
    optimisticGrants: "0x092B49777CB45dc4939FBc4029ce7a116D63D29D",
    optimisticRewardsVault: "0x0000000000000000000000000000000000000000",
    spender: "0x722289C399e6f4AbCE80FaFbABC9a9876432834C",
    timeLock: "0x36687bdD319a78AB4b4347f3A7459Da235AFc4f4",
    treasury: "0xd46dDb33A33FD3D352d08cc7022Ce1f5c6ccFF1a",
    vestingVault: "0xe69D2F8DeD2924e0845118E7E467Fc97F7994ef6",
  },
  chainId: 5,
};

interface GscProposalOptions {
  ballot?: number;

  expired?: boolean;
}

export async function createGoerliGscProposal(
  owner: SignerWithAddress,
  provider: Provider,
  options: GscProposalOptions,
): Promise<void> {
  // 2 is abstain
  const { ballot = 2, expired } = options;

  const {
    addresses: { gscVault, gscCoreVoting },
  } = goerliAddressList;

  /********************************************************************************
   * Set up a new proposal.  This proposal will update the votingPowerBand, or the minimum vote
   * power required to get onto the GSC.
   ********************************************************************************/
  const gscCoreVotingContract = CoreVoting__factory.connect(
    gscCoreVoting,
    owner,
  );

  // setup calldata for the gsc vault's setVotingPowerBound
  const gscVaultInterface = new ethers.utils.Interface(GSCVault__factory.abi);
  const votingPowerBound = parseEther("110");
  const callData = gscVaultInterface.encodeFunctionData("setVotePowerBound", [
    votingPowerBound,
  ]);

  // get the callhash, this is how Timelock determines if the call is valid before it executes it
  const callHash = await createCallHash([callData], [gscVault]);

  // The GSC core voting contract only has one voting vault, which is the gscVault.
  const votingVaults = [gscVault];

  // note that lockingVault doesn't require extra data when querying vote power, so we stub with "0x00"
  const extraVaultData = ["0x00"];
  const targets = [gscVault];
  const callDatas = [callData];
  const currentBlock = await provider.getBlockNumber();
  const oneDayInBlocks = await gscCoreVotingContract.DAY_IN_BLOCKS();
  const lastCall = oneDayInBlocks.toNumber() * 9 + currentBlock;

  // record lock duration and extra vote time, set custom if provided
  const baseLockDuration = await gscCoreVotingContract.lockDuration();
  const baseVoteTime = await gscCoreVotingContract.extraVoteTime();
  if (expired) {
    (await gscCoreVotingContract.setLockDuration(1)).wait(1);
    (await gscCoreVotingContract.changeExtraVotingTime(1)).wait(1);
  }

  const tx = await gscCoreVotingContract.proposal(
    votingVaults,
    extraVaultData,
    targets,
    callDatas,
    lastCall,
    ballot,
  );
  await tx.wait(1);

  // just getting the proposalId
  const proposalCreatedEvents = await gscCoreVotingContract.queryFilter(
    gscCoreVotingContract.filters.ProposalCreated(),
    currentBlock,
  );
  const proposalId = proposalCreatedEvents[0].args[0].toNumber();

  // reset lock duration and extra vote time to to original values
  if (expired) {
    (await gscCoreVotingContract.setLockDuration(baseLockDuration)).wait(1);
    (await gscCoreVotingContract.changeExtraVotingTime(baseVoteTime)).wait(1);
  }

  const proposalArgs = [
    ["proposalId", proposalId],
    ["callHash", callHash],
    ["votingVaults", votingVaults],
    ["extraVaultData", extraVaultData],
    ["targets", targets],
    ["callDatas", callDatas],
    ["lastCall", lastCall],
    ["ballot", ballot],
  ];

  console.log("Proposal created with:");
  proposalArgs.forEach(([name, value]) => console.log(name, value));
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
