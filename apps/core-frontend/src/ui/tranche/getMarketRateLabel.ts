import { t } from "ttag";

export function getMarketRateLabel(
  baseAssetSymbol: string,
  roundedTranchePrice: string,
  inputAssetSymbol: string,
): string {
  return t`≈ ${roundedTranchePrice} ${inputAssetSymbol} / ${baseAssetSymbol} Principal Token`;
}
