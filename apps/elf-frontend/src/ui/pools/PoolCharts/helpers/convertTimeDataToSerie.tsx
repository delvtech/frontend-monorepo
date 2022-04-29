import { Serie } from "@nivo/line";
import { TimeData } from "elf/charts/TimeData";

export function convertTimeDataToSerie(
  timeData: TimeData[],
  id: string,
): Serie[] {
  const lineData =
    timeData?.map(({ value, timeMs }) => {
      return {
        x: new Date(timeMs),
        y: value,
      };
    }) ?? [];
  const lineSerie: Serie[] = [
    {
      id,
      data: lineData,
    },
  ];

  return lineSerie;
}
