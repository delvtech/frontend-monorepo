import React, { ReactElement } from "react";

import { Icon, Intent, Tag } from "@blueprintjs/core";
import { IconName, IconNames } from "@blueprintjs/icons";
import { t } from "ttag";

import { formatPercent } from "base/formatPercent/formatPercent";

interface TrendIndicatorProps {
  value: number | undefined;
  hideWhenZero?: boolean;
}
export function TrendIndicator({
  value,
  hideWhenZero = true,
}: TrendIndicatorProps): ReactElement | null {
  let intent: Intent;
  let icon: IconName;
  let label: string;

  // if the value would be formatted to '0.00%', then format the indicator to reflect this.
  const valueIsNearZero = !!value && !Math.round(value * 10000);

  if (value === undefined || !Number.isFinite(value)) {
    if (hideWhenZero) {
      return null;
    }
    intent = Intent.WARNING;
    icon = IconNames.SMALL_MINUS;
    label = t`n/a`;
  } else if (value === 0 || valueIsNearZero) {
    if (hideWhenZero) {
      return null;
    }
    intent = Intent.WARNING;
    icon = IconNames.SMALL_MINUS;
    label = formatPercent(0);
  } else {
    intent = value >= 0 ? Intent.SUCCESS : Intent.DANGER;
    icon = value >= 0 ? IconNames.CARET_UP : IconNames.CARET_DOWN;
    label = formatPercent(value);
  }

  return (
    <Tag minimal intent={intent}>
      {label}
      <Icon icon={icon} />
    </Tag>
  );
}
