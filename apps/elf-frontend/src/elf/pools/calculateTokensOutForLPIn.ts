import {
  clipFixNumberToStringDecimals,
  getSafeFixedNumber,
} from "base/math/fixedPoint";
import { isFiniteNumber } from "base/numbers";
import warning from "warning";

const undefinedResult = { xNeeded: undefined, yNeeded: undefined };
/**
 * calculates the tokens that would be recieved for an exact amount of LP in.  uses fixedpoint math
 * to be as accurate as possible
 * @param lpIn lp tokens into the pool to get tokens out
 * @param xReserves the base asset
 * @param yReserves the bond asset
 * @param totalSupply total supply of lp tokens
 * @param decimals decimals of the tokens in the pool (must be the same)
 * @returns string values of xNeeded and yNeeded with a maximum number decimals of the tokens
 */
export function calculateTokensOutForLPInFixed(
  lpIn: string,
  xReserves: string,
  yReserves: string,
  totalSupply: string,
  tokenDecimals: number,
): { xNeeded: string | undefined; yNeeded: string | undefined } {
  if (
    !isFiniteNumber(Number(lpIn)) ||
    !isFiniteNumber(Number(xReserves)) ||
    !isFiniteNumber(Number(yReserves)) ||
    !isFiniteNumber(Number(totalSupply)) ||
    !isFiniteNumber(Number(tokenDecimals))
  ) {
    return undefinedResult;
  }

  if (Number(lpIn) > Number(totalSupply)) {
    warning(lpIn <= totalSupply, "lpIn cannot be great than totalSupply");
    return undefinedResult;
  }

  const _lpIn = getSafeFixedNumber(lpIn);
  const _xReserves = getSafeFixedNumber(xReserves);
  const _yReserves = getSafeFixedNumber(yReserves);
  const _totalSupply = getSafeFixedNumber(totalSupply);

  const _lpShare = _lpIn.divUnsafe(_totalSupply);

  const _yNeeded = _lpShare.mulUnsafe(_yReserves);
  const _xNeeded = _lpShare.mulUnsafe(_xReserves);

  const xNeeded = clipFixNumberToStringDecimals(_xNeeded, tokenDecimals);
  const yNeeded = clipFixNumberToStringDecimals(_yNeeded, tokenDecimals);

  return { xNeeded, yNeeded };
}
