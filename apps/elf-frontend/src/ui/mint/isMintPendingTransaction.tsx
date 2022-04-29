import { PendingTransactionPref } from "ui/transactions/usePendingTransactionPref/usePendingTransactionPref";
import ContractAddresses from "addresses/addresses";

/**
 * Returns true if the given pendingTransactionPref is for a UserProxy mint
 * operation
 */
export function isMintPendingTransaction(
  pendingTransactionPref: PendingTransactionPref | undefined,
): boolean {
  const { contractAddress, methodName } = pendingTransactionPref || {};
  // no pending transactions
  if (!contractAddress || !methodName) {
    return false;
  }

  if (
    contractAddress === ContractAddresses.userProxyContractAddress &&
    methodName === "mint"
  ) {
    return true;
  }

  return false;
}
