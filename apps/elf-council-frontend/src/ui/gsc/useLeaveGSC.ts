import { useCallback } from "react";

import {
  useSmartContractTransaction,
  useSmartContractReadCall,
} from "@elementfi/react-query-typechain";
import { Signer } from "ethers";

import { gscVaultContract } from "src/elf/contracts";

const EMPTY_BYTE = "0x00";

export function useLeaveGSC(
  account: string | null | undefined,
  signer?: Signer,
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
