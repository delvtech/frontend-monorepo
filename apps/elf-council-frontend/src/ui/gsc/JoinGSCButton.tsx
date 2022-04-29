import React, { ReactElement, useState } from "react";

import { BigNumber, Signer } from "ethers";
import { parseEther } from "ethers/lib/utils";
import { t } from "ttag";

import { ButtonVariant } from "src/ui/base/Button/styles";
import { useGSCVotePowerThreshold } from "src/ui/gsc/useGSCVotePowerThreshold";
import { useIsGSCMember } from "src/ui/gsc/useIsGSCMember";
import { useVotingPowerForAccountAtLatestBlock } from "src/ui/voting/useVotingPowerForAccount";
import Button from "src/ui/base/Button/Button";
import Dialog from "src/ui/base/Dialog/Dialog";
import { useJoinGSC } from "./useJoinGSC";
import { useLeaveGSC } from "./useLeaveGSC";

interface JoinGSCButtonProps {
  account: string | null | undefined;
  signer: Signer | undefined;
  variant?: ButtonVariant;
}

export function JoinGSCButton({
  account,
  signer,
  variant = ButtonVariant.PRIMARY,
}: JoinGSCButtonProps): ReactElement {
  const votePower = useVotingPowerForAccountAtLatestBlock(account);
  const { data: threshold = BigNumber.from(0) } = useGSCVotePowerThreshold();
  const { data: isOnGSC } = useIsGSCMember(account);

  const hasEnoughToJoinGSC = parseEther(votePower).gte(threshold);
  const canLeaveGSC = isOnGSC && parseEther(votePower).lt(threshold);

  const handleJoin = useJoinGSC(account, signer);
  const handleLeave = useLeaveGSC(account, signer);

  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      {canLeaveGSC ? (
        <Button
          disabled={!canLeaveGSC}
          onClick={handleLeave}
        >{t`Leave`}</Button>
      ) : (
        <Button
          variant={variant}
          disabled={!hasEnoughToJoinGSC || isOnGSC}
          onClick={() => setDialogOpen(true)}
        >{t`Join`}</Button>
      )}
      <Dialog isOpen={dialogOpen} onClose={() => setDialogOpen(false)}>
        <div>
          <div className="text-principalRoyalBlue mb-4 text-lg font-bold">
            {t`Join Confirmation`}
          </div>
          <div className="text-principalRoyalBlue mb-8 text-sm">
            {t`Are you sure you want to join the the GSC? This means that you will
            be responsible for the rights and responsibilities of a GSC member
            and held accountable by Element DAO from this moment forward.`}
          </div>
          <div className="flex w-full justify-end">
            <Button
              className="mr-2"
              variant={ButtonVariant.OUTLINE_BLUE}
              onClick={() => setDialogOpen(false)}
            >{t`Cancel`}</Button>
            <Button
              variant={ButtonVariant.GRADIENT}
              onClick={() => handleJoin}
            >{t`Join`}</Button>
          </div>
        </div>
      </Dialog>
    </>
  );
}

export function LeaveGSCButton(props: JoinGSCButtonProps): ReactElement {
  const { account, signer } = props;

  const votePower = useVotingPowerForAccountAtLatestBlock(account);
  const { data: threshold = BigNumber.from(0) } = useGSCVotePowerThreshold();
  const { data: isOnGSC } = useIsGSCMember(account);

  const canLeaveGSC = isOnGSC && parseEther(votePower).lt(threshold);

  const handleJoin = useJoinGSC(account, signer);
  const handleLeave = useLeaveGSC(account, signer);

  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      <Button disabled={!canLeaveGSC} onClick={handleLeave}>{t`Leave`}</Button>
      <Dialog isOpen={dialogOpen} onClose={() => setDialogOpen(false)}>
        <div>
          <div className="text-principalRoyalBlue mb-4 text-lg font-bold">
            {t`Leave Confirmation`}
          </div>
          <div className="text-principalRoyalBlue mb-8 text-sm">
            {t`Are you sure you want to join the the GSC? This means that you will
            be responsible for the rights and responsibilities of a GSC member
            and held accountable by Element DAO from this moment forward.`}
          </div>
          <div className="flex w-full justify-end">
            <Button
              className="mr-2"
              variant={ButtonVariant.OUTLINE_BLUE}
              onClick={() => setDialogOpen(false)}
            >{t`Cancel`}</Button>
            <Button
              variant={ButtonVariant.GRADIENT}
              onClick={() => handleJoin}
            >{t`Confirm`}</Button>
          </div>
        </div>
      </Dialog>
    </>
  );
}
