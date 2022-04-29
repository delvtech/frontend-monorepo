import { BigNumber } from "ethers";
import { formatUnits } from "ethers/lib/utils";

import { clipStringValueToDecimals } from "base/math/fixedPoint";

/**
 * When unstaking completely from a pool, it's nigh impossible to avoid the
 * remaining LP dust that remains due to how the apis for unstaking work. The
 * UI should avoid showing small amounts of dust, wherever balances are shown.
 */
export function isDust(balanceOf: BigNumber, decimals: number): boolean {
  const lpBalanceString = formatUnits(balanceOf, decimals);

  // no balance means no dust
  if (+lpBalanceString === 0) {
    return false;
  }

  const clippedLPBalanceString = +(
    clipStringValueToDecimals(
      lpBalanceString,
      // Only keep 4 values of precision when caring about dust
      4,
    ) || 0
  );

  // after clipping, if we don't have a balance then it's just dust
  if (+clippedLPBalanceString === 0) {
    return true;
  }

  // There is a meaningful balance of LP tokens
  return false;
}
