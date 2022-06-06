import { Tranche } from "@elementfi/core-typechain/dist/v1";
import { useSmartContractTransactionPersisted } from "ui/transactions/useSmartContractTransactionPersisted/useSmartContractTransactionPersisted";
import { ContractMethodArgs } from "elf/contracts/types";
import { BigNumber, Signer } from "ethers";
import { useCallback } from "react";

export function useWithdrawInterest(
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
  const withdrawInterestCallArgs = makeWithdrawInterestCallArgs(
    account,
    amount,
  );

  const {
    mutate: withdrawInterest,
    isError,
    isLoading,
    reset,
  } = useSmartContractTransactionPersisted(
    tranche,
    "withdrawInterest",
    signer,
    { onTransactionSubmitted },
  );

  const withdraw = useCallback(() => {
    if (!withdrawInterestCallArgs) {
      return;
    }
    withdrawInterest(withdrawInterestCallArgs);
  }, [withdrawInterest, withdrawInterestCallArgs]);

  return {
    withdraw,
    isError,
    isLoading,
    reset,
  };
}

function makeWithdrawInterestCallArgs(
  account: string | null | undefined,
  amount: BigNumber | undefined,
): ContractMethodArgs<Tranche, "withdrawInterest"> | undefined {
  if (!amount?.gt(0) || !account) {
    return undefined;
  }

  const callArgs: ContractMethodArgs<Tranche, "withdrawInterest"> = [
    amount,
    account,
  ];

  return callArgs;
}
