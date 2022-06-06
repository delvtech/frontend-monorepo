import { CryptoAsset, CryptoAssetType } from "elf/crypto/CryptoAsset";

/**
 * Minting with eth requires this sentinel contract address defined by the UserProxy.
 */
export const USER_PROXY_ETH_SENTINEL =
  "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";

export function getTokenAddressForUserProxy(
  cryptoAsset: CryptoAsset | undefined,
): string | undefined {
  if (!cryptoAsset) {
    return;
  }

  switch (cryptoAsset.type) {
    case CryptoAssetType.ETHEREUM:
      return USER_PROXY_ETH_SENTINEL;
    case CryptoAssetType.ERC20:
    case CryptoAssetType.ERC20PERMIT:
      return cryptoAsset.tokenContract.address;
    default:
      return undefined;
  }
}
