import { ERC20Shim } from "elf/contracts/ERC20Shim";
import { assertNever } from "base/assertNever";
import {
  CryptoAsset,
  CryptoAssetType,
  findTokenContract,
} from "elf/crypto/CryptoAsset";
import { TokenMetadata } from "tokenlists/tokenlists";

export function getCryptoName(asset: CryptoAsset): string {
  const assetType = asset.type;
  switch (assetType) {
    case CryptoAssetType.ETHEREUM:
      return "Ethereum";
    case CryptoAssetType.ERC20:
    case CryptoAssetType.ERC20PERMIT: {
      const tokenContract = findTokenContract(asset) as ERC20Shim;
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
