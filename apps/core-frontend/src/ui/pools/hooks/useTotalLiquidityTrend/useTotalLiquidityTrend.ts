import { formatUnits } from "ethers/lib/utils";

import { getQueryData } from "ui/base/queryResults";
import { usePoolSpotPrice } from "ui/pools/hooks/usePoolSpotPrice/usePoolSpotPrice";
import { usePoolTokens } from "ui/pools/hooks/usePoolTokens/usePoolTokens";
import { useTokenDeltasForPool } from "ui/pools/hooks/useTokenDeltasForPool/useTokenDeltasForPool";
import { ONE_DAY_IN_SECONDS } from "base/time";
import { getPoolContract } from "elf/pools/getPoolContract";
import { getPoolTokens } from "elf/pools/getPoolTokens";
import { PoolInfo } from "elf/pools/PoolInfo";

/**
 * Returns the amount of liquidity added or removed for each token in a time period.
 * @param pool contract of the pool to query.
 * @param fromTime time in seconds to query back to from now.
 * @returns {number} the liquidity trend as a decimal +/- percent.
 */
export function useTotalLiquidityTrend(
  poolInfo: PoolInfo,
  fromTime: number = ONE_DAY_IN_SECONDS,
): number | undefined {
  const {
    baseAssetContract,
    baseAssetInfo,
    termAssetInfo,
    baseAssetIndex,
    termAssetIndex,
  } = getPoolTokens(poolInfo);
  const pool = getPoolContract(poolInfo.address);
  const poolTokensResult = usePoolTokens(pool);
  const tokenAddresses = getQueryData(poolTokensResult)?.[0];
  const tokenBalances = getQueryData(poolTokensResult)?.[1];
  const tokenDeltas = useTokenDeltasForPool(pool, fromTime);

  // assumes that yield asset and base asset have the same decimals
  const spotPrice = usePoolSpotPrice(pool, termAssetInfo.address);

  if (
    !tokenAddresses ||
    !tokenBalances ||
    !tokenDeltas ||
    !baseAssetContract ||
    !spotPrice
  ) {
    return undefined;
  }

  const baseAssetBalance = +formatUnits(
    tokenBalances[baseAssetIndex],
    baseAssetInfo.decimals,
  );
  const baseAssetDelta = +formatUnits(
    tokenDeltas[baseAssetIndex],
    baseAssetInfo.decimals,
  );

  const termAssetBalance = +formatUnits(
    tokenBalances[termAssetIndex],
    termAssetInfo.decimals,
  );
  const termAssetDelta = +formatUnits(
    tokenDeltas[termAssetIndex],
    termAssetInfo.decimals,
  );

  // balance of both tokens added up, normalized to base asset
  const overallBalance = baseAssetBalance + termAssetBalance * spotPrice;
  // delta of both tokens added up, for the given time period, normalized to base asset
  const overallDelta = baseAssetDelta + termAssetDelta * spotPrice;

  return overallDelta / overallBalance;
}
