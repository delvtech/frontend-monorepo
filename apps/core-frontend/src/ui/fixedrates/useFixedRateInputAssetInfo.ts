import { getTokenAddressForBalancer } from "elf/balancer/getTokenAddressForBalancer";
import { CryptoAsset } from "elf/crypto/CryptoAsset";
import { getCryptoAssetForToken } from "elf/crypto/getCryptoAssetForToken";
import { getCryptoDecimals } from "elf/crypto/getCryptoDecimals";
import { getCryptoName } from "elf/crypto/getCryptoName/getCryptoName";
import { getCryptoSymbol } from "elf/crypto/getCryptoSymbol";
import { useMemo } from "react";
import { BuyFixedRatesKind } from "./buyFixedRateKind";

interface FixedRateInputAssetInfo {
  inputAsset: CryptoAsset;
  inputAssetAddress: string;
  inputAssetName: string;
  inputAssetSymbol: string;
  inputAssetDecimals: number;
}

function getFixedRateInputAssetInfo(
  inputTokenAddress: string,
  kind: BuyFixedRatesKind,
): FixedRateInputAssetInfo {
  const inputAsset = getCryptoAssetForToken(inputTokenAddress);

  // reconcile the "in" token for both swap purchase and zap purchase
  const inputAssetAddress =
    kind === BuyFixedRatesKind.Swap
      ? getTokenAddressForBalancer(inputAsset)
      : inputTokenAddress;

  const inputAssetName = getCryptoName(inputAsset);
  const inputAssetSymbol = getCryptoSymbol(inputAsset);
  const inputAssetDecimals = getCryptoDecimals(inputAsset);

  return {
    inputAsset,
    inputAssetAddress,
    inputAssetName,
    inputAssetSymbol,
    inputAssetDecimals,
  };
}

export function useFixedRateInputAssetInfo(
  inputTokenAddress: string,
  kind: BuyFixedRatesKind,
): FixedRateInputAssetInfo {
  return useMemo(
    () => getFixedRateInputAssetInfo(inputTokenAddress, kind),
    [inputTokenAddress, kind],
  );
}
