import {
  CryptoAsset,
  CryptoAssetType,
  isERC20Asset,
  isERC20PermitAsset,
} from "elf/crypto/CryptoAsset";
import ContractAddresses from "addresses/addresses";
import { assertNever } from "base/assertNever";

/**
 * Pools use weth instead of eth, so if you're building a ui for pools you can
 * assume this and just map the crypto asset to the correct address,
 * substituting weth for eth when appropriate.
 */
export function findTokenAddressForPool(
  cryptoAsset: CryptoAsset | undefined,
): string | undefined {
  if (!cryptoAsset) {
    return;
  }
  const { type } = cryptoAsset;
  switch (type) {
    case CryptoAssetType.ETHEREUM:
      return ContractAddresses.wethAddress;
    case CryptoAssetType.ERC20:
      if (isERC20Asset(cryptoAsset)) {
        return cryptoAsset.tokenContract.address;
      }
      break;
    case CryptoAssetType.ERC20PERMIT:
      if (isERC20PermitAsset(cryptoAsset)) {
        return cryptoAsset.tokenContract.address;
      }
      break;
    default:
      assertNever(type);
  }
}
