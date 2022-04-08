import { Currency, Money } from "ts-money";

import { format, subDays } from "date-fns";
import coinsJSON from "integrations/coingecko/coins-shortlist.json";

/**
 * Lookup object for getting the CoinGecko coin id from the coin or token's
 * symbol.
 *
 *  Eg:
 *  CoinGeckoIds.eth === 'ethereum' // true
 *
 * This can then be used to make calls to CoinGecko apis about ethereum, ie: price apis.
 *
 * TODO: This can be auto-generated instead of created at runtime.
 */
const CoinGeckoIds: {
  [symbol: string]: string;
} = coinsJSON.reduce(
  (memo, value) => ({ ...memo, [value.symbol]: value.id }),
  {}
);

export function getCoinGeckoId(symbol: string | undefined): string | undefined {
  if (!symbol) {
    return;
  }

  return CoinGeckoIds[symbol.toLowerCase()];
}
export async function fetchCoinGeckoPrice(
  coinGeckoId: string,
  currency: Currency
): Promise<Money> {
  const currencyCode = currency.code.toLowerCase();
  const result = await fetch(
    `https://api.coingecko.com/api/v3/simple/price?ids=${coinGeckoId}&vs_currencies=${currencyCode}`
  );

  // Result looks like:
  // { dai: { usd: 1.01 } }
  const resultJSON = (await result.json()) as Record<
    string,
    Record<string, number>
  >;

  const price = resultJSON[coinGeckoId][currencyCode];

  return Money.fromDecimal(
    price,
    currency,
    // Money.fromDecimal will throw if price has more decimals than the currency
    // allows unless you pass a rounding function
    Math.round
  );
}

export async function fetchCoinGeckoHistoricalPrice(
  coinGeckoId: string,
  currency: Currency,
  daysAgo = 1
): Promise<Money> {
  const dateString = format(subDays(new Date(), daysAgo), "dd-MM-yyyy");
  const currencyCode = currency.code.toLowerCase();
  const result = await fetch(
    `https://api.coingecko.com/api/v3/coins/${coinGeckoId}/history?date=${dateString}`
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const resultJSON = (await result.json()) as any;

  const price = resultJSON["market_data"]["current_price"][currencyCode];

  return Money.fromDecimal(
    price,
    currency,
    // Money.fromDecimal will throw if price has more decimals than the currency
    // allows unless you pass a rounding function
    Math.round
  );
}
