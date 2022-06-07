import { useCallback } from "react";

import {
  useSmartContractTransaction,
  UseSmartContractTransactionOptions,
} from "@elementfi/react-query-typechain/src/hooks/useSmartContractTransaction/useSmartContractTransaction";
import { Signer } from "ethers";

import { addressesJson } from "src/elf-council-addresses";
import {
  gscVaultContract,
  lockingVaultContract,
  vestingContract,
} from "src/contracts";
import { useQueryVotePowerView } from "src/ui/voting/useQueryVotePower";
import { GSCVault } from "@elementfi/council-typechain";

const { lockingVault, vestingVault } = addressesJson.addresses;

const EMPTY_BYTE = "0x00";

export function useJoinGSC(
  account: string | null | undefined,
  signer?: Signer,
  options?: UseSmartContractTransactionOptions<GSCVault, "proveMembership">,
): { handleJoin: () => Promise<void>; isLoading: boolean } {
  const { mutate: join, isLoading } = useSmartContractTransaction(
    gscVaultContract,
    "proveMembership",
    signer,
    options,
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

  return { handleJoin, isLoading };
}
