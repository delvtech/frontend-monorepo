import React, { ReactElement } from "react";

import { Classes, Intent, ProgressBar } from "@blueprintjs/core";
import classNames from "classnames";

import tw from "efi-tailwindcss-classnames";

interface LabeledProgressBarProps {
  progressValue: number;
  label?: string;

  helperText?: string;
  subHelperText?: string;
  intent?: Intent;
  showProgress: boolean;
}
export function LabeledProgressBar({
  helperText,
  subHelperText,
  intent,
  label,
  progressValue,
  showProgress,
}: LabeledProgressBarProps): ReactElement {
  return (
    <div
      className={tw(
        "flex",
        "h-full",
        "w-full",
        "flex-col",
        "justify-center",
        "space-y-2",
        "overflow-hidden",
      )}
    >
      <span>{label}</span>
      {showProgress ? (
        <ProgressBar
          intent={intent}
          animate={false}
          stripes={false}
          value={progressValue}
        />
      ) : null}
      {!!helperText && (
        <span
          className={classNames(Classes.TEXT_MUTED, tw("text-sm", "truncate"))}
        >
          {helperText}
        </span>
      )}
      {!!subHelperText && (
        <span
          className={classNames(Classes.TEXT_MUTED, tw("text-sm", "truncate"))}
        >
          {subHelperText}
        </span>
      )}
    </div>
  );
}
