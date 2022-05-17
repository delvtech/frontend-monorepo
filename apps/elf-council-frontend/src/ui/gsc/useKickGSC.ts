import { useCallback } from "react";

import {
  useSmartContractTransaction,
  UseSmartContractTransactionOptions,
} from "@elementfi/react-query-typechain";
import { Signer } from "ethers";

import { gscVaultContract } from "src/elf/contracts";
import { GSCVault } from "@elementfi/elf-council-typechain";

const EMPTY_BYTE = "0x00";

export function useKick(
  signer?: Signer,
  options?: UseSmartContractTransactionOptions<GSCVault, "kick">,
): { handleLeave: (account: string) => void; isLoading: boolean } {
  const { mutate: kick, isLoading } = useSmartContractTransaction(
    gscVaultContract,
    "kick",
    signer,
    options,
  );

  const handleLeave = useCallback(
    async (account: string) => {
      const userVaults = await gscVaultContract.getUserVaults(account);
      // Stub out extra data since neither locking vault nor vesting vault use it
      const extraData = userVaults.map(() => EMPTY_BYTE);
      kick([account, extraData]);
    },
    [kick],
  );

  return { handleLeave, isLoading };
}
