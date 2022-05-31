import { PrincipalTokenInfo, TokenInfo } from "@elementfi/core-tokenlist";
import { Web3Provider } from "@ethersproject/providers";
import { getCryptoAssetForToken } from "elf/crypto/getCryptoAssetForToken";
import { getPoolInfoForPrincipalToken } from "elf/pools/ccpool";
import { getPoolContract } from "elf/pools/getPoolContract";
import { getPoolTokens } from "elf/pools/getPoolTokens";
import {
  TradeValuesValidationResult,
  validateTradeValues,
} from "elf/trade/validateTradeValues";
import { getTokenInfo } from "tokenlists/tokenlists";
import { useCalculatePrincipalTokenAmountOut } from "ui/ccpools/useCalculatePrincipalTokenAmountOut";
import { useCryptoBalanceOf } from "ui/crypto/hooks/useCryptoBalance/useCryptoBalance";
import { usePoolTokens } from "ui/pools/hooks/usePoolTokens/usePoolTokens";
import { useEstimateBaseTokensByZap } from "./useEstimateBaseTokensByZap";
import { t } from "ttag";

export function useValidateBuyPrincipalTokenInputByZap(
  library: Web3Provider | undefined,
  account: string | null | undefined,
  principalToken: PrincipalTokenInfo,
  inputToken: TokenInfo,
  amountIn: string,
): TradeValuesValidationResult {
  const baseAssetAmountIn = useEstimateBaseTokensByZap(
    principalToken,
    inputToken,
    amountIn,
  );

  const poolInfo = getPoolInfoForPrincipalToken(principalToken.address);

  const { address: poolAddress } = poolInfo;

  const inputAsset = getCryptoAssetForToken(inputToken.address);
  const inputAssetBalanceOf = useCryptoBalanceOf(library, account, inputAsset);

  const { baseAssetIndex, termAssetIndex: principalTokenIndex } =
    getPoolTokens(poolInfo);

  const poolContract = getPoolContract(poolAddress);

  const { decimals: baseAssetDecimals } = getTokenInfo(
    principalToken.extensions.underlying,
  );

  const { data: [, balances] = [] } = usePoolTokens(poolContract);
  const underlyingReservesBalanceOf = balances?.[baseAssetIndex];
  const principalReservesBalanceOf = balances?.[principalTokenIndex];

  const { amountOut: amountPrincipalTokensOut, error } =
    useCalculatePrincipalTokenAmountOut(poolInfo, baseAssetAmountIn);

  const initialValidation = validateTradeValues(
    amountIn,
    amountPrincipalTokensOut,
    underlyingReservesBalanceOf,
    principalReservesBalanceOf,
    inputAssetBalanceOf,
    inputToken.decimals,
    baseAssetDecimals,
  );

  return {
    ...initialValidation,
    tokenOutError: !!error
      ? t`Insufficient pool balance`
      : initialValidation.tokenOutError,
    isValidTokenOutValue: !!error
      ? false
      : initialValidation.isValidTokenOutValue,
  };
}
