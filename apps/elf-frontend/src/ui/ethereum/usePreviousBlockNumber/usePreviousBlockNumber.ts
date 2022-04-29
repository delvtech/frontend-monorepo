import { useQuery, UseQueryOptions, UseQueryResult } from "react-query";

import { AVG_MINE_RATE_SECONDS } from "elf/miningRate";
import { defaultProvider } from "elf/providers/providers";

export function usePreviousBlockNumber(
  secondsAgo: number | undefined,
  queryOptions?: UseQueryOptions,
): UseQueryResult<number, unknown> {
  const result = useQuery({
    queryKey: [["blockattimestamp"], { secondsAgo: secondsAgo }],
    queryFn: async () => {
      const lastestBlockNumber = await defaultProvider.getBlockNumber();

      if (!secondsAgo || secondsAgo <= 0) {
        return lastestBlockNumber;
      }

      const numBlocksSinceTimestamp = Math.round(
        secondsAgo / AVG_MINE_RATE_SECONDS,
      );
      const blockNumberAtTimestamp =
        lastestBlockNumber - numBlocksSinceTimestamp;

      return blockNumberAtTimestamp;
    },
    ...queryOptions,
  });

  return result as UseQueryResult<number, unknown>;
}
