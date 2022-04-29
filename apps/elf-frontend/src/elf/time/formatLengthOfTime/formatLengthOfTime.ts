import { t } from "ttag";

import { ONE_DAY_IN_MILLISECONDS, ONE_HOUR_IN_MILLISECONDS } from "base/time";

export function formatLengthOfTime(startMs: number, endMs: number): string {
  const differenceMs = endMs - startMs;

  if (differenceMs < ONE_DAY_IN_MILLISECONDS) {
    const numHours = Math.round(differenceMs / ONE_HOUR_IN_MILLISECONDS);
    return t`${numHours} Hour`;
  }

  const numDays = Math.round(differenceMs / ONE_DAY_IN_MILLISECONDS);
  return t`${numDays} Day`;
}
