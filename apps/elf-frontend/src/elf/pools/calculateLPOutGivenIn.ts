import {
  clipFixNumberToStringDecimals,
  getSafeFixedNumber,
} from "base/math/fixedPoint";

export interface LPOutGivenTokenIn {
  otherNeeded: string;
  givenInNeeded: string;
  lpOut: string;
}

export function calculateLPOutGivenIn(
  yIn: string, // given token
  yReserves: string,
  xReserves: string,
  totalSupply: string, // lp tokens, always 18 point decimal
  tokenDecimals: number,
): LPOutGivenTokenIn {
  const _yIn = getSafeFixedNumber(yIn);
  const _xReserves = getSafeFixedNumber(xReserves);
  const _yReserves = getSafeFixedNumber(yReserves);
  const _totalSupply = getSafeFixedNumber(totalSupply);

  // Check if the pool is initialized
  if (_totalSupply.isZero()) {
    // When uninitialized we mint exactly the underlying input in LP tokens
    const lpOut = _yIn.toString();
    const otherNeeded = clipFixNumberToStringDecimals(_yIn, tokenDecimals);
    const givenInNeeded = "0";
    return { otherNeeded, givenInNeeded, lpOut };
  }

  const _reservesRatio = _yReserves.divUnsafe(_xReserves);
  const _givenInNeeded = _yIn;
  const _otherNeeded = _yIn.divUnsafe(_reservesRatio);

  // CCPool will make lpOut the lesser of xIn/xReserves or yIn/yReserves.  Since we are just making
  // the ratios match exactly we can just use yIn/yReserves.
  const _lpOut = _yIn.divUnsafe(_yReserves);

  const otherNeeded = clipFixNumberToStringDecimals(
    _otherNeeded,
    tokenDecimals,
  );

  const givenInNeeded = clipFixNumberToStringDecimals(
    _givenInNeeded,
    tokenDecimals,
  );
  const lpOut = _lpOut.toString();

  return { otherNeeded, givenInNeeded, lpOut };
}
