import { useSmartContractReadCall } from "@elementfi/react-query-typechain/src/hooks/useSmartContractReadCall/useSmartContractReadCall";

import { gscCoreVotingContract } from "src/elf/contracts";
import { VotingPower } from "src/elf/proposals/VotingPower";

/**
 * Returns the voting power for a given proposal.
 * @param {string} proposalId the id of the proposal
 * @returns {VotingPower} an array of BigNumbers tallying results in the format [YES, NO, MAYBE]
 */
export function useVotingPowerForGSCProposal(
  proposalId: string | undefined,
): VotingPower | undefined {
  const { data: votingPower } = useSmartContractReadCall(
    gscCoreVotingContract,
    "getProposalVotingPower",
    {
      callArgs: [proposalId as string],
      enabled: !!proposalId,
    },
  );

  return votingPower;
}
