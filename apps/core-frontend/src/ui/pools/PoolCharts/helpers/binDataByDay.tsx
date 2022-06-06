import { sum } from "d3-array";
import { nest } from "d3-collection";
import { timeDay } from "d3-time";
import { TimeData } from "elf/charts/TimeData";

export function binDataByDay(
  data: TimeData[],
  startTimestamp: number,
  endTimestamp: number,
): TimeData[] {
  const startDay = new Date(startTimestamp);
  const endDay = new Date(endTimestamp);

  startDay.setHours(0, 0, 0, 0);
  endDay.setHours(0, 0, 0, 0);

  // make sure there is at least one zero value for each day
  const emptyData: TimeData[] = [];
  const day = startDay;
  do {
    // add one to make sure 'timeMs' falls within the day's timestamp range when its binned in
    // the next step
    emptyData.push({ timeMs: day.getTime() + 1, value: 0 });
    day.setDate(day.getDate() + 1);
  } while (day.getTime() <= endDay.getTime());

  const binnedData = nest<TimeData, number>()
    .key((datum) => {
      const date = new Date(datum.timeMs);
      const key = timeDay(date).getTime().toString();
      return key;
    })
    .rollup((values) => {
      return sum(values, (datum) => datum.value);
    })
    .entries([...data, ...emptyData])
    .map((data) => ({ timeMs: +data.key, value: data.value } as TimeData));

  return binnedData;
}
