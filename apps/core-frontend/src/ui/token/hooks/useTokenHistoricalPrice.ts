import { ERC20 } from "@elementfi/core-typechain/dist/libraries";
import { getCoinGeckoId } from "integrations/coingecko";
import { useCoinGeckoHistoricalPrice } from "ui/coingecko/useCoinGeckoHistoricalPrice";
import { getTokenInfo } from "tokenlists/tokenlists";
import { QueryObserverResult } from "react-query";
import { Currency, Money } from "ts-money";

export function useTokenHistoricalPrice<TContract extends ERC20>(
  contract: TContract | undefined,
  currency: Currency,
  daysAgo: number,
): QueryObserverResult<Money> {
  const tokenSymbolResult = contract
    ? getTokenInfo(contract.address).symbol
    : undefined;
  const priceResult = useCoinGeckoHistoricalPrice(
    getCoinGeckoId(tokenSymbolResult),
    currency,
    daysAgo,
  );

  return priceResult;
}
