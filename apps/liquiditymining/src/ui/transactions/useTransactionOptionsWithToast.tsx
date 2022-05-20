import { useRef } from "react";
import toast from "react-hot-toast";
import { Contract } from "ethers";
import { UseSmartContractTransactionOptions } from "@elementfi/react-query-typechain/src/hooks/useSmartContractTransaction/useSmartContractTransaction";
import { ETHERSCAN_TRANSACTION_DOMAIN } from "src/elf-etherscan/domain";
import ExternalLink from "src/ui/base/ExternalLink/ExternalLink";
import { jt, t } from "ttag";

interface UseTransactionOptionsWithToastProps<
  TContract extends Contract,
  TMethodName extends keyof TContract["functions"],
> {
  pendingMessage?: string;
  successMessage?: string;
  errorMessage?: string;
  options?: UseSmartContractTransactionOptions<TContract, TMethodName>;
}

/**
 * A hook for creating transaction options which include logic for showing
 * toast notifications.
 *
 * @param props An object for configuring the toast text and transaction options
 * @param props.pendingMessage The message to show when the transaction is
 *   pending.
 * @param props.successMessage The message to show when the transaction has been
 *   submitted successfully.
 * @param props.errorMessage The message to show when the transaction fails.
 * @param props.options `useSmartContractTransaction` options
 * @returns New `useSmartContractTransaction` options which include logic for
 *   showing toast notifications.
 */
export function useTransactionOptionsWithToast<
  TContract extends Contract,
  TMethodName extends keyof TContract["functions"],
>({
  pendingMessage = t`Confirming transaction`,
  successMessage = t`Transaction successfully confirmed`,
  errorMessage,
  options,
}: UseTransactionOptionsWithToastProps<
  TContract,
  TMethodName
>): UseSmartContractTransactionOptions<TContract, TMethodName> &
  // remove the undefined type from the methods defined here
  Required<
    Pick<
      UseSmartContractTransactionOptions<TContract, TMethodName>,
      "onError" | "onTransactionMined" | "onTransactionSubmitted"
    >
  > {
  const toastIdRef = useRef<string>();
  return {
    ...options,
    onTransactionSubmitted: (...args) => {
      const [tx] = args;
      const etherscanLink = (
        <ExternalLink
          href={`${ETHERSCAN_TRANSACTION_DOMAIN}/${tx.hash}`}
          text={t`View on etherscan`}
          className="text-principalRoyalBlue"
        />
      );
      const message = <div>{jt`${pendingMessage}... ${etherscanLink}`}</div>;
      toastIdRef.current = toast.loading(message);
      options?.onTransactionSubmitted?.(...args);
    },
    onTransactionMined: (...args) => {
      const [receipt] = args;
      if (receipt) {
        toast.success(successMessage, {
          id: toastIdRef.current,
        });
      } else {
        toast.error(t`Not connected`);
      }
      options?.onTransactionMined?.(...args);
    },
    onError: (...args) => {
      const [error] = args;
      toast.error(errorMessage || error.message, { id: toastIdRef.current });
      options?.onError?.(...args);
    },
  };
}
