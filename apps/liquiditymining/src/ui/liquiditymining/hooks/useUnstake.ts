import { UseMutationResult } from "react-query";
import { ContractReceipt, Signer } from "ethers";
import {
  useSmartContractTransaction,
  UseSmartContractTransactionOptions,
} from "@elementfi/react-query-typechain";
import { MCMod } from "@elementfi/peripherals";
import { masterChef } from "src/elf/liquiditymining/masterChef";
import { invalidateBalanceQueries } from "src/ui/liquiditymining/utils/invalidateBalanceQueries";

export function useUnstake(
  signer: Signer | undefined,
  options?: UseSmartContractTransactionOptions<MCMod, "withdraw">,
): UseMutationResult<
  ContractReceipt | undefined,
  unknown,
  Parameters<MCMod["withdraw"]>
> {
  return useSmartContractTransaction(masterChef, "withdraw", signer, {
    ...options,
    onTransactionMined: (...args) => {
      const [poolId, _, account] = args[1];
      invalidateBalanceQueries(poolId, account);
      options?.onTransactionMined?.(...args);
    },
  });
}
