import { PrincipalTokenInfo, TokenInfo } from "@elementfi/core-tokenlist";
import { useBaseTokenZapPrice } from "./useBaseTokenZapPrice";

export function useEstimateBaseTokensByZap(
  principalTokenInfo: PrincipalTokenInfo,
  inputToken: TokenInfo,
  amountIn: string,
): string {
  const price = useBaseTokenZapPrice(principalTokenInfo, inputToken);

  if (price === "0" || amountIn === "0") {
    return "0";
  }
  return (+amountIn / +price).toString();
}
