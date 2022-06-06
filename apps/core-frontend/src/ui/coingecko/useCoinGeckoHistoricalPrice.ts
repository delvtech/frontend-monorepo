import { QueryObserverResult, useQuery } from "react-query";

import { Currencies, Currency, Money } from "ts-money";

import { fetchCoinGeckoHistoricalPrice } from "integrations/coingecko";

export function useCoinGeckoHistoricalPrice(
  coinGeckoId: string | undefined,
  currency = Currencies.USD,
  daysAgo: number,
): QueryObserverResult<Money> {
  return useQuery<Money>({
    queryKey: makeCoinGeckoHistoricalPriceQueryKey(
      coinGeckoId,
      currency,
      daysAgo,
    ),
    queryFn: async () => {
      const price = await fetchCoinGeckoHistoricalPrice(
        coinGeckoId as string, // safe to cast because queryFn is only called when config.enabled is true
        currency,
        daysAgo,
      );
      return price;
    },
    enabled: !!coinGeckoId,
    // Historical prices never change, so we can cache this forever
    staleTime: Infinity,
  });
}

function makeCoinGeckoHistoricalPriceQueryKey(
  coinGeckoId: string | undefined,
  currency: Currency,
  daysAgo: number,
): [string, string, string, number, string | undefined] {
  return ["coingecko", "/coins/", currency.code, daysAgo, coinGeckoId];
}
