import React, { ReactElement } from "react";

import { Intent, ProgressBar } from "@blueprintjs/core";

import tw from "efi-tailwindcss-classnames";
import { TimeLeftLabel } from "ui/portfolio/PrincipalTokenCard/getTimeLeftLabel";
import { getIsMature } from "elf/tranche/getIsMature";

interface MaturityTimeBarLabelProps {
  progress: number;
  unlockTimestamp: number;
}

export function MaturityTimeBar({
  progress,
  unlockTimestamp,
}: MaturityTimeBarLabelProps): ReactElement {
  const isMature = getIsMature(unlockTimestamp);
  return (
    <div className={tw("w-full", "space-y-2", "flex", "flex-col")}>
      <div>
        <TimeLeftLabel unlockTimestamp={unlockTimestamp} />
      </div>
      <ProgressBar
        intent={isMature ? Intent.SUCCESS : Intent.PRIMARY}
        stripes={false}
        animate={false}
        value={progress}
      />
    </div>
  );
}
