import {
  ConvergentCurvePool,
  WeightedPool,
} from "@elementfi/core-typechain/dist/v1";

/**
 * Principal token pools have a custom curve that changes as the two assets
 * converge.
 */
type PrincipalTokenPool = ConvergentCurvePool;

/**
 * Interest token pools use standard weighted pools provided by Balancer V2.
 */
type InterestTokenPool = WeightedPool;
export type PoolContract = PrincipalTokenPool | InterestTokenPool;

export function isConvergentCurvePool(
  pool: PoolContract | undefined,
): pool is ConvergentCurvePool {
  if (!pool) {
    return false;
  }

  // ConvergentCurvePool has a property called `percentFee` instead of `getSwapFee`
  // TODO: is there a better way to identify the type of pool we've got?
  return !!(pool as ConvergentCurvePool).callStatic.percentFee;
}

export function isWeightedPool(
  pool: PoolContract | undefined,
): pool is WeightedPool {
  if (!pool) {
    return false;
  }

  // YieldCurvePool has a property called `getSwapFee` instead of `percentFee`
  // TODO: is there a better way to identify the type of pool we've got?
  return !!(pool as WeightedPool).callStatic.getSwapFeePercentage;
}
