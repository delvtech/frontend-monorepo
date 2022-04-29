import { BigNumber } from "ethers";

import { useConvertToFiat } from "ui/money/hooks/useConvertToFiat";
import { useSwaps } from "ui/pools/hooks/useSwaps/useSwaps";
import { useCurrencyPref } from "ui/prefs/useCurrency/useCurencyPref";
import { useTokenPrice } from "ui/token/hooks/useTokenPrice";
import { ONE_DAY_IN_SECONDS } from "base/time";
import { getPoolTokens } from "elf/pools/getPoolTokens";
import { PoolInfo } from "elf/pools/PoolInfo";

/**
 * Returns the fiat volume for a pool in a given time range
 * @param pool contract of the pool to query.
 * @param fromTime time in seconds previous to now to start the query
 * @param toTime time in seconds previous to now to end the query.  if no value given, ends at
 * latest block.
 * @returns {Array<BigNumber>} an array of deltas for each token in the pool
 * over the time period. values in ascending token address order.
 */
export function useVolumeForPool(
  poolInfo: PoolInfo,
  fromTime: number = ONE_DAY_IN_SECONDS,
  toTime?: number,
): number | undefined {
  const { baseAssetContract, baseAssetInfo } = getPoolTokens(poolInfo);
  const swapEvents = useSwaps(poolInfo, fromTime, toTime);
  const { currency } = useCurrencyPref();
  const { data: baseAssetFiatPrice } = useTokenPrice(
    baseAssetContract,
    currency,
  );

  let volume = BigNumber.from(0);
  if (swapEvents?.length && baseAssetContract) {
    swapEvents.forEach((swapEvent) => {
      const [, tokenIn, , amountIn, amountOut] = swapEvent;
      // only count base asset so we don't double count volume.
      const amount = baseAssetInfo.address === tokenIn ? amountIn : amountOut;
      volume = volume.add(amount);
    });
  }

  const fiatVolume = useConvertToFiat(
    baseAssetFiatPrice,
    volume,
    baseAssetInfo.decimals,
  );

  return fiatVolume?.toDecimal();
}
