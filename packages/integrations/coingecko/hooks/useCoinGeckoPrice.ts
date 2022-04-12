import { QueryObserverResult, useQuery } from "react-query";

import { Currencies, Currency, Money } from "ts-money";

import { fetchCoinGeckoPrice } from "integrations/coingecko";
import { ONE_MINUTE_IN_MILLISECONDS } from "base/time/time";

export function useCoinGeckoPrice(
  coinGeckoId: string | undefined,
  currency = Currencies.USD,
): QueryObserverResult<Money> {
  return useQuery<Money>({
    queryKey: makeCoinGeckoPriceQueryKey(coinGeckoId, currency),
    queryFn: async () => {
      const price = await fetchCoinGeckoPrice(
        coinGeckoId as string, // safe to cast because queryFn is only called when config.enabled is true
        currency,
      );
      return price;
    },
    enabled: !!coinGeckoId,
    // Give a longer staleTime on the coingecko price, since its data doesn't
    // need to update on every component that mounts this hook.
    staleTime: ONE_MINUTE_IN_MILLISECONDS,
  });
}

function makeCoinGeckoPriceQueryKey(
  coinGeckoId: string | undefined,
  currency: Currency,
): [string, string, string, string | undefined] {
  return ["coingecko", "/simple/price", currency.code, coinGeckoId];
}
