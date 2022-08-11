import {
  BigNumber,
  Contract,
  ContractReceipt,
  ContractTransaction,
  Overrides,
  Signer,
} from "ethers";
import { useMutation, UseMutationResult } from "react-query";
import {
  isTransactionFailedError,
  isTransactionReplacedError,
  TransactionError,
} from "@elementfi/react-query-typechain/src/base/TransactionError";
import { TransactionStatus } from "@elementfi/react-query-typechain/src/base/TransactionStatus";
import {
  ContractFunctionCall,
  ContractMethodArgs,
  ContractMethodName,
  EstimateGasContractCall,
  EstimateGasMethodName,
} from "@elementfi/react-query-typechain/src/types";
import { isOverridesObject } from "@elementfi/react-query-typechain/src/utils/isOverridesObject";

export interface UseSmartContractTransactionOptions<
  TContract extends Contract,
  TMethodName extends ContractMethodName<TContract>,
> {
  /**
   * Sets the gas limit on the transaction, overriding anything that was
   * provided when the `mutate` function is called. Useful if you need to buffer
   * the default gas estimate by some amount.
   */
  setGasLimit?: (gasEstimate: BigNumber) => BigNumber;
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

type UseSmartContractTransactionResult<
  TContract extends Contract,
  TMethodName extends ContractMethodName<TContract>,
> = UseMutationResult<
  ContractReceipt | undefined,
  unknown,
  ContractMethodArgs<TContract, TMethodName>
>;

export function useSmartContractTransaction<
  TContract extends Contract,
  TMethodName extends ContractMethodName<TContract>,
>(
  // TODO: contracts should not be undefined thanks to tokenlist
  contract: TContract | undefined,
  methodName: TMethodName,
  signer: Signer | null | undefined,
  options: UseSmartContractTransactionOptions<TContract, TMethodName> = {},
): UseSmartContractTransactionResult<TContract, TMethodName> {
  const { onTransactionMined, onTransactionSubmitted, onError, setGasLimit } =
    options;

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

      let finalCallArgs: ContractMethodArgs<TContract, TMethodName> = args;

      // Sets the gasLimit by either updating the existing overrides object,
      // or adding one if it doesn't exist.
      if (setGasLimit) {
        const gasEstimate = await fetchGasEstimate<TContract, TMethodName>(
          connected,
          methodName,
          args,
        );

        const gasLimit = setGasLimit(gasEstimate);

        const lastItem = args[args.length - 1];
        if (isOverridesObject(lastItem)) {
          const argsWithoutOverrides = args.slice(0, args.length - 1);
          const newOverrides: Overrides = { ...lastItem, gasLimit };
          finalCallArgs = [
            ...argsWithoutOverrides,
            newOverrides,
          ] as ContractMethodArgs<TContract, TMethodName>;
        } else {
          finalCallArgs = [...args, { gasLimit }] as ContractMethodArgs<
            TContract,
            TMethodName
          >;
        }
      }

      const transaction: ContractTransaction = await connected[methodName](
        ...finalCallArgs,
      );
      onTransactionSubmitted?.(transaction, args);

      // This is not the testing-library wait() method, shoo eslint
      // eslint-disable-next-line testing-library/await-async-utils
      return transaction?.wait();
    },
    onError: async (error: TransactionError, variables) => {
      if (isTransactionFailedError(error)) {
        // add an alert in development to remind you to reset your metamask account if the nonces
        // don't match.  this is necessary every time you restart the local testnet if you've
        // completed transactions.
        if (
          process.env.NODE_ENV === "development" &&
          error.message.includes("Nonce too high.")
        ) {
          alert(
            "Nonces don't match.  Try resetting your metamask account.  Click the account icon -> Settings -> Advanced -> Reset Account",
          );
        }
      }
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

      console.error(
        `Error calling ${methodName as string} on: ${
          contract?.address
        } with arguments:`,
        variables,
        error,
      );
      await onError?.(error);
    },

    onSuccess: async (txReceipt, vars) => {
      return onTransactionMined?.(txReceipt, vars, TransactionStatus.MINED);
    },
  });
}

async function fetchGasEstimate<
  TContract extends Contract,
  TMethodName extends ContractMethodName<TContract>,
>(
  connected: TContract,
  methodName: TMethodName,
  args: Parameters<ContractFunctionCall<TContract, TMethodName>>,
): Promise<BigNumber> {
  return (
    connected.estimateGas as Record<
      // typechain's estimateGas isn't strongly typed, so we cast so that
      // `methodName` is type-safe
      EstimateGasMethodName<TContract>,
      EstimateGasContractCall<TContract, TMethodName>
    >
  )[methodName](...args);
}
