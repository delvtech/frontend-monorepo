import { ERC20 } from "@elementfi/core-typechain/dist/libraries";
import { assertNever } from "base/utils/assertNever";
import {
  CryptoAsset,
  CryptoAssetType,
  findTokenContract,
} from "core/crypto/CryptoAsset";
import { TokenMetadata } from "core/tokenlists/tokenlists";

export function getCryptoName(asset: CryptoAsset): string {
  const assetType = asset.type;
  switch (assetType) {
    case CryptoAssetType.ETHEREUM:
      return "Ethereum";
    case CryptoAssetType.ERC20:
    case CryptoAssetType.ERC20PERMIT: {
      const tokenContract = findTokenContract(asset) as ERC20;
      if (tokenContract?.address) {
        return TokenMetadata[tokenContract.address].name;
      }
      break;
    }
    default:
      assertNever(assetType);
  }

  // should never happen
  return "Ethereum";
}
