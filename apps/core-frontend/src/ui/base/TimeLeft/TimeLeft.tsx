import { ReactElement } from "react";

import { Classes, Intent, ProgressBar, Tag } from "@blueprintjs/core";
import classNames from "classnames";
import { format } from "date-fns";
import { t } from "ttag";

import tw from "efi-tailwindcss-classnames";
import { calculateProgress } from "base/calculateProgress/calculateProgress";
import { formatTimeLeft } from "base/formatTImeLeft/formatTimeLeft";
import { formatLengthOfTime } from "elf/time/formatLengthOfTime/formatLengthOfTime";
import { useNowMs } from "ui/base/hooks/useNowMs/useNowMs";

interface TimeLeftProps {
  /**
   * unix time in ms
   */
  startTimestamp: number | undefined;
  /**
   * unix time in ms
   */
  maturityTimestamp: number | undefined;

  isDarkMode: boolean;
}

export function TimeLeft(props: TimeLeftProps): ReactElement {
  const {
    startTimestamp: startDate = 0,
    maturityTimestamp: maturityDate = 0,
    isDarkMode,
  } = props;
  const nowMs = useNowMs();
  const progress = calculateProgress(startDate, maturityDate);

  const termLength = formatLengthOfTime(startDate, maturityDate);
  const timeLeft = formatTimeLeft(nowMs, maturityDate);
  const timeLeftLabel = t`${timeLeft} left`;

  if (!startDate || !maturityDate) {
    return <span>{t`loading`}</span>;
  }

  const isMature = nowMs > maturityDate;

  return (
    <div
      className={tw(
        "flex",
        "flex-col",
        "h-full",
        "w-full",
        "space-y-2",
        "flex-shrink-0",
      )}
    >
      <div className={tw("flex", "justify-between")}>
        <div className={classNames(tw("text-sm", "truncate"))}>
          {format(maturityDate, "MMM d, y")}
        </div>
        <Tag
          minimal={!isDarkMode}
          intent={isMature ? Intent.SUCCESS : Intent.PRIMARY}
          className={classNames(tw("truncate"))}
        >
          {termLength}
        </Tag>
      </div>
      <ProgressBar
        intent={isMature ? Intent.SUCCESS : Intent.PRIMARY}
        animate={false}
        stripes={false}
        value={progress}
      />
      <div
        className={classNames(Classes.TEXT_MUTED, tw("text-sm", "truncate"))}
      >
        {isMature ? t`Term complete` : timeLeftLabel}
      </div>
    </div>
  );
}
