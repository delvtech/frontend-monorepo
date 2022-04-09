import { useSmartContractReadCall } from "@elementfi/react-query-typechain";
import { AddressesJson } from "core/addresses/addresses";
import { formatBalance } from "base/utils/formatBalance/formatBalance";
import { ONE_MINUTE_IN_MILLISECONDS } from "base/time/time";
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
  decimals: number
): QueryObserverResult<Money> {
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
          return Money.fromDecimal(price, Currencies.USD, Math.round);
        },
        [Currencies.USD, decimals]
      ),
    }
  );

  if (isGoerli(AddressesJson.chainId)) {
    return GOERLI_STUB_VIRTUAL_PRICE;
  }

  return virtualPriceResult;
}
