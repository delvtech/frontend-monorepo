import { QueryObserverResult, useQuery } from "react-query";
import zip from "lodash.zip";
import { gscCoreVotingContract } from "src/elf/contracts";
import { Ballot } from "src/ui/voting/Ballot";

export function useGSCVotes(
  members: string[],
  proposalId: string,
): QueryObserverResult<Record<string, Ballot>> {
  return useQuery({
    queryFn: async () => {
      const results = await Promise.all(
        members.map((member) =>
          gscCoreVotingContract.votes(member, proposalId),
        ),
      );

      // if there is no entry found, the smart contract will return:
      // {
      //   votePower: 0, ballot: 0,
      // }
      // for the gsc, the vote power for each member is either 0 or 1, so setting the ballot to
      // undefined indicates there was no ballot found, i.e. the member didn't vote on this
      // proposal.
      // voting power can also be zero if the member is still in idle mode.  need to make sure they
      // have voting power before we allow them to vote!
      const ballots = results.map(([votingPower, ballot]) =>
        votingPower.isZero() ? undefined : ballot,
      );
      const entries = zip(members, ballots) as [string, Ballot | undefined][];
      const ballotsByMember = Object.fromEntries(entries);
      return ballotsByMember;
    },
    queryKey: ["gsc-member-votes", proposalId, members],
  });
}
