import React, { ReactElement } from "react";

import { commify, formatEther } from "ethers/lib/utils";
import { t } from "ttag";

import { useGSCVotePowerThreshold } from "src/ui/gsc/useGSCVotePowerThreshold";
import { useVotingPowerForAccountAtLatestBlock } from "src/ui/voting/useVotingPowerForAccount";
import { ProgressBar } from "src/ui/base/ProgressBar/ProgressBar";

import { formatBalance2 } from "@elementfi/base/utils/formatBalance/formatBalance";
import { EligibilityState } from "src/ui/gsc/useGSCStatus";

interface ThresholdProgressBarProps {
  account: string | null | undefined;
  gscStatus?: EligibilityState;
}

// Returns tailwind color for progress bar background
const getProgressBarColor = (status?: EligibilityState) => {
  if (status === EligibilityState.Current) {
    return "bg-votingGreen";
  }

  if (status === EligibilityState.Expiring) {
    return "bg-deepRed";
  }
};

export function ThresholdProgressBar({
  account,
  gscStatus,
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
      <ProgressBar
        progress={+votingPower / +threshold}
        color={getProgressBarColor(gscStatus)}
      />
      <div>
        <span className="text-sm leading-5">
          {`${votingPercent}%`} ({formatBalance2(votingPower, 4)} /{" "}
          {commify(threshold)} ){" "}
        </span>
        <span className="whitespace-nowrap">{t`required to join GSC`}</span>
      </div>
    </div>
  );
}
