import { Intent, Tag } from "@blueprintjs/core";
import classNames from "classnames";
import tw from "efi-tailwindcss-classnames";
import { useNowMs } from "ui/base/hooks/useNowMs/useNowMs";
import { useDarkMode } from "ui/prefs/useDarkMode/useDarkMode";
import { formatLengthOfTime } from "elf/time/formatLengthOfTime/formatLengthOfTime";
import { ReactElement } from "react";

interface TermTagProps {
  createdAtTimestamp: number;
  unlockTimestamp: number;
}
export function TermTag({
  createdAtTimestamp,
  unlockTimestamp,
}: TermTagProps): ReactElement {
  const { isDarkMode } = useDarkMode();
  const nowMs = useNowMs();
  const termLength = formatLengthOfTime(
    createdAtTimestamp * 1000,
    unlockTimestamp * 1000,
  );
  const isMature = nowMs > unlockTimestamp * 1000;

  return (
    <Tag
      minimal={!isDarkMode}
      intent={isMature ? Intent.SUCCESS : Intent.PRIMARY}
      className={classNames(tw("truncate"))}
    >
      {termLength}
    </Tag>
  );
}
