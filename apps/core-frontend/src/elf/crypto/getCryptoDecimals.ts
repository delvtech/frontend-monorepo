import { assertNever } from "base/assertNever";
import {
  CryptoAsset,
  CryptoAssetType,
  findTokenContract,
} from "elf/crypto/CryptoAsset";
import { NUM_ETH_DECIMALS } from "base/ethereum/ethereum";
import { TokenMetadata } from "tokenlists/tokenlists";

export function getCryptoDecimals(
  // TODO: Remove undefined from this signature, since undefined would mean there's a token we don't have static access to.
  asset: CryptoAsset,
): number {
  const assetType = asset.type;
  switch (assetType) {
    case CryptoAssetType.ETHEREUM:
      return NUM_ETH_DECIMALS;
    case CryptoAssetType.ERC20:
    case CryptoAssetType.ERC20PERMIT:
      {
        const tokenContract = findTokenContract(asset);
        if (tokenContract?.address) {
          return TokenMetadata[tokenContract.address].decimals;
        }
      }
      break;
    default:
      assertNever(assetType);
  }

  // should never happen
  return NUM_ETH_DECIMALS;
}
