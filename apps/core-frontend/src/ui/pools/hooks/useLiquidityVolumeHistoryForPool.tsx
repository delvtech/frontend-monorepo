import { formatUnits } from "ethers/lib/utils";

import { useSwaps } from "ui/pools/hooks/useSwaps/useSwaps";
import { useCurrencyPref } from "ui/prefs/useCurrency/useCurencyPref";
import { useTokenPrice } from "ui/token/hooks/useTokenPrice";
import { EMPTY_ARRAY } from "base/emptyArray";
import { ONE_DAY_IN_SECONDS } from "base/time";
import { getPoolTokens } from "elf/pools/getPoolTokens";
import { PoolInfo } from "elf/pools/PoolInfo";
import { TimeData } from "elf/charts/TimeData";

/**
 * Returns the fiat volume for a pool in a given time range
 * @param poolIno contract of the pool to query.
 * @param fromTime time in seconds previous to now to start the query
 * @param toTime time in seconds previous to now to end the query.  if no value given, ends at
 * latest block.
 * @returns {Array<BigNumber>} an array of deltas for each token in the pool
 * over the time period. values in ascending token address order.
 */
export function useVolumeHistoryForPool(
  poolInfo: PoolInfo,
  fromTime: number = ONE_DAY_IN_SECONDS,
  toTime?: number,
): TimeData[] | undefined {
  const {
    baseAssetContract,
    baseAssetInfo: { decimals: baseAssetDecimals, address: baseAssetAddress },
  } = getPoolTokens(poolInfo);
  const swapEvents = useSwaps(poolInfo, fromTime, toTime);
  const { currency } = useCurrencyPref();
  const { data: baseAssetFiatPrice } = useTokenPrice(
    baseAssetContract,
    currency,
  );

  if (swapEvents?.length && baseAssetContract && baseAssetFiatPrice) {
    return swapEvents.map((swapEvent) => {
      const [, tokenIn, , amountIn, amountOut, timeMs] = swapEvent;
      // only count base asset so we don't double count volume.
      const amount = baseAssetAddress === tokenIn ? amountIn : amountOut;
      const value = Math.abs(+formatUnits(amount, baseAssetDecimals));
      return {
        value,
        timeMs,
      };
    });
  }

  return EMPTY_ARRAY as TimeData[];
}
