import { assertNever } from "base/assertNever";
import {
  CryptoAsset,
  CryptoAssetType,
  findTokenContract,
} from "elf/crypto/CryptoAsset";
import { TokenMetadata } from "tokenlists/tokenlists";
import { formatTermAssetShortSymbol } from "elf/tranche/format";
import { PrincipalTokenInfo, YieldTokenInfo } from "@elementfi/core-tokenlist";

export function getCryptoSymbol(asset: CryptoAsset): string {
  const assetType = asset.type;
  switch (assetType) {
    case CryptoAssetType.ETHEREUM:
      return "ETH";
    case CryptoAssetType.ERC20:
    case CryptoAssetType.ERC20PERMIT: {
      const tokenContract = findTokenContract(asset);
      if (tokenContract?.address) {
        const tokenInfo = TokenMetadata[tokenContract.address];
        const termAssetSymbol = formatTermAssetShortSymbol(
          tokenInfo as PrincipalTokenInfo | YieldTokenInfo,
        );
        // if termAssetSymbol is an empty string, just use the symbol
        return termAssetSymbol || tokenInfo.symbol;
      }
      break;
    }
    default:
      assertNever(assetType);
  }
  // should never happen
  return "ETH";
}
