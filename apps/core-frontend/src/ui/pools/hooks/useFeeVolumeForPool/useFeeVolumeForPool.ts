import { formatEther, formatUnits } from "ethers/lib/utils";
import { Money } from "ts-money";

import { SwapEventWithTimeStamp } from "integrations/balancer/SwapEvent";
import { usePoolSwapFee } from "ui/pools/hooks/usePoolSwapFee/usePoolSwapFee";
import { useSwaps } from "ui/pools/hooks/useSwaps/useSwaps";
import { useCurrencyPref } from "ui/prefs/useCurrency/useCurencyPref";
import { useTokenPrice } from "ui/token/hooks/useTokenPrice";
import { ONE_DAY_IN_SECONDS } from "base/time";
import { convertNumberToFiatBalance } from "elf/money/convertToFiatBalance";
import { getPoolContract } from "elf/pools/getPoolContract";
import { getPoolTokens } from "elf/pools/getPoolTokens";
import { isConvergentCurvePool, isWeightedPool } from "elf/pools/PoolContract";
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
export function useFeeVolumeForPool(
  poolInfo: PoolInfo,
  fromTime: number = ONE_DAY_IN_SECONDS,
  toTime?: number,
): number | undefined {
  const {
    baseAssetContract,
    baseAssetInfo: { decimals: baseAssetDecimals },
  } = getPoolTokens(poolInfo);
  const pool = getPoolContract(poolInfo.address);

  const swapEvents = useSwaps(poolInfo, fromTime, toTime);

  const swapFeeBN = usePoolSwapFee(poolInfo);

  if (!swapEvents?.length) {
    return 0;
  }

  if (!swapFeeBN) {
    return 0;
  }

  const swapFee = +formatEther(swapFeeBN);

  if (isWeightedPool(pool) && swapFee) {
    return calculateWeightedPoolFees(
      swapEvents,
      baseAssetContract.address,
      baseAssetDecimals,
      swapFee,
    );
  }

  if (isConvergentCurvePool(pool) && swapFee) {
    return calculateConvergentCurvePoolFees(
      swapEvents,
      baseAssetDecimals,
      swapFee,
    );
  }

  return 0;
}

export function useFeeVolumeFiatForPool(
  poolInfo: PoolInfo,
  fromTime: number = ONE_DAY_IN_SECONDS,
  toTime?: number,
): Money {
  const { baseAssetContract } = getPoolTokens(poolInfo);
  const fees = useFeeVolumeForPool(poolInfo, fromTime, toTime);
  const { currency } = useCurrencyPref();
  const { data: baseAssetPrice } = useTokenPrice(baseAssetContract, currency);

  if (!baseAssetPrice || !fees) {
    return Money.fromDecimal(0, currency);
  }

  const fiatFees = convertNumberToFiatBalance(baseAssetPrice, fees);
  return fiatFees;
}

/**
 * Calculates the total fees collected for a WeightedPool in terms of the base asset.
 * @param swapEvents swap events to tally fees collected on
 * @param baseAssetAddress address of base asset
 * @param baseAssetDecimals decimals of base asset
 * @param swapFee swap fee decimal value: 0.01 is 1%
 * @returns fees collected in the base asset nominal value
 */
function calculateWeightedPoolFees(
  swapEvents: SwapEventWithTimeStamp[],
  baseAssetAddress: string,
  baseAssetDecimals: number,
  swapFee: number,
): number {
  if (!swapFee) {
    return 0;
  }

  let fees = 0;
  swapEvents.forEach((event) => {
    const [, tokenIn, tokenOut, amountIn, amountOut] = event;
    if (tokenIn === baseAssetAddress) {
      const baseAssetTraded = +formatUnits(amountIn, baseAssetDecimals);
      const feeCollected = Math.abs(baseAssetTraded) * swapFee;
      fees += feeCollected;
    } else if (tokenOut === baseAssetAddress) {
      const baseAssetTraded = +formatUnits(amountOut, baseAssetDecimals);
      const feeCollected = Math.abs(baseAssetTraded) * swapFee;
      fees += feeCollected;
    }
  });

  return fees;
}

/**
 * Calculates the total fees collected for a ConvergentCurvePool in terms of the base asset.
 * @param swapEvents swap events to tally fees collected on
 * @param tokenDecimals decimals of the tokens
 * @param swapFee swap fee decimal value: 0.01 is 1%
 * @returns fees collected in the base asset nominal value
 */
function calculateConvergentCurvePoolFees(
  swapEvents: SwapEventWithTimeStamp[],
  tokenDecimals: number,
  swapFee: number,
): number {
  if (!swapFee) {
    return 0;
  }

  let fees = 0;
  swapEvents.forEach((event) => {
    const [, , , amountIn, amountOut] = event;

    const amountOutNumber = +formatUnits(amountOut.abs(), tokenDecimals);
    const amountInNumber = +formatUnits(amountIn.abs(), tokenDecimals);
    const amountDifference = Math.abs(amountOutNumber - amountInNumber);
    const feeCollected = amountDifference * swapFee;
    fees += feeCollected;
  });

  return fees;
}
