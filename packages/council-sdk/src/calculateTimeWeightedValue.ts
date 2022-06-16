import { ValueOverPeriod } from "src/ValueOverPeriod";

/**
 * Calculates a time-weighted value for an asset over a given window of time.
 * @param valueTimeBlocks an array of objects that contain a value and the range for the value.
 * @param startBlock the eth block beginning the period for the weighted value.  timestamp in whole seconds.
 * must come before first value change.
 * @param endBlock the eth block ending the period for the weighted value.  timestamp in whole seconds.  must
 * come after last value change.
 */
export function calculateTimeWeightedValue(
  valueTimeBlocks: ValueOverPeriod[],
  startBlock: number,
  endBlock: number,
): bigint {
  let total = BigInt(0);
  valueTimeBlocks.forEach(({ value, start: valueStart, end: valueEnd }) => {
    const time = BigInt(valueEnd - valueStart);
    total += value * time;
  });

  const timeWeightedValue = total / BigInt(endBlock - startBlock);

  return timeWeightedValue;
}
