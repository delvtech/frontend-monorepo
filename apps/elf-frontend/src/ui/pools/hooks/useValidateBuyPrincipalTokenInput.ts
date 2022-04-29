import { Web3Provider } from "@ethersproject/providers";

import { useCryptoBalanceOf } from "ui/crypto/hooks/useCryptoBalance/useCryptoBalance";
import { usePoolTokens } from "ui/pools/hooks/usePoolTokens/usePoolTokens";
import { getCryptoAssetForToken } from "elf/crypto/getCryptoAssetForToken";
import { getPoolContract } from "elf/pools/getPoolContract";
import { getPoolTokens } from "elf/pools/getPoolTokens";
import { getTokenInfo } from "tokenlists/tokenlists";
import {
  TradeValuesValidationResult,
  validateTradeValues,
} from "elf/trade/validateTradeValues";
import { useCalculatePrincipalTokenAmountOut } from "ui/ccpools/useCalculatePrincipalTokenAmountOut";
import { PrincipalPoolTokenInfo } from "@elementfi/tokenlist";

export function useValidateBuyPrincipalTokenInput(
  library: Web3Provider | undefined,
  account: string | null | undefined,
  poolInfo: PrincipalPoolTokenInfo,
  baseAssetAmountIn: string,
): TradeValuesValidationResult {
  const {
    address: poolAddress,
    extensions: { underlying },
  } = poolInfo;

  const baseAsset = getCryptoAssetForToken(underlying);
  const baseAssetBalanceOf = useCryptoBalanceOf(library, account, baseAsset);
  const { decimals: baseAssetDecimals } = getTokenInfo(underlying);

  const { baseAssetIndex, termAssetIndex: principalTokenIndex } =
    getPoolTokens(poolInfo);

  const poolContract = getPoolContract(poolAddress);

  const { data: [, balances] = [] } = usePoolTokens(poolContract);
  const underlyingReservesBalanceOf = balances?.[baseAssetIndex];
  const principalReservesBalanceOf = balances?.[principalTokenIndex];

  const { amountOut: amountPrincipalTokensOut } =
    useCalculatePrincipalTokenAmountOut(poolInfo, baseAssetAmountIn);

  return validateTradeValues(
    baseAssetAmountIn,
    amountPrincipalTokensOut,
    underlyingReservesBalanceOf,
    principalReservesBalanceOf,
    baseAssetBalanceOf,
    baseAssetDecimals,
  );
}
