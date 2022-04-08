import { t } from "ttag";

export function getBalancerApprovalMessage(assetSymbol: string): string {
  return t`Element uses Balancer Pools for trading. You'll need to grant Balancer approval to spend your ${assetSymbol} in order to perform this transaction.`;
}
