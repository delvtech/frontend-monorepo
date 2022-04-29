import { PrincipalTokenInfo, TokenInfo } from "@elementfi/tokenlist";
import { useMarketPrice } from "ui/ccpools/useMarketPrice";
import { useBaseTokenZapPrice } from "./useBaseTokenZapPrice";

export function usePrincipalTokenZapPrice(
  principalTokenInfo: PrincipalTokenInfo,
  inputToken: TokenInfo,
): string {
  const basePricePerUnitPrincipal = useMarketPrice(principalTokenInfo);
  const basePricePerUnitCurvePoolToken = useBaseTokenZapPrice(
    principalTokenInfo,
    inputToken,
  );
  return (
    +basePricePerUnitCurvePoolToken * +basePricePerUnitPrincipal
  ).toString();
}
