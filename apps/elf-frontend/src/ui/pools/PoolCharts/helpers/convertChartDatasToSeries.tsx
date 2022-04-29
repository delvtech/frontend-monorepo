import { Serie } from "@nivo/line";
import { convertTimeDataToSerie } from "ui/pools/PoolCharts/helpers/convertTimeDataToSerie";
import { dedupeLiquidityData } from "ui/pools/PoolCharts/helpers/dedupeLiquidityData";
import { TimeData } from "elf/charts/TimeData";

export function convertChartDatasToSeries(
  liquidityData: TimeData[] | undefined,
  volumeData: TimeData[] | undefined,
  fromTimestamp: number,
  toTimeStamp: number,
  createdAtTimestamp: number,
  totalLiquidity: number,
): Record<string, Serie[]> {
  // because we are estimating block timestamps, make sure we don't have any older than our time frame
  const filteredLiquidityData =
    liquidityData?.filter(
      (datum) =>
        datum.value >= 0 &&
        datum.timeMs >= fromTimestamp &&
        datum.timeMs <= toTimeStamp,
    ) ?? [];

  if (createdAtTimestamp > fromTimestamp) {
    filteredLiquidityData.unshift({ timeMs: createdAtTimestamp, value: 0 });
  }
  // make sure chart data fills up chart
  const paddedLiquidityData = padTimeData(
    filteredLiquidityData,
    fromTimestamp,
    toTimeStamp,
    totalLiquidity,
  );

  // remove data that have the same timestamp
  const dedupedLiquidityData = dedupeLiquidityData(paddedLiquidityData);

  // because we are estimating block timestamps, make sure we don't have any older than our time frame
  const filteredVolumeData =
    volumeData?.filter(
      (datum) => datum.timeMs >= fromTimestamp && datum.timeMs <= toTimeStamp,
    ) ?? [];

  const liquiditySerie = convertTimeDataToSerie(
    dedupedLiquidityData,
    "liquidity",
  );
  const volumeSerie = convertTimeDataToSerie(filteredVolumeData, "volume");
  return { liquiditySerie, volumeSerie };
}

function padTimeData(
  data: TimeData[],
  startTimestamp: number,
  endTimestamp: number,
  value: number,
) {
  if (data.length === 0) {
    return [
      { value, timeMs: startTimestamp + 1 },
      { value, timeMs: endTimestamp - 1 },
    ];
  }

  const firstDatum: TimeData = { ...data[0], timeMs: startTimestamp + 1 };
  const lastDatum: TimeData = {
    ...data[data.length - 1],
    timeMs: endTimestamp - 1,
  };

  return [firstDatum, ...data, lastDatum];
}
