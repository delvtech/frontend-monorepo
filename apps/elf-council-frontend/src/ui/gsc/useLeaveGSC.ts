import { useCallback } from "react";

import {
  useSmartContractTransaction,
  useSmartContractReadCall,
  UseSmartContractTransactionOptions,
} from "@elementfi/react-query-typechain";
import { Signer } from "ethers";

import { gscVaultContract } from "src/elf/contracts";
import { GSCVault } from "@elementfi/elf-council-typechain";

const EMPTY_BYTE = "0x00";

export function useLeaveGSC(
  account: string | null | undefined,
  signer?: Signer,
  options?: UseSmartContractTransactionOptions<GSCVault, "kick">,
): () => void {
  const { data: userVaults } = useSmartContractReadCall(
    gscVaultContract,
    "getUserVaults",
    { callArgs: [account as string], enabled: !!account },
  );

  const { mutate: kick } = useSmartContractTransaction(
    gscVaultContract,
    "kick",
    signer,
    options,
  );

  const handleLeave = useCallback(() => {
    if (!account) {
      return;
    }

    // stub out extra data since neither locking vault nor vesting vault use it
    const extraData = userVaults?.map(() => EMPTY_BYTE) || [];
    kick([account, extraData]);
  }, [account, kick, userVaults]);

  return handleLeave;
}
