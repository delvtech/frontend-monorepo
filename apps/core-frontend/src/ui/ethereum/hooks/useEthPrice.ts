import { QueryObserverResult } from "react-query";

import { Currency, Money } from "ts-money";

import { useCoinGeckoPrice } from "ui/coingecko/useCoinGeckoPrice";

export function useEthPrice(currency: Currency): QueryObserverResult<Money> {
  return useCoinGeckoPrice("ethereum", currency);
}
