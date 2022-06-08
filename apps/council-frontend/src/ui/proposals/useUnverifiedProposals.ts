import { Proposal } from "@elementfi/council-proposals";
import { useSmartContractEvents } from "@elementfi/react-query-typechain/src/hooks/useSmartContractEvents/useSmartContractEvents";
import { Contract } from "ethers";
import { getFromBlock } from "src/addresses/getFromBlock";
import { coreVotingContract, gscCoreVotingContract } from "src/contracts";
import { t } from "ttag";

/**
 * @param {Proposal[]} proposals List of proposals from the proposals JSON
 * @param {Contract} [contract = coreVotingContract] optional -- defaults to coreVotingContract, use useGSCUnverifiedProposals for its GSC counterpart
 * @returns {Proposa[]} An array of unverified onchain proposals
 */
export function useUnverifiedProposals(
  proposals: Proposal[],
  contract: Contract = coreVotingContract,
): Proposal[] {
  const { data: events = [] } = useSmartContractEvents(
    contract,
    "ProposalCreated",
    { fromBlock: getFromBlock() },
  );

  const whitelistedProposalIds = proposals.map((proposal) => {
    return proposal.proposalId;
  });

  const unverifiedProposalEvents = events.filter((event) => {
    const proposalEventId = (event?.args?.[0]).toString();
    return !whitelistedProposalIds.includes(proposalEventId);
  });

  return unverifiedProposalEvents.map((event) => {
    const args = event?.args;

    return {
      proposalHash: "",
      proposalId: (args?.[0]).toString(),
      created: (args?.[1]).toNumber(),
      title: t`UNKNOWN PROPOSAL`,
      description: t`WARNING: This proposal has not been verified!  It may contain malicious code, please check the forums or Discord for guidance on how to vote on this proposal.`,
      createdTimestamp: 0,
      expiration: (args?.[3]).toNumber(),
      unlock: 0,
      lastCall: 0,
      forumLink: "",
      quorum: "",
      targets: [""],
      calldatas: [""],
      snapshotId: "",
    };
  });
}

/**
 * @param {Proposal[]} proposals List of proposals from the proposals JSON
 * @returns {Proposa[]} An array of unverified onchain GSC proposals
 */
export function useGSCUnverifiedProposals(proposals: Proposal[]): Proposal[] {
  return useUnverifiedProposals(proposals, gscCoreVotingContract);
}
