import { UseMutationResult, useQueryClient } from "react-query";
import { ContractReceipt, ethers, Signer } from "ethers";
import {
  matchSmartContractReadCallQuery,
  useSmartContractTransaction,
  UseSmartContractTransactionOptions,
} from "@elementfi/react-query-typechain";
import { masterChef } from "src/elf/liquiditymining/masterChef";
import { ConvergentCurvePool } from "@elementfi/core-typechain/dist/v1.1";

type UseSmartContractTransactionResult = UseMutationResult<
  ContractReceipt | undefined,
  unknown,
  Parameters<ConvergentCurvePool["approve"]>
>;

export function useApprovePool(
  poolContract: ConvergentCurvePool,
  account: string | null | undefined,
  signer: Signer | undefined,
  options?: UseSmartContractTransactionOptions<ConvergentCurvePool, "approve">,
): Omit<UseSmartContractTransactionResult, "mutate"> & {
  // overwrite the mutate function to have no arguments
  mutate: () => ReturnType<UseSmartContractTransactionResult["mutate"]>;
} {
  const queryClient = useQueryClient();
  const useMutationResult = useSmartContractTransaction(
    poolContract,
    "approve",
    signer,
    {
      ...options,
      onTransactionMined: (...args) => {
        queryClient.invalidateQueries({
          predicate: (query) =>
            matchSmartContractReadCallQuery(
              query,
              poolContract?.address,
              "allowance",
              [account as string, masterChef.address],
            ),
        });
        options?.onTransactionMined?.(...args);
      },
    },
  );
  return {
    ...useMutationResult,
    mutate: () =>
      useMutationResult.mutate([
        masterChef.address,
        ethers.constants.MaxUint256,
      ]),
  };
}
