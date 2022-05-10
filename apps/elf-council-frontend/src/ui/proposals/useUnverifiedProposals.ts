import { Proposal } from "@elementfi/elf-council-proposals";
import { useSmartContractEvents } from "@elementfi/react-query-typechain";
import { Contract } from "ethers";
import { getFromBlock } from "src/elf-council-addresses/getFromBlock";
import { coreVotingContract, gscCoreVotingContract } from "src/elf/contracts";

interface ProposalEventArgs {
  proposalId: string;
  created: string;
  execution: string;
  expiration: string;
}

/**
 * Returns a list of unverified proposals
 *
 * @param proposals List of proposals from the proposals JSON
 * @param contract optional: defaults to coreVotingContract, use useGSCUnverifiedProposals for its GSC counterpart
 */
export function useUnverifiedProposals(
  proposals: Proposal[],
  contract: Contract = coreVotingContract,
): ProposalEventArgs[] {
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
    const args = event?.args?.map((arg) => arg.toString());

    return {
      proposalId: args?.[0],
      created: args?.[1],
      execution: args?.[2],
      expiration: args?.[3],
    };
  });
}

export function useGSCUnverifiedProposals(
  proposals: Proposal[],
): ProposalEventArgs[] {
  return useUnverifiedProposals(proposals, gscCoreVotingContract);
}
