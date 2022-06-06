import { ReactElement } from "react";

import classNames from "classnames";
import { formatDistance } from "date-fns";
import { t } from "ttag";

import tw from "efi-tailwindcss-classnames";
import { convertEpochSecondsToDate } from "base/convertEpochSecondsToDate/convertEpochSecondsToDate";
import { formatTimeLeft } from "base/formatTImeLeft/formatTimeLeft";
import { getIsMature } from "elf/tranche/getIsMature";
import { useNowMs } from "ui/base/hooks/useNowMs/useNowMs";

interface TimeLeftLabelProps {
  unlockTimestamp: number;
}

export function TimeLeftLabel(props: TimeLeftLabelProps): ReactElement | null {
  const { unlockTimestamp } = props;
  const nowMs = useNowMs();
  const unlockTimestampDate = convertEpochSecondsToDate(unlockTimestamp);

  const isMature = getIsMature(unlockTimestamp);

  if (isMature) {
    const timeSinceMaturity = getTimeSinceMaturityLabel(
      unlockTimestampDate,
      nowMs,
    );
    return (
      <span className={classNames(tw("text-base"))}>
        {t`Term reached `}
        <strong>{timeSinceMaturity}</strong>
      </span>
    );
  }

  const timeLeft = formatTimeLeft(nowMs, unlockTimestampDate.getTime());
  return (
    <span>
      {t`Reaches term in`} <strong>{timeLeft}</strong>
    </span>
  );
}

function getTimeSinceMaturityLabel(
  maturationDate: Date,
  nowMs: number,
): string {
  return formatDistance(maturationDate, nowMs, { addSuffix: true });
}
