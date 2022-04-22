import { UseMutationResult } from "react-query";
import { ContractReceipt, Signer } from "ethers";
import {
  useSmartContractTransaction,
  UseSmartContractTransactionOptions,
} from "@elementfi/react-query-typechain";
import { MCMod } from "@elementfi/peripherals";
import { masterChef } from "src/elf/liquiditymining/masterChef";

export function useStake(
  signer: Signer | undefined,
  options?: UseSmartContractTransactionOptions<MCMod, "deposit">,
): UseMutationResult<
  ContractReceipt | undefined,
  unknown,
  Parameters<MCMod["deposit"]>
> {
  return useSmartContractTransaction(masterChef, "deposit", signer, options);
}
