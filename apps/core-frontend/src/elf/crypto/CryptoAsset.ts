import { ERC20, ERC20Permit } from "@elementfi/core-typechain/dist/libraries";
import { assertNever } from "base/assertNever";

export enum CryptoAssetType {
  ETHEREUM = "ethereum",
  ERC20 = "erc20",
  ERC20PERMIT = "erc20permit",
}

export interface BaseCryptoAsset {
  id: string;
  type: CryptoAssetType;
}

export interface EthereumCryptoAsset extends BaseCryptoAsset {
  type: CryptoAssetType.ETHEREUM;
}

export interface Erc20CryptoAsset extends BaseCryptoAsset {
  type: CryptoAssetType.ERC20;
  tokenContract: ERC20;
}
export interface Erc20PermitCryptoAsset extends BaseCryptoAsset {
  type: CryptoAssetType.ERC20PERMIT;
  tokenContract: ERC20Permit;
}

export type CryptoAsset =
  | EthereumCryptoAsset
  | Erc20CryptoAsset
  | Erc20PermitCryptoAsset;

export const ETHEREUM_CRYPTO_ASSET: EthereumCryptoAsset = {
  id: "ethereum",
  type: CryptoAssetType.ETHEREUM,
};

export function findTokenContract(
  cryptoAsset: CryptoAsset | undefined,
): ERC20 | ERC20Permit | undefined {
  if (!cryptoAsset) {
    return;
  }
  const { type } = cryptoAsset;

  switch (type) {
    case CryptoAssetType.ETHEREUM:
      return;
    case CryptoAssetType.ERC20:
      if (isERC20Asset(cryptoAsset)) {
        return cryptoAsset.tokenContract;
      }
      break;
    case CryptoAssetType.ERC20PERMIT:
      if (isERC20PermitAsset(cryptoAsset)) {
        return cryptoAsset.tokenContract;
      }
      break;
    default:
      assertNever(type);
  }
}

export function isERC20Asset(
  cryptoAsset: CryptoAsset,
): cryptoAsset is Erc20CryptoAsset {
  return cryptoAsset.type === CryptoAssetType.ERC20;
}

export function isERC20PermitAsset(
  cryptoAsset: CryptoAsset,
): cryptoAsset is Erc20PermitCryptoAsset {
  return cryptoAsset.type === CryptoAssetType.ERC20PERMIT;
}
