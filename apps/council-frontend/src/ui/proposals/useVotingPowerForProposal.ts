import { useSmartContractReadCall } from "@elementfi/react-query-typechain/src/hooks/useSmartContractReadCall/useSmartContractReadCall";

import { coreVotingContract } from "src/contracts";
import { VotingPower } from "src/proposals/VotingPower";

/**
 * Returns the voting power for a given proposal.
 * @param {string} proposalId the id of the proposal
 * @returns {VotingPower} an array of BigNumbers tallying results in the format [YES, NO, MAYBE]
 */
export function useVotingPowerForProposal(
  proposalId: string | undefined,
): VotingPower | undefined {
  const { data: votingPower } = useSmartContractReadCall(
    coreVotingContract,
    "getProposalVotingPower",
    {
      callArgs: [proposalId as string],
      enabled: !!proposalId,
    },
  );

  return votingPower;
}
