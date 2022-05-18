import {
  useSmartContractTransaction,
  UseSmartContractTransactionOptions,
} from "@elementfi/react-query-typechain";
import { ContractReceipt, Signer } from "ethers";

import { gscVaultContract } from "src/elf/contracts";
import { GSCVault } from "@elementfi/elf-council-typechain";
import { UseMutationResult } from "react-query";

export function useKick(
  signer?: Signer,
  options?: UseSmartContractTransactionOptions<GSCVault, "kick">,
): UseMutationResult<
  ContractReceipt | undefined,
  unknown,
  Parameters<GSCVault["kick"]>
> {
  return useSmartContractTransaction(gscVaultContract, "kick", signer, options);
}
