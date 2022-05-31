import { useMutation, UseMutationResult } from "react-query";

import { Contract, ContractReceipt, ContractTransaction, Signer } from "ethers";

import {
  isTransactionReplacedError,
  TransactionError,
} from "ui/contracts/TransactionError";
import { lookupAddressKey } from "addresses/addresses";
import { TransactionStatus } from "elf/contracts/transaction";
import { ContractMethodArgs, ContractMethodName } from "elf/contracts/types";

export interface UseSmartContractTransactionOptions<
  TContract extends Contract,
  TMethodName extends ContractMethodName<TContract>,
> {
  onTransactionSubmitted?: (
    transaction: ContractTransaction,
    callArgs: ContractMethodArgs<TContract, TMethodName>,
  ) => void | Promise<void>;
  onTransactionMined?: (
    transactionReceipt: ContractReceipt,
    callArgs: ContractMethodArgs<TContract, TMethodName>,
    transactionStatus: TransactionStatus,
  ) => void | Promise<void>;

  onError?: (error: TransactionError) => void | Promise<void>;
}

export function useSmartContractTransaction<
  TContract extends Contract,
  TMethodName extends ContractMethodName<TContract>,
>(
  // TODO: contracts should not be undefined thanks to tokenlist
  contract: TContract | undefined,
  methodName: TMethodName,
  signer: Signer | undefined,
  options: UseSmartContractTransactionOptions<TContract, TMethodName> = {},
): UseMutationResult<
  ContractReceipt | undefined,
  unknown,
  ContractMethodArgs<TContract, TMethodName>
> {
  const { onTransactionMined, onTransactionSubmitted, onError } = options;
  return useMutation({
    mutationFn: async (
      args: ContractMethodArgs<TContract, TMethodName>,
    ): Promise<ContractReceipt> => {
      if (!signer) {
        console.warn(`Tried to call ${methodName as string} without a signer.`);
        return undefined as unknown as ContractReceipt;
      }

      if (!contract) {
        // only for typesafety, this should never happen
        console.warn(
          `Tried to call ${methodName as string} without contract instance.`,
        );
        return undefined as unknown as ContractReceipt;
      }

      const connected = (await contract.connect(signer)) as TContract;
      const transaction: ContractTransaction = await connected[methodName](
        ...args,
      );
      onTransactionSubmitted?.(transaction, args);

      return transaction.wait();
    },
    onError: async (error: TransactionError, variables) => {
      // handle when we mine speedups and cancellations
      // see for reference: https://blog.ricmoo.com/highlights-ethers-js-may-2021-2826e858277d
      if (isTransactionReplacedError(error)) {
        if (error.reason === "cancelled") {
          return onTransactionMined?.(
            error.receipt,
            variables,
            TransactionStatus.CANCELLED,
          );
        }

        if (error.reason === "repriced") {
          // The user used "speed up" or something similar
          // in their client, but we now have the updated info
          return onTransactionMined?.(
            error.receipt,
            variables,
            TransactionStatus.REPRICED,
          );
        }
      }

      // otherwise handle errors like reverts etc...
      const addressesJsonKey = lookupAddressKey(contract?.address);
      console.error(
        `Error calling ${methodName as string} on ${addressesJsonKey}: ${
          contract?.address
        } with arguments:`,
        error,
      );
      await onError?.(error);
    },

    onSuccess: async (txReceipt, vars) => {
      return onTransactionMined?.(txReceipt, vars, TransactionStatus.MINED);
    },
  });
}
