import { CryptoAsset } from "elf/crypto/CryptoAsset";

export interface WalletApprovalInfo {
  spenderAddress: string | null | undefined;
  ownerAddress: string | null | undefined;
  cryptoAsset: CryptoAsset;
  amount: string;
  messageRenderer: (assetSymbol: string) => string;
}
