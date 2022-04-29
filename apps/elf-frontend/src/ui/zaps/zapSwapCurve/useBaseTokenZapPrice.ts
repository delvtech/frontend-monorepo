import { PrincipalTokenInfo, TokenInfo } from "@elementfi/tokenlist";
import {
  getZapSwapCurvePath,
  ZapSwapCurvePathKind,
} from "elf/zaps/zapSwapCurve/path";
import { useMemo } from "react";
import { useCurveLpTokenPrice } from "ui/curve/pools";

export function useBaseTokenZapPrice(
  principalTokenInfo: PrincipalTokenInfo,
  inputToken: TokenInfo,
): string {
  const path = useMemo(
    () => getZapSwapCurvePath(principalTokenInfo, inputToken),
    [principalTokenInfo, inputToken],
  );

  const { data: price1 } = useCurveLpTokenPrice(
    path.kind === ZapSwapCurvePathKind.DoubleStep
      ? path.metaToken
      : path.baseToken,
    path.curvePoolToken,
    "1",
  );

  const { data: price2 } = useCurveLpTokenPrice(
    path.baseToken,
    path.kind === ZapSwapCurvePathKind.DoubleStep
      ? path.metaToken
      : path.curvePoolToken,
    path.kind === ZapSwapCurvePathKind.DoubleStep ? price1 : "1",
  );

  const curvePoolTokenPricePerBaseUnit =
    path.kind === ZapSwapCurvePathKind.DoubleStep ? price2 : price1;

  if (curvePoolTokenPricePerBaseUnit === undefined) return "0";

  const baseCurveLpTokenPricePerCurvePoolTokenUnit =
    (+curvePoolTokenPricePerBaseUnit as number) ** -1;

  return baseCurveLpTokenPricePerCurvePoolTokenUnit.toString();
}
