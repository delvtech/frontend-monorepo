import { FixedNumber } from "ethers";

const NUM_ETH_DECIMALS = 18;

export interface FixedFormat {
  /**
   * number of decimals to use for fixed point math
   */
  decimals: number;

  /**
   * if the number is signed or unsigned
   */
  signed: boolean;

  /**
   * width in bits, must be power of 8. i.e. 8, 16, ..., 256.  Max is 256
   */
  width: number;

  /**
   * name of this format
   */
  name: string;

  /**
   * multiplier added to this number
   */
  _multiplier: string;
}
export interface FixedFormatOptions {
  decimals?: number;
  signed?: boolean;
  width?: number;
  name?: string;
  _multiplier?: string;
}

const defaultFormat: FixedFormat = {
  decimals: NUM_ETH_DECIMALS,
  signed: false,
  width: 256,
  name: "18POINT",
  _multiplier: "1",
};
export function getSafeFixedNumber(
  value: string,
  formatOptions?: FixedFormatOptions,
): FixedNumber {
  const format: FixedFormat = {
    ...defaultFormat,
    ...formatOptions,
  };
  const { decimals } = format;

  // ok to cast because defaultFormat will always return a value
  const safeValue = clipStringValueToDecimals(value, decimals);
  return FixedNumber.from(safeValue, format);
}

export function clipFixNumberToStringDecimals(
  value: FixedNumber,
  decimals: number,
): string {
  const unsafeString = value.toString();
  const safeValue = clipStringValueToDecimals(unsafeString, decimals);
  return safeValue;
}

export function clipStringValueToDecimals(
  value: string | undefined,
  maxDecimals: number,
): string {
  if (value === undefined) {
    return "";
  }

  if (value === ".") {
    return "0.";
  }

  if (getPlacesAfterDecimal(value) <= maxDecimals) {
    return value;
  }

  const [integerPart, decimalPart] = value.split(".");
  const clippedDecimals = decimalPart.slice(0, maxDecimals);

  return `${integerPart || 0}.${clippedDecimals}`;
}

/**
 * Helper function to get the number of digits after the decimal.  Assumes a properly formatted
 * number with only numeric characters and 0 or 1 decimals
 *
 * @param stringValue a numeric string with or without a decimal i.e. 3.14 or 42.
 */
export function getPlacesAfterDecimal(stringValue: string | undefined): number {
  if (stringValue === undefined) {
    return 0;
  }

  const hasDecimal = stringValue.indexOf(".") !== -1;

  if (hasDecimal) {
    return stringValue.split(".")[1].length ?? 0;
  }

  return 0;
}
