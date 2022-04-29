import { TimeData } from "elf/charts/TimeData";

/**
 * dedupes by timestamp.  if two or more values have the same second value,
 * the last one is kept.
 */
export function dedupeLiquidityData(data: TimeData[]): TimeData[] {
  return data.reduce((uniques, current) => {
    // filter out existing to 'overwrite' dupes.
    const filteredExisting = uniques.filter(
      (datum) => Math.round(datum.timeMs) !== Math.round(current.timeMs),
    );

    return [...filteredExisting, current];
  }, [] as TimeData[]);
}
