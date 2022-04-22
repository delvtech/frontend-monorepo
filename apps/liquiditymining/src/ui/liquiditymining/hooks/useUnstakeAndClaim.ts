import { UseMutationResult } from "react-query";
import { ContractReceipt, Signer } from "ethers";
import {
  useSmartContractTransaction,
  UseSmartContractTransactionOptions,
} from "@elementfi/react-query-typechain";
import { MCMod } from "@elementfi/peripherals";
import { masterChef } from "src/elf/liquiditymining/masterChef";

export function useUnstakeAndClaim(
  signer: Signer | undefined,
  options?: UseSmartContractTransactionOptions<MCMod, "withdrawAndHarvest">,
): UseMutationResult<
  ContractReceipt | undefined,
  unknown,
  Parameters<MCMod["withdrawAndHarvest"]>
> {
  return useSmartContractTransaction(
    masterChef,
    "withdrawAndHarvest",
    signer,
    options,
  );
}
