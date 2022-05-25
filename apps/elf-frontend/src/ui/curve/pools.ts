import {
  CurvePool1,
  CurvePool2,
  CurvePool3,
} from "@elementfi/core-typechain/dist/libraries";
import { CurveLpTokenInfo, TokenInfo } from "@elementfi/core-tokenlist";
import { AddressesJson } from "addresses/addresses";
import {
  isGoerli,
  isMainnet,
  NUM_ETH_DECIMALS,
  ONE_ETHER,
} from "base/ethereum/ethereum";
import { ONE_MINUTE_IN_MILLISECONDS } from "base/time";
import {
  crv3CryptoPoolContract,
  crvTriCryptoPoolContract,
  getCurvePoolContract,
  steCrvPoolContract,
} from "elf/curve/pools";
import { BigNumber, BigNumberish, ethers } from "ethers";
import { formatUnits, parseUnits } from "ethers/lib/utils";
import { getCoinGeckoId } from "integrations/coingecko";
import { useCallback } from "react";
import { QueryObserverResult } from "react-query";
import { Currencies, Money } from "ts-money";
import { useCoinGeckoPrice } from "ui/coingecko/useCoinGeckoPrice";
import { useSmartContractReadCall } from "ui/contracts/useSmartContractReadCall/useSmartContractReadCall";
import { useCurrencyPref } from "ui/prefs/useCurrency/useCurencyPref";

interface HookPriceOptions {
  enabled: boolean;
}

const GOERLI_STUB_PRICE = {
  data: new Money(150000, Currencies.USD),
} as QueryObserverResult<Money>;

export function useCrv3CryptoPrice({
  enabled,
}: HookPriceOptions): QueryObserverResult<Money> {
  const { currency } = useCurrencyPref();

  // tricrypto is made up of usdt, eth, and wbtc so we get a price in usdt
  const { data: usdtPrice } = useCoinGeckoPrice(
    getCoinGeckoId("usdt"),
    currency,
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
          return Money.fromDecimal(price, currency, Math.round);
        },
        [currency, usdtPrice],
      ),
    },
  );

  if (isGoerli(AddressesJson.chainId)) {
    return GOERLI_STUB_PRICE;
  }

  return calcWithdrawOneCoinResult;
}
export function useTriCryptoPrice({
  enabled,
}: HookPriceOptions): QueryObserverResult<Money> {
  const { currency } = useCurrencyPref();

  // tricrypto is made up of usdt, eth, and wbtc so we get a price in usdt
  const { data: usdtPrice } = useCoinGeckoPrice(
    getCoinGeckoId("usdt"),
    currency,
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
          return Money.fromDecimal(price, currency, Math.round);
        },
        [currency, usdtPrice],
      ),
    },
  );

  if (isGoerli(AddressesJson.chainId)) {
    return GOERLI_STUB_PRICE;
  }

  return calcWithdrawOneCoinResult;
}

export function useSteCrvPrice({
  enabled,
}: HookPriceOptions): QueryObserverResult<Money> {
  const { currency } = useCurrencyPref();
  // steCRV is made up of eth and stEth, so we get a price in eth
  const { data: ethPrice } = useCoinGeckoPrice(getCoinGeckoId("eth"), currency);

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
          return Money.fromDecimal(price, currency.code, Math.round);
        },
        [currency.code, ethPrice],
      ),
    },
  );

  if (isGoerli(AddressesJson.chainId)) {
    return GOERLI_STUB_PRICE;
  }

  return calcWithdrawOneCoinResult;
}

type CurveAmountArrayParam =
  | [BigNumberish, BigNumberish, BigNumberish]
  | [BigNumberish, BigNumberish];

function buildCurveAmountArrayParam(
  curveLpToken: CurveLpTokenInfo,
  token: TokenInfo,
  amount: string,
): CurveAmountArrayParam {
  const tokenIdxInPool = curveLpToken.extensions.poolAssets.findIndex(
    (address) => address === token.address,
  );
  const amountInputLength = curveLpToken.extensions.poolAssets.length as 2 | 3;
  const amountInput = new Array(amountInputLength).fill(
    0,
  ) as CurveAmountArrayParam;
  amountInput[tokenIdxInPool] = parseUnits(amount, token.decimals);
  return amountInput;
}

export function useCurveLpTokenPrice(
  curveLpToken: CurveLpTokenInfo,
  token: TokenInfo,
  amount: string | undefined,
): QueryObserverResult<string> {
  const curvePoolContract = getCurvePoolContract(curveLpToken);
  const amountInput = !!amount
    ? buildCurveAmountArrayParam(curveLpToken, token, amount)
    : undefined;

  const isPool1 =
    !["crv3crypto", "crvTricrypto"].includes(curveLpToken.symbol) &&
    curveLpToken.extensions.poolAssets.length == 2;
  const isPool2 =
    !["crv3crypto", "crvTricrypto"].includes(curveLpToken.symbol) &&
    curveLpToken.extensions.poolAssets.length == 3;
  const isPool3 = ["crv3crypto", "crvTricrypto"].includes(curveLpToken.symbol);

  const priceWhenCurvePool1 = useSmartContractReadCall(
    curvePoolContract as CurvePool1,
    "calc_token_amount",
    {
      callArgs: [amountInput as [BigNumberish, BigNumberish], true],
      staleTime: ONE_MINUTE_IN_MILLISECONDS,
      enabled: isPool1 && !!amountInput,
      select: (lpAmount) =>
        ethers.utils.formatUnits(lpAmount, curveLpToken.decimals),
    },
  );
  const priceWhenCurvePool2 = useSmartContractReadCall(
    curvePoolContract as CurvePool2,
    "calc_token_amount",
    {
      callArgs: [
        amountInput as [BigNumberish, BigNumberish, BigNumberish],
        true,
      ],
      staleTime: ONE_MINUTE_IN_MILLISECONDS,
      enabled: isPool2 && !!amountInput,
      select: (lpAmount) =>
        ethers.utils.formatUnits(lpAmount, curveLpToken.decimals),
    },
  );
  const priceWhenCurvePool3 = useSmartContractReadCall(
    curvePoolContract as CurvePool3,
    "calc_token_amount",
    {
      callArgs: [
        amountInput as [BigNumberish, BigNumberish, BigNumberish],
        true,
      ],
      staleTime: ONE_MINUTE_IN_MILLISECONDS,
      enabled: isPool3 && !!amountInput,
      select: (lpAmount) =>
        ethers.utils.formatUnits(lpAmount, curveLpToken.decimals),
    },
  );

  if (isPool1) return priceWhenCurvePool1;
  else if (isPool2) return priceWhenCurvePool2;
  else return priceWhenCurvePool3;
}
