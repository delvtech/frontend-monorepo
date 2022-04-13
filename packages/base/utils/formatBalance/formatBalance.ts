import { BigNumber } from "ethers";
import { commify, formatUnits } from "ethers/lib/utils";

import { clipStringValueToDecimals } from "@elementfi/base/math/fixedPoint";

interface FormatBalanceOptions {
  /**
   * Whether or not to include commas when formatting, default is true.
   * Example: "1,000,000"
   */
  formatCommas: boolean;
}
const defaultOptions: FormatBalanceOptions = { formatCommas: true };
export function formatBalance(
  balance: BigNumber | undefined,
  decimals: number | undefined,
  maxPrecision = 4,
  options = defaultOptions,
): string {
  if (!balance || !decimals) {
    return "0.0000";
  }

  const stringBalance = formatUnits(balance, decimals);
  const clipped = clipStringValueToDecimals(stringBalance, maxPrecision);
  const { formatCommas } = options;
  if (formatCommas) {
    return commify(clipped);
  }
  return clipped;
}
