import { PendingTransactionPref } from "ui/transactions/usePendingTransactionPref/usePendingTransactionPref";

export function isApprovalPendingTransaction(
  pendingTransactionPref: PendingTransactionPref,
): boolean {
  const { methodName } = pendingTransactionPref;
  // no pending transactions
  if (!methodName) {
    return false;
  }

  if (methodName === "approve") {
    return true;
  }

  return false;
}
