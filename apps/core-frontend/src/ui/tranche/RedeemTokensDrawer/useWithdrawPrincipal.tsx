import { Tranche } from "@elementfi/core-typechain/dist/v1";
import { useSmartContractTransactionPersisted } from "ui/transactions/useSmartContractTransactionPersisted/useSmartContractTransactionPersisted";
import { ContractMethodArgs } from "elf/contracts/types";
import { BigNumber, Signer } from "ethers";
import { useCallback } from "react";

export function useWithdrawPrincipal(
  signer: Signer | undefined,
  tranche: Tranche | undefined,
  account: string | null | undefined,
  amount: BigNumber | undefined,
  onTransactionSubmitted?: () => void,
): {
  withdraw: () => void;
  reset: () => void;
  isError: boolean;
  isLoading: boolean;
} {
  const withdrawPrincipalCallArgs = makeWithdrawPrincipalCallArgs(
    account,
    amount,
  );

  const {
    mutate: withdrawPrincipal,
    isError,
    isLoading,
    reset,
  } = useSmartContractTransactionPersisted(
    tranche,
    "withdrawPrincipal",
    signer,
    { onTransactionSubmitted },
  );

  const withdraw = useCallback(() => {
    if (!withdrawPrincipalCallArgs) {
      return;
    }
    withdrawPrincipal(withdrawPrincipalCallArgs);
  }, [withdrawPrincipal, withdrawPrincipalCallArgs]);

  return {
    withdraw,
    reset,
    isError,
    isLoading,
  };
}

function makeWithdrawPrincipalCallArgs(
  account: string | null | undefined,
  amount: BigNumber | undefined,
): ContractMethodArgs<Tranche, "withdrawPrincipal"> | undefined {
  if (!amount?.gt(0) || !account) {
    return undefined;
  }

  const callArgs: ContractMethodArgs<Tranche, "withdrawPrincipal"> = [
    amount,
    account,
  ];

  return callArgs;
}
