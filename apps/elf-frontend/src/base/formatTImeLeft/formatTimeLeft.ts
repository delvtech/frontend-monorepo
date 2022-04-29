import { formatDuration, intervalToDuration } from "date-fns";
import { t } from "ttag";

import { ONE_MINUTE_IN_MILLISECONDS } from "base/time";

/**
 * Returns a human-readable label for how much time is left between now and the
 * given end time.
 *
 * Note: inputs are in milliseconds.
 */
export function formatTimeLeft(start: number, end: number): string {
  const duration = intervalToDuration({
    start: start,
    end: end,
  });
  const { months, days } = duration;

  if (end - start < ONE_MINUTE_IN_MILLISECONDS) {
    return t`less than one minute`;
  }

  let format = ["months", "days", "hours", "minutes"];

  if (months) {
    format = ["months", "days"];
  } else if (days && days > 1) {
    format = ["days", "hours"];
  } else if (days && days <= 1) {
    format = ["days", "hours", "minutes"];
  }

  const timeLeft = formatDuration(duration, {
    delimiter: ", ",
    format,
  });

  return timeLeft;
}
