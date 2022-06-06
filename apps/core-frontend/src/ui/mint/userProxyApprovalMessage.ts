import { t } from "ttag";

export function getUserProxyApprovalMessage(assetSymbol: string): string {
  return t`You'll need to grant Element approval to spend your ${assetSymbol}
  in order to perform this transaction.`;
}
