import { UseMutationResult } from "react-query";
import { ContractReceipt, Signer } from "ethers";
import {
  useSmartContractTransaction,
  UseSmartContractTransactionOptions,
} from "@elementfi/react-query-typechain/src/hooks/useSmartContractTransaction/useSmartContractTransaction";
import { MCMod } from "@elementfi/peripherals";
import { masterChef } from "src/elf/liquiditymining/masterChef";
import { invalidateBalanceQueries } from "src/ui/liquiditymining/utils/invalidateBalanceQueries";

export function useStake(
  signer: Signer | undefined,
  options?: UseSmartContractTransactionOptions<MCMod, "deposit">,
): UseMutationResult<
  ContractReceipt | undefined,
  unknown,
  Parameters<MCMod["deposit"]>
> {
  return useSmartContractTransaction(masterChef, "deposit", signer, {
    ...options,
    onTransactionMined: (...args) => {
      const [poolId, unusedValue, account] = args[1];
      invalidateBalanceQueries(poolId, account);
      options?.onTransactionMined?.(...args);
    },
  });
}
