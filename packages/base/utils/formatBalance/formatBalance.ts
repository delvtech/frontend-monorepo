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

/**
 * @deprecated BigNumber balance is deprecated, use formatBalance2 instead that just uses strings
 */
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

export function formatBalance2(
  balance: string | undefined,
  decimals: number | undefined,
  maxPrecision = 4,
  options = defaultOptions,
): string {
  if (!balance || !decimals) {
    return "0";
  }

  const clipped = clipStringValueToDecimals(balance, maxPrecision);
  const { formatCommas } = options;
  if (formatCommas) {
    return commify(clipped);
  }
  return clipped;
}
