import { scaleLinear } from "d3-scale";

import { isIntegerNumber } from "base/numbers";

export function calculateProgress(
  createdAtDate: Date | number | undefined,
  unlockDate: Date | number | undefined,
): number {
  if (!createdAtDate || !unlockDate) {
    return 0;
  }

  const endTime = isIntegerNumber(unlockDate)
    ? unlockDate
    : unlockDate.getTime();

  const startTime = isIntegerNumber(createdAtDate)
    ? createdAtDate
    : createdAtDate.getTime();

  // bind progress value between 0 and 1
  const currentTime = Date.now();
  const progressScale = scaleLinear<number>()
    .domain([startTime, endTime])
    .range([0, 1])
    .clamp(true); // clamp to range when input out of range

  const progressValue = progressScale(currentTime);
  return progressValue;
}
