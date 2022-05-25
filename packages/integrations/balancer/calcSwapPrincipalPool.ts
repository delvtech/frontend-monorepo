import { SwapKind } from "@elementfi/integrations/balancer/SwapKind";
import { clipStringValueToDecimals } from "@elementfi/base/math/fixedPoint";
import { calcSwapCCPoolUNSAFE } from "@elementfi/integrations/balancer/calcPoolSwap";
import { QueryBatchSwapCalcResults } from "@elementfi/integrations/balancer/QueryBatchSwapCalcResults";
import { assertNever } from "@elementfi/base/utils/assertNever";
import { PrincipalPoolTokenInfo } from "@elementfi/core-tokenlist";

export enum PrincipalPoolCalcSwapError {
  INSUFFICENT_RESERVES = "INSUFFICIENT_RESERVES",
}
export interface PrincipalPoolCalcSwapResult {
  amountIn: string;
  amountOut: string;
  error?: PrincipalPoolCalcSwapError;
}

export enum SwapAsset {
  BASE_ASSET = "BASE_ASSET",
  PRINCIPAL_TOKEN = "PRINCIPAL_TOKEN",
}
export function calcSwapPrincipalPool(
  amount: string,
  swapKind: SwapKind,
  swapAsset: SwapAsset,
  poolInfo: PrincipalPoolTokenInfo,
  decimals: number,
  tokenInReserves: string,
  tokenOutReserves: string,
  totalSupply: string,
): PrincipalPoolCalcSwapResult {
  // check for bad inputs, ie: 0 (including "0.0", et al) and empty strings
  if (!+amount) {
    return { amountIn: "0", amountOut: "0" };
  }

  const {
    extensions: { unitSeconds: tParamSeconds, expiration },
  } = poolInfo;

  // After maturity, values trade 1-1
  const nowInSeconds = Math.round(Date.now() / 1000);
  const timeRemainingSeconds = Math.max(expiration - nowInSeconds, 0);
  if (timeRemainingSeconds === 0) {
    return { amountIn: amount, amountOut: amount };
  }

  // Always add total supply to base asset reserves
  let adjustedInReserves = 0;
  let adjustedOutReserves = 0;
  switch (swapAsset) {
    case SwapAsset.BASE_ASSET: {
      adjustedInReserves = +tokenInReserves;
      adjustedOutReserves = +tokenOutReserves + +totalSupply;
      break;
    }
    case SwapAsset.PRINCIPAL_TOKEN: {
      adjustedInReserves = +tokenInReserves + +totalSupply;
      adjustedOutReserves = +tokenOutReserves;
      break;
    }
    default:
      assertNever(swapAsset);
  }

  switch (swapKind) {
    case SwapKind.GIVEN_IN: {
      const calcOutNumber = calcSwapCCPoolUNSAFE(
        amount,
        String(adjustedInReserves),
        String(adjustedOutReserves),
        timeRemainingSeconds,
        tParamSeconds,
        true, // swapKind === SwapKind.GIVEN_IN (calculate output)
      );

      // We get back NaN when there are insufficient reserves
      if (!calcOutNumber) {
        return {
          amountOut: "0",
          amountIn: amount,
          error: PrincipalPoolCalcSwapError.INSUFFICENT_RESERVES,
        };
      }

      const calcOut =
        clipStringValueToDecimals(calcOutNumber.toString(), decimals) ?? "0";

      const amountIn = amount;
      const amountOut = calcOut;
      return { amountOut, amountIn };
    }

    case SwapKind.GIVEN_OUT: {
      const calcInNumber = calcSwapCCPoolUNSAFE(
        amount,
        String(adjustedOutReserves),
        String(adjustedInReserves),
        timeRemainingSeconds,
        tParamSeconds,
        false, // swapKind === SwapKind.GIVEN_IN (calculate output)
      );

      // We get back NaN when there are insufficient reserves
      if (!calcInNumber) {
        return {
          amountOut: amount,
          amountIn: "0",
          error: PrincipalPoolCalcSwapError.INSUFFICENT_RESERVES,
        };
      }

      const calcIn =
        clipStringValueToDecimals(calcInNumber.toString(), decimals) ?? "0";
      const amountIn = calcIn;
      const amountOut = amount;
      return { amountOut, amountIn };
    }
    default:
      assertNever(swapKind);
  }

  // Should never happen, but here for completeness
  return { amountOut: "0", amountIn: "0" };
}

/**
 * @deprecated QueryBatchSwapCalcResults is deprecated in calc functions, use calcSwapPrincipalPool instead.
 */
export function calcSwapPrincipalPoolOld(
  amount: string,
  swapKind: SwapKind,
  poolInfo: PrincipalPoolTokenInfo,
  decimals: number,
  tokenInReserves: string,
  tokenOutReserves: string,
  totalSupply: string,
  baseAssetIn: boolean,
): QueryBatchSwapCalcResults {
  const nowInSeconds = Math.round(Date.now() / 1000);
  const { extensions } = poolInfo;
  const { unitSeconds: tParamSeconds, expiration } = extensions;
  const timeRemainingSeconds = Math.max(expiration - nowInSeconds, 0);
  if (timeRemainingSeconds === 0) {
    // after maturity, values trade 1-1
    return { result: [amount, amount], status: "success" };
  }

  // always add total supply to base asset reserves
  const adjustedInReserves = baseAssetIn
    ? +tokenInReserves + +totalSupply
    : +tokenInReserves;
  const adjustedOutReserves = baseAssetIn
    ? +tokenOutReserves
    : +tokenOutReserves + +totalSupply;

  if (swapKind === SwapKind.GIVEN_IN) {
    const calcOutNumber = calcSwapCCPoolUNSAFE(
      amount,
      String(adjustedInReserves),
      String(adjustedOutReserves),
      timeRemainingSeconds,
      tParamSeconds,
      true, //                         swapKind === SwapKind.GIVEN_IN (calculate output)
    );

    const calcOut =
      clipStringValueToDecimals(calcOutNumber.toString(), decimals) ?? "0";

    return { result: [amount, calcOut], status: "success" };
  }

  const calcInNumber = calcSwapCCPoolUNSAFE(
    amount,
    String(adjustedOutReserves),
    String(adjustedInReserves),
    timeRemainingSeconds,
    tParamSeconds,
    false, //                        swapKind === SwapKind.GIVEN_IN (calculate output)
  );

  const calcIn =
    clipStringValueToDecimals(calcInNumber.toString(), decimals) ?? "0";
  return { result: [calcIn, amount], status: "success" };
}
