import { usePref } from "base/prefs/hooks/usePref/usePref";
import { Currencies, Currency } from "ts-money";

interface CurrencyPref {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
}

const CURRENCY_PREF_ID = "base-currency";
const CURRENCY_DEFAULT = Currencies.USD;

export function useCurrencyPref(): CurrencyPref {
  const { pref: currency, setPref: setCurrency } = usePref(
    CURRENCY_PREF_ID,
    CURRENCY_DEFAULT
  );

  return {
    currency,
    setCurrency,
  };
}
