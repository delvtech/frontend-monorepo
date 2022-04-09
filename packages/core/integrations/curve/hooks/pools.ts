import { useSmartContractReadCall } from "@elementfi/react-query-typechain";
import { ONE_MINUTE_IN_MILLISECONDS } from "base/time/time";
import {
  isGoerli,
  isMainnet,
  NUM_ETH_DECIMALS,
  ONE_ETHER,
} from "base/ethereum/ethereum";
import { AddressesJson } from "core/addresses/addresses";
import {
  crv3CryptoPoolContract,
  crvTriCryptoPoolContract,
  steCrvPoolContract,
} from "core/integrations/curve/pools";
import { BigNumber } from "ethers";
import { formatUnits } from "ethers/lib/utils";
import { getCoinGeckoId } from "integrations/coingecko";
import { useCoinGeckoPrice } from "integrations/coingecko/hooks/useCoinGeckoPrice";
import { useCallback } from "react";
import { QueryObserverResult } from "react-query";
import { Currencies, Money } from "ts-money";

interface HookPriceOptions {
  enabled: boolean;
}

const GOERLI_STUB_PRICE = {
  data: new Money(150000, Currencies.USD),
} as QueryObserverResult<Money>;

export function useCrv3CryptoPrice({
  enabled,
}: HookPriceOptions): QueryObserverResult<Money> {
  // tricrypto is made up of usdt, eth, and wbtc so we get a price in usdt
  const { data: usdtPrice } = useCoinGeckoPrice(
    getCoinGeckoId("usdt"),
    Currencies.USD
  );

  const calcWithdrawOneCoinResult = useSmartContractReadCall(
    crv3CryptoPoolContract,
    "calc_withdraw_one_coin",
    {
      callArgs: [ONE_ETHER, 0],
      enabled: !!usdtPrice && isMainnet(AddressesJson.chainId) && enabled,
      staleTime: ONE_MINUTE_IN_MILLISECONDS,
      select: useCallback(
        (triCryptoPriceInUSDT: BigNumber) => {
          const price =
            +formatUnits(triCryptoPriceInUSDT, 6) /
            +(usdtPrice as Money).toString();
          return Money.fromDecimal(price, Currencies.USD, Math.round);
        },
        [Currencies.USD, usdtPrice]
      ),
    }
  );

  if (isGoerli(AddressesJson.chainId)) {
    return GOERLI_STUB_PRICE;
  }

  return calcWithdrawOneCoinResult;
}
export function useTriCryptoPrice({
  enabled,
}: HookPriceOptions): QueryObserverResult<Money> {
  // tricrypto is made up of usdt, eth, and wbtc so we get a price in usdt
  const { data: usdtPrice } = useCoinGeckoPrice(
    getCoinGeckoId("usdt"),
    Currencies.USD
  );

  const calcWithdrawOneCoinResult = useSmartContractReadCall(
    crvTriCryptoPoolContract,
    "calc_withdraw_one_coin",
    {
      callArgs: [ONE_ETHER, 0],
      enabled: !!usdtPrice && isMainnet(AddressesJson.chainId) && enabled,
      staleTime: ONE_MINUTE_IN_MILLISECONDS,
      select: useCallback(
        (triCryptoPriceInUSDT: BigNumber) => {
          const price =
            +formatUnits(triCryptoPriceInUSDT, 6) /
            +(usdtPrice as Money).toString();
          return Money.fromDecimal(price, Currencies.USD, Math.round);
        },
        [Currencies.USD, usdtPrice]
      ),
    }
  );

  if (isGoerli(AddressesJson.chainId)) {
    return GOERLI_STUB_PRICE;
  }

  return calcWithdrawOneCoinResult;
}

export function useSteCrvPrice({
  enabled,
}: HookPriceOptions): QueryObserverResult<Money> {
  // steCRV is made up of eth and stEth, so we get a price in eth
  const { data: ethPrice } = useCoinGeckoPrice(
    getCoinGeckoId("eth"),
    Currencies.USD
  );

  const calcWithdrawOneCoinResult = useSmartContractReadCall(
    steCrvPoolContract,
    "calc_withdraw_one_coin",
    {
      callArgs: [ONE_ETHER, 0],
      staleTime: ONE_MINUTE_IN_MILLISECONDS,
      enabled: !!ethPrice && isMainnet(AddressesJson.chainId) && enabled,
      select: useCallback(
        (steCrvPriceInEth: BigNumber) => {
          const price =
            +formatUnits(steCrvPriceInEth, NUM_ETH_DECIMALS) *
            +(ethPrice as Money).toString();
          return Money.fromDecimal(price, Currencies.USD, Math.round);
        },
        [Currencies.USD, ethPrice]
      ),
    }
  );

  if (isGoerli(AddressesJson.chainId)) {
    return GOERLI_STUB_PRICE;
  }

  return calcWithdrawOneCoinResult;
}
