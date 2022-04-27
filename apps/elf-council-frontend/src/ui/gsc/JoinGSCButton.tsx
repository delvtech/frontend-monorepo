import React, { ReactElement, useCallback } from "react";

import {
  useSmartContractReadCall,
  useSmartContractTransaction,
} from "@elementfi/react-query-typechain";
import { BigNumber, Signer } from "ethers";
import { parseEther } from "ethers/lib/utils";
import { t } from "ttag";

import { addressesJson } from "src/elf-council-addresses";
import {
  gscVaultContract,
  lockingVaultContract,
  vestingContract,
} from "src/elf/contracts";
import { ButtonVariant } from "src/ui/base/Button/styles";
import { useGSCVotePowerThreshold } from "src/ui/gsc/useGSCVotePowerThreshold";
import { useIsGSCMember } from "src/ui/gsc/useIsGSCMember";
import { useQueryVotePowerView } from "src/ui/voting/useQueryVotePower";
import { useVotingPowerForAccountAtLatestBlock } from "src/ui/voting/useVotingPowerForAccount";
import Button from "src/ui/base/Button/Button";

const { lockingVault, vestingVault } = addressesJson.addresses;
interface JoinGSCButtonProps {
  account: string | null | undefined;
  signer: Signer | undefined;
  variant?: ButtonVariant;
}

export function JoinGSCButton(props: JoinGSCButtonProps): ReactElement {
  const { account, signer, variant = ButtonVariant.PRIMARY } = props;

  const votePower = useVotingPowerForAccountAtLatestBlock(account);
  const { data: threshold = BigNumber.from(0) } = useGSCVotePowerThreshold();
  const { data: isOnGSC } = useIsGSCMember(account);

  const hasEnoughToJoinGSC = parseEther(votePower).gte(threshold);
  const canLeaveGSC = isOnGSC && parseEther(votePower).lt(threshold);

  const handleJoin = useHandleJoin(account, signer);
  const handleLeave = useHandleLeave(account, signer);

  if (canLeaveGSC) {
    return (
      <Button disabled={!canLeaveGSC} onClick={handleLeave}>{t`Leave`}</Button>
    );
  }

  return (
    <Button
      variant={variant}
      disabled={!hasEnoughToJoinGSC || isOnGSC}
      onClick={handleJoin}
    >{t`Join`}</Button>
  );
}

const EMPTY_BYTE = "0x00";
function useHandleJoin(
  account: string | null | undefined,
  signer: Signer | undefined,
) {
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

function useHandleLeave(
  account: string | null | undefined,
  signer: Signer | undefined,
) {
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
