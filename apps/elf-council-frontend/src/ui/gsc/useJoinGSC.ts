import { useCallback } from "react";

import { useSmartContractTransaction } from "@elementfi/react-query-typechain";
import { Signer } from "ethers";

import { addressesJson } from "src/elf-council-addresses";
import {
  gscVaultContract,
  lockingVaultContract,
  vestingContract,
} from "src/elf/contracts";
import { useQueryVotePowerView } from "src/ui/voting/useQueryVotePower";

const { lockingVault, vestingVault } = addressesJson.addresses;

const EMPTY_BYTE = "0x00";

export function useJoinGSC(
  account: string | null | undefined,
  signer?: Signer,
): () => Promise<void> {
  const { mutate: join } = useSmartContractTransaction(
    gscVaultContract,
    "proveMembership",
    signer,
  );

  const lockingVaultVotePower = useQueryVotePowerView(
    account,
    lockingVaultContract,
  );
  const vestingVaultVotePower = useQueryVotePowerView(account, vestingContract);

  const handleJoin = useCallback(async () => {
    const vaults: string[] = [];

    if (!!Number(lockingVaultVotePower)) {
      vaults.push(lockingVault);
    }

    if (!!Number(vestingVaultVotePower)) {
      vaults.push(vestingVault);
    }

    // stub out empty bytes for the extra data since neither locking nor vesting use it
    const extraData = vaults.map(() => EMPTY_BYTE);
    join([vaults, extraData]);
  }, [join, lockingVaultVotePower, vestingVaultVotePower]);

  return handleJoin;
}
