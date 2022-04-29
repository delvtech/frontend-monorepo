import { useSmartContractReadCall } from "ui/contracts/useSmartContractReadCall/useSmartContractReadCall";
import { useCurrencyPref } from "ui/prefs/useCurrency/useCurencyPref";
import { AddressesJson } from "addresses/addresses";
import { formatBalance } from "base/formatBalance/formatBalance";
import { ONE_MINUTE_IN_MILLISECONDS } from "base/time";
import { isGoerli } from "base/ethereum/ethereum";
import { BigNumber } from "ethers";
import { useCallback } from "react";
import { QueryObserverResult } from "react-query";
import { Currencies, Money } from "ts-money";
import { CRVLUSD } from "@elementfi/core-typechain/dist/libraries/CRVLUSD";

// Goerli curve stable pools can be inferred to be $1
const GOERLI_STUB_VIRTUAL_PRICE = {
  data: Money.fromDecimal(100, Currencies.USD, Math.round),
} as QueryObserverResult<Money>;

/**
 * Curve stable pools have a `get_virtual_price` method, since they're all
 * pegged assets ie: crvLUSD and crvALUSD.
 */

export function useCurveStablecoinPoolVirtualPrice(
  stablePoolContract: CRVLUSD | undefined,
  decimals: number,
): QueryObserverResult<Money> {
  const { currency } = useCurrencyPref();

  const virtualPriceResult = useSmartContractReadCall(
    stablePoolContract,
    "get_virtual_price",
    {
      callArgs: [],
      staleTime: ONE_MINUTE_IN_MILLISECONDS,
      enabled: !!stablePoolContract,
      select: useCallback(
        (virtualPriceBigNumber: BigNumber): Money => {
          const price = +formatBalance(virtualPriceBigNumber, decimals);
          return Money.fromDecimal(price, currency, Math.round);
        },
        [currency, decimals],
      ),
    },
  );

  if (isGoerli(AddressesJson.chainId)) {
    return GOERLI_STUB_VIRTUAL_PRICE;
  }

  return virtualPriceResult;
}
