import React, { ReactElement } from "react";

import { commify, formatEther } from "ethers/lib/utils";
import { t } from "ttag";

import { useGSCVotePowerThreshold } from "src/ui/gsc/useGSCVotePowerThreshold";
import { useVotingPowerForAccountAtLatestBlock } from "src/ui/voting/useVotingPowerForAccount";
import { ProgressBar } from "src/ui/base/ProgressBar/ProgressBar";

interface ThresholdProgressBarProps {
  account: string | null | undefined;
}

export function ThresholdProgressBar({
  account,
}: ThresholdProgressBarProps): ReactElement {
  const { data: thresholdValue } = useGSCVotePowerThreshold();
  const threshold = formatEther(thresholdValue || 0);

  const votingPower = useVotingPowerForAccountAtLatestBlock(account);
  const votingPercent = Math.floor((+votingPower / +threshold) * 100);

  return (
    <div className="mr-3 w-full space-y-1 text-white">
      <div>
        <span className="text-lg">{t`GSC Eligibility`}</span>
      </div>
      <ProgressBar progress={+votingPower / +threshold} />
      <div>
        <span className="text-sm">
          {`${votingPercent}%`} ({commify(votingPower)} / {commify(threshold)} ){" "}
        </span>
        <span className="text-sm">{t`required to join GSC`}</span>
      </div>
    </div>
  );
}
