import { useCallback } from "react";
import { UseMutationResult, useQueryClient } from "react-query";

import { Contract, ContractReceipt, ContractTransaction, Signer } from "ethers";

import { TransactionError } from "ui/contracts/TransactionError";
import {
  useSmartContractTransaction,
  UseSmartContractTransactionOptions,
} from "ui/contracts/useSmartContractTransaction/useSmartContractTransaction";
import { usePendingTransactionPref } from "ui/transactions/usePendingTransactionPref/usePendingTransactionPref";
import { ETH_BALANCE_QUERY_KEY } from "ui/wallets/hooks/useEthBalance/useEthBalance";
import { TransactionStatus } from "elf/contracts/transaction";
import { ContractMethodArgs, ContractMethodName } from "elf/contracts/types";

interface UseSmartContractTransactionPersistedOptions<
  TContract extends Contract,
  TMethodName extends ContractMethodName<TContract>,
> extends UseSmartContractTransactionOptions<TContract, TMethodName> {}

/**
 * A thin wrapper around useSmartContractTransaction that persists the transaction hash to user prefs.
 * @param contract
 * @param methodName
 * @param signer
 * @param options
 * @returns
 */
export function useSmartContractTransactionPersisted<
  TContract extends Contract,
  TMethodName extends ContractMethodName<TContract>,
>(
  contract: TContract | undefined,
  methodName: TMethodName,
  signer: Signer | undefined,
  options: UseSmartContractTransactionPersistedOptions<
    TContract,
    TMethodName
  > = {},
): UseMutationResult<
  ContractReceipt | undefined,
  unknown,
  ContractMethodArgs<TContract, TMethodName>
> {
  const queryClient = useQueryClient();
  const { onTransactionSubmitted, onTransactionMined, onError } = options;
  const { setPendingTransactionPref } = usePendingTransactionPref();

  const onTxSubmitted = useCallback(
    (
      txReceipt: ContractTransaction,
      callArgs: ContractMethodArgs<TContract, TMethodName>,
    ) => {
      setPendingTransactionPref(
        contract?.address,
        methodName as string,
        callArgs,
        txReceipt.hash,
        TransactionStatus.SUBMITTED,
      );
      onTransactionSubmitted?.(txReceipt, callArgs);
    },
    [
      contract?.address,
      methodName,
      onTransactionSubmitted,
      setPendingTransactionPref,
    ],
  );

  const onTxMined = useCallback(
    (
      txReceipt: ContractReceipt,
      callArgs: ContractMethodArgs<TContract, TMethodName>,
      transactionStatus: TransactionStatus,
    ) => {
      setPendingTransactionPref(
        contract?.address,
        methodName as string,
        callArgs,
        txReceipt.transactionHash,
        transactionStatus,
      );
      // This ensures that balances refresh when a tx completes. In general,
      // all txs should invalidate all balances.
      queryClient.invalidateQueries(ETH_BALANCE_QUERY_KEY);
      queryClient.invalidateQueries(["contractCall", "balanceOf"]);
      queryClient.invalidateQueries(["contractCall", "allowance"]);

      onTransactionMined?.(txReceipt, callArgs, transactionStatus);
    },
    [
      contract?.address,
      methodName,
      onTransactionMined,
      queryClient,
      setPendingTransactionPref,
    ],
  );

  const onTxError = useCallback(
    (error: TransactionError) => {
      onError?.(error);
    },
    [onError],
  );

  const finalOptions: UseSmartContractTransactionOptions<
    TContract,
    TMethodName
  > = {
    ...options,
    onTransactionSubmitted: onTxSubmitted,
    onTransactionMined: onTxMined,
    onError: onTxError,
  };

  return useSmartContractTransaction(
    contract,
    methodName,
    signer,
    finalOptions,
  );
}
