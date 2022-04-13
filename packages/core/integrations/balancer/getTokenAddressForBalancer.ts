import { BALANCER_ETH_SENTINEL } from "@elementfi/integrations/balancer/ethSentinel";
import { typeAassertNever } from "@elementfi/base/utils/typeAssertNever";
import {
  CryptoAsset,
  CryptoAssetType,
} from "@elementfi/core/crypto/CryptoAsset";

/**
 * Disambiguates the crypto asset to get a suitable token address for the
 * Balancer Vault.
 */
export function getTokenAddressForBalancer(cryptoAsset: CryptoAsset): string {
  switch (cryptoAsset.type) {
    case CryptoAssetType.ETHEREUM:
      return BALANCER_ETH_SENTINEL;
    case CryptoAssetType.ERC20:
    case CryptoAssetType.ERC20PERMIT:
      return cryptoAsset.tokenContract.address;
    default:
      typeAassertNever(cryptoAsset);
  }

  // should never happen
  return "";
}
