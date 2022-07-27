import { BigNumber } from "ethers";
import { formatUnits } from "ethers/lib/utils";
import { Money } from "ts-money";

/**
 * Helper function to get the fiat value for a cryptocurrency.  The conversion can easily throw
 * errors if BigNumber and Moneya are used incorrectly.
 *
 * @param {number} fiatValue the value of the crypto in the fiat, i.e. 400.01
 * @param {string} fiatCode  the ISO 4217 currency country code, i.e. 'USD'
 * @param {BigNumber} cryptoFractionalValue the fractional unit value, i.e. 10000000000000000000
 * (wei)
 * @param {number} cryptoDecimals the number of decimals to convert the fractional unit value to
 */
export function convertToFiatBalance(
  fiatValue: Money,
  cryptoFractionalValue: BigNumber,
  cryptoDecimals: number,
): Money {
  // formatUnits will always create a string that can be converted to a number without overflow problems
  const cryptoBalance = Number(
    formatUnits(cryptoFractionalValue, cryptoDecimals),
  );

  // Now we can safely multiply the crypto price by the balance to get the fiat balance
  return fiatValue.multiply(cryptoBalance, Math.round);
}

export function convertNumberToFiatBalance(
  fiatValue: Money,
  cryptoNominalValue: number,
): Money {
  // Now we can safely multiply the crypto price by the balance to get the fiat balance
  return fiatValue.multiply(cryptoNominalValue, Math.round);
}
