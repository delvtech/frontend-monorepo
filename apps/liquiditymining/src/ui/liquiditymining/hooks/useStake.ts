import { UseMutationResult } from "react-query";
import { ContractReceipt, Signer } from "ethers";
import {
  matchSmartContractReadCallQuery,
  useSmartContractTransaction,
  UseSmartContractTransactionOptions,
} from "@elementfi/react-query-typechain";
import { MCMod } from "@elementfi/peripherals";
import { masterChef } from "src/elf/liquiditymining/masterChef";
import { queryClient } from "src/elf/queryClient";

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
      const [poolId, _, account] = args[1];
      queryClient.invalidateQueries({
        predicate: (query) =>
          matchSmartContractReadCallQuery(
            query,
            masterChef.address,
            "userInfo",
            [poolId, account],
          ),
      });
      options?.onTransactionMined?.(...args);
    },
  });
}
