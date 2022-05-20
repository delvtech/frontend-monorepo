import { CoreVoting } from "@elementfi/elf-council-typechain";
import { useSmartContractEvents } from "@elementfi/react-query-typechain/src/hooks/useSmartContractEvents/useSmartContractEvents";
import { QueryObserverResult, useQuery } from "react-query";
import { getFromBlock } from "src/elf-council-addresses/getFromBlock";
import { gscCoreVotingContract } from "src/elf/contracts";

function useProposalAuthor(
  contract: CoreVoting,
  proposalId: string,
): QueryObserverResult<string> {
  const { data: events = [] } = useSmartContractEvents(
    contract,
    "ProposalCreated",
    { fromBlock: getFromBlock() },
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
