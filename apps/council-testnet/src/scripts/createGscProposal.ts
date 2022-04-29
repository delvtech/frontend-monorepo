import {
  CoreVoting__factory,
  GSCVault__factory,
} from "@elementfi/elf-council-typechain";
import { Provider } from "@ethersproject/providers";
import { parseEther } from "@ethersproject/units";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { BytesLike, ethers } from "ethers";

import addressesJson from "src/addresses";

interface GscProposalOptions {
  ballot?: number;

  expired?: boolean;
}

export async function createGscProposal(
  owner: SignerWithAddress,
  provider: Provider,
  options: GscProposalOptions,
): Promise<void> {
  // 2 is abstain
  const { ballot = 2, expired } = options;

  const {
    addresses: { gscVault, gscCoreVoting },
  } = addressesJson;

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
