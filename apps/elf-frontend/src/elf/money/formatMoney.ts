import { Money } from "ts-money";

interface FormatMoneyOptions {
  defaultMoney?: Money;
  wholeAmounts?: boolean;
}

const defaultOptions: FormatMoneyOptions = {
  defaultMoney: undefined,
  wholeAmounts: false,
};

/**
 * Helper to convert a Money object to a human readable string
 * ex: $1.23
 * @param {Money} money value to be formatted
 */

export function formatMoney(
  money: Money | undefined,
  options = defaultOptions,
): string | undefined {
  const { defaultMoney, wholeAmounts } = options;

  if (!money && !defaultMoney) {
    return undefined;
  }

  // we know at least one is defined by the check above, safe to cast
  const value = money ?? (defaultMoney as Money);

  const fractionDigits = wholeAmounts
    ? 0
    : value.getCurrencyInfo().decimal_digits;

  // This is how you express `(10000).toFixed(precision).toLocaleString()` such
  // that you get commmas inserted where they belong and the correct number of
  // digits after the decimal point.
  const formatted = value.toDecimal().toLocaleString(undefined, {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  });

  const currencyInfo = value.getCurrencyInfo();

  return `${currencyInfo.symbol}${formatted}`;
}
