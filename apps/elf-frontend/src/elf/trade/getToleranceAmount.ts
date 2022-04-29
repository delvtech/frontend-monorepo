import { BigNumber } from "ethers";
import { formatUnits, parseUnits } from "ethers/lib/utils";

import { SwapKind } from "integrations/balancer/SwapKind";
import { getSafeFixedNumber } from "base/math/fixedPoint";

/**
 * Given an expected amount and a tolerance, returns the tolerance value for a transaction to
 * succeed.
 * @param expectedAmountOut the expected amount out from some amount in
 * @param decimals decimals of the token for expectedAmountOut
 * @param tolerance slippage tolerance for expected amount out.  for 1% this value would be 0.01
 * @returns {BigNumber} the minimum amount out for the transaction to succeed
 */
export function getToleranceAmount(
  expectedAmount: BigNumber,
  swapKind: SwapKind,
  tolerance: number,
  tokenInDecimals: number,
  tokenOutDecimals: number,
): BigNumber {
  // for GIVEN_IN, we calculate the minimum amount out we'll accept in the transaction.
  if (swapKind === SwapKind.GIVEN_IN) {
    const toleranceOutFN = getSafeFixedNumber(`${1 - tolerance}`, {
      decimals: tokenOutDecimals,
    });

    const limitTokenOutFN = getSafeFixedNumber(
      formatUnits(expectedAmount || "1", tokenOutDecimals),
      {
        decimals: tokenOutDecimals,
      },
    );

    const minAmountOutFN = limitTokenOutFN.mulUnsafe(toleranceOutFN);

    const minAmountOut = parseUnits(
      minAmountOutFN.toString(),
      tokenOutDecimals,
    );

    return minAmountOut;
  }

  // for GIVEN_OUT, we calculate the maximum amount in we'll accept in the transaction.
  const toleranceInFN = getSafeFixedNumber(`${1 + tolerance}`, {
    decimals: tokenInDecimals,
  });
  const limitTokenInFN = getSafeFixedNumber(
    formatUnits(expectedAmount || "1", tokenInDecimals),
    {
      decimals: tokenInDecimals,
    },
  );
  const maxAmountInFN = limitTokenInFN.mulUnsafe(toleranceInFN);
  const maxAmountIn = parseUnits(maxAmountInFN.toString(), tokenInDecimals);

  return maxAmountIn;
}
