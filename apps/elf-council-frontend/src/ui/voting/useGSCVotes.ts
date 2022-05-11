import { useQuery, UseQueryResult } from "react-query";
import { BigNumber } from "ethers";

import { coreVotingContract } from "src/elf/contracts";

enum Ballot {
  YES,
  NO,
  MAYBE,
  ABSTAIN,
}

/**
 * Returns a map of GSC member addresses to vote ballot status
 * in options.
 * @param addresses query for all GSC member addresses
 * @param proposalId filter by proposal id
 * @returns UseQueryResult<Record<Ballot, string[]>, unknown>
 */
export function useGSCVotes(
  addresses: string[] = [],
  proposalId: string | undefined,
): UseQueryResult<Record<Ballot, string[]>> {
  return useQuery({
    queryKey: proposalId,
    queryFn: async () => {
      const results: Record<Ballot, string[]> = {
        [Ballot.YES]: [],
        [Ballot.NO]: [],
        [Ballot.MAYBE]: [],
        [Ballot.ABSTAIN]: [],
      };

      const ballots = await Promise.all(
        addresses.map(async (address) => {
          const vote = await coreVotingContract.votes(
            address,
            BigNumber.from(proposalId),
          );
          return { address, ballot: vote.castBallot };
        }),
      );

      ballots.forEach(({ address, ballot }) => {
        if (ballot === Ballot.YES) {
          results[Ballot.YES] = results[Ballot.YES].concat(address);
          return;
        }

        if (ballot === Ballot.NO) {
          results[Ballot.NO] = results[Ballot.NO].concat(address);
          return;
        }

        if (ballot === Ballot.MAYBE) {
          results[Ballot.MAYBE] = results[Ballot.MAYBE].concat(address);
          return;
        }

        results[Ballot.ABSTAIN] = results[Ballot.ABSTAIN].concat(address);
      });

      return results;
    },
  });
}
