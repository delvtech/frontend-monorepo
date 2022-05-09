import { CoreVoting } from "@elementfi/elf-council-typechain";
import { useSmartContractEvents } from "@elementfi/react-query-typechain";
import { QueryObserverResult, useQuery } from "react-query";
import { gscCoreVotingContract } from "src/elf/contracts";

function useProposalAuthor(
  contract: CoreVoting,
  proposalId: string,
): QueryObserverResult<string> {
  const { data: events = [] } = useSmartContractEvents(
    contract,
    "ProposalCreated",
  );
  const proposalCreatedEvent = events.find((event) => {
    const propId = event?.args?.[0] as string;
    return propId === proposalId;
  });

  return useQuery({
    queryFn: async () => {
      if (!proposalCreatedEvent) {
        return;
      }
      const { from } = await proposalCreatedEvent.getTransaction();
      return from;
    },
    queryKey: ["proposal-author", contract.address, proposalId],
    enabled: !!proposalCreatedEvent,
  });
}

export function useGSCProposalAuthor(
  proposalId: string,
): QueryObserverResult<string> {
  return useProposalAuthor(gscCoreVotingContract, proposalId);
}
