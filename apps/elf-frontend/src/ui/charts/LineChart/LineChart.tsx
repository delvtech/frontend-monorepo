import { ReactElement, ReactNode, useEffect, useMemo, useState } from "react";

import { Colors } from "@blueprintjs/core";
import { AxisProps, GridValues } from "@nivo/axes";
import { Margin } from "@nivo/core";
import {
  CustomLayerProps,
  DatumValue,
  Layer,
  ResponsiveLine,
  Serie,
  SliceTooltipProps,
} from "@nivo/line";
import { ScaleLinearSpec, ScaleTimeSpec } from "@nivo/scales";
import { line } from "d3-shape";
import { Currency, Money } from "ts-money";
import { t } from "ttag";

import tw from "efi-tailwindcss-classnames";
import { useNowMs } from "ui/base/hooks/useNowMs/useNowMs";
import { useIsTailwindLargeScreen } from "ui/base/mediaBreakpoints";
import { useCurrencyPref } from "ui/prefs/useCurrency/useCurencyPref";
import { EMPTY_ARRAY } from "base/emptyArray";
import { ONE_DAY_IN_MILLISECONDS, ONE_WEEK_IN_MILLISECONDS } from "base/time";
import { formatMoney } from "elf/money/formatMoney";

const margin: Partial<Margin> = { top: 20, right: 40, bottom: 40, left: 80 };
const smallScreenMargin: Partial<Margin> = {
  top: 8,
  right: 10,
  bottom: 40,
  left: 40,
};

const defaultBottomAxis: AxisProps = {
  tickSize: 5,
  format: "%a",
  tickValues: getTimeTickValues(),
  tickPadding: 5,
  tickRotation: 0,
  legendOffset: 36,
  legendPosition: "middle",
};
const smallScreenBottomAxis: AxisProps = {
  ...defaultBottomAxis,
  format: "",
  legend: t`Recent 7(d)`,
  legendOffset: 24,
};

export interface LineChartProps {
  chartType: "lines" | "bars";
  groupBarData: boolean;
  dataLabel: ReactNode;
  darkMode?: boolean;
  data: Serie[];
  formatYValues: (value: number) => string;
}

export function LineChart(props: LineChartProps): ReactElement {
  const {
    chartType = "lines",
    groupBarData,
    dataLabel,
    darkMode,
    data = EMPTY_ARRAY as Serie[],
    formatYValues,
  } = props;
  const [chartData, setChartData] = useLoadChartData(data);
  useClearDataWhenChartTypeChanges(setChartData, data, chartType);

  const { currency } = useCurrencyPref();
  const { dataColor, textColor, tooltipBackground, tooltipColor } =
    getColors(darkMode);

  const theme = getTheme(textColor);

  const maxDataValue = chartData[0]?.data?.reduce((highestValue, datum) => {
    const currentValue = (datum?.y || 0) as number;
    if (currentValue > highestValue) {
      return currentValue;
    }
    return highestValue;
  }, 0);

  // give the chart a 20% cushion from the highest data value so it looks nice
  const maxYScale = Math.round(maxDataValue * 1.2) || 100;

  const yScale: ScaleLinearSpec = {
    type: "linear",
    min: 0,
    max: maxYScale,
    stacked: true,
    reverse: false,
  };

  const customLayer = useMemo(() => {
    let layer: Layer = "lines";

    if (chartType === "bars") {
      layer = groupBarData
        ? makeBarLayer(dataColor)
        : makeVerticalLineLayer(dataColor);
    }

    return layer;
  }, [chartType, dataColor, groupBarData]);

  const SliceTooltip = makeSliceTooltip(
    tooltipBackground,
    tooltipColor,
    currency,
  );

  const xScale: ScaleTimeSpec = useXScale(chartType, groupBarData, data);

  const isLargeScreen = useIsTailwindLargeScreen();
  const bottomAxis = isLargeScreen ? defaultBottomAxis : smallScreenBottomAxis;

  return (
    <div className={tw("flex", "flex-col", "w-full", "h-full")}>
      {!isLargeScreen && (
        <div className={tw("ml-2", { "mt-2": isLargeScreen })}>{dataLabel}</div>
      )}
      <ResponsiveLine
        lineWidth={2}
        enableSlices={"x"}
        animate={true}
        data={chartData}
        enableCrosshair={true}
        crosshairType={"x"}
        sliceTooltip={SliceTooltip}
        useMesh={false}
        margin={isLargeScreen ? margin : smallScreenMargin}
        xScale={xScale}
        xFormat="time:%d-%b"
        yScale={yScale}
        yFormat=" >-.2f"
        curve="monotoneX"
        axisTop={null}
        axisRight={null}
        theme={theme}
        colors={[dataColor, "white"]}
        axisBottom={bottomAxis}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: isLargeScreen ? dataLabel : undefined,
          legendPosition: "middle",
          format: formatYValues,
          legendOffset: -60,
        }}
        enablePoints={false}
        enableArea={chartType === "lines"}
        areaBlendMode="normal"
        layers={[
          "grid",
          "markers",
          "areas",
          "slices",
          "crosshair",
          customLayer,
          "axes",
          "points",
          "legends",
        ]}
        legends={[]}
      />
    </div>
  );
}

function useXScale(chartType: string, groupVolumeData: boolean, data: Serie[]) {
  const nowMs = useNowMs();
  return useMemo(() => {
    const todayAtMidnight = new Date();
    todayAtMidnight.setHours(0, 0, 0, 0);
    const midnightInMs = todayAtMidnight.getTime();

    const noonSixDaysAgo = new Date(
      midnightInMs - ONE_WEEK_IN_MILLISECONDS + ONE_DAY_IN_MILLISECONDS / 2,
    );

    const noonToday = new Date(midnightInMs + ONE_DAY_IN_MILLISECONDS / 2);

    const today = new Date();
    const oneWeekAgo = new Date(nowMs - ONE_WEEK_IN_MILLISECONDS);

    const xScaleMin =
      chartType === "bars" && groupVolumeData ? noonSixDaysAgo : oneWeekAgo;
    const xScaleMax =
      chartType === "bars" && groupVolumeData ? noonToday : today;

    const xScale: ScaleTimeSpec = {
      type: "time",
      min: xScaleMin,
      max: xScaleMax,
    };
    return xScale;
    // 'data' is here because we need to refresh chart boundaries if there is new data
  }, [chartType, groupVolumeData, data]); // eslint-disable-line react-hooks/exhaustive-deps
}

// this allows for smooth transitions when data changes
function useLoadChartData(data: Serie[]): [Serie[], (data: Serie[]) => void] {
  const [chartData, setChartData] = useState<Serie[]>(
    data.map((serie) => ({ ...serie, data: [] })),
  );
  useEffect(() => {
    const animation = setTimeout(() => {
      setChartData(data);
    }, 10);

    return () => {
      clearTimeout(animation);
    };
  }, [data]);

  return [chartData, setChartData];
}

// we need to clear chart data when the chart type changes in order to prevent a flash of incorrect data
function useClearDataWhenChartTypeChanges(
  setChartData: (data: Serie[]) => void,
  data: Serie[],
  chartType: string,
) {
  useEffect(() => {
    setChartData(data.map((serie) => ({ ...serie, data: [] })));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chartType]);
}

function getColors(darkMode: boolean | undefined) {
  return {
    dataColor: darkMode ? Colors.BLUE5 : Colors.BLUE4,
    textColor: darkMode ? "white" : Colors.DARK_GRAY5,
    tooltipBackground: darkMode ? "white" : Colors.DARK_GRAY5,
    tooltipColor: darkMode ? Colors.DARK_GRAY5 : "white",
  };
}
function getTheme(textColor: string) {
  return {
    textColor: textColor,
    grid: {
      line: {
        stroke: textColor,
        strokeOpacity: 0.1,
        strokeDasharray: "1%",
      },
    },
    crosshair: {
      line: {
        stroke: textColor,
        strokeOpacity: 0.5,
        strokeWidth: 1,
      },
    },
  };
}

function makeSliceTooltip(
  tooltipBackground: string,
  tooltipColor: string,
  currency: Currency,
) {
  return function SliceTooltip({ slice }: SliceTooltipProps) {
    const value = slice.points[0].data.y as number;
    const money = Money.fromDecimal(value, currency, Math.round);
    return (
      <div
        className={tw("p-2", "px-4", "rounded-sm")}
        style={{
          background: tooltipBackground,
          color: tooltipColor,
          opacity: 1,
        }}
      >
        {formatMoney(money)}
      </div>
    );
  };
}

function makeBarLayer(dataColor: string) {
  return function BarLayer({ xScale, yScale, data }: CustomLayerProps) {
    const serieData = data[0].data;
    const pathStrings = serieData
      ?.map((datum) => {
        const timeStamp = (datum.x as Date).getTime();
        const xMin = xScale(
          new Date(timeStamp - ONE_DAY_IN_MILLISECONDS / 2),
        ) as number;
        const xMax = xScale(
          new Date(timeStamp + ONE_DAY_IN_MILLISECONDS / 2),
        ) as number;
        const yMin = yScale(0) as number;
        const yMax = yScale(datum.y as number) as number;

        const width = Math.abs(xMax - xMin);
        const height = Math.abs(yMax - yMin);
        const radius = Math.min(4, height);
        const spacing = width * 0.25;

        return roundedRect(
          xMin + spacing / 2,
          yMax,
          width - spacing,
          height,
          radius,
          true,
          true,
          false,
          false,
        );
      })
      ?.filter(Boolean) as string[];

    return (
      <g>
        {pathStrings.map((pathString, i) => (
          <path
            key={i}
            style={{ pointerEvents: "none" }}
            d={pathString}
            stroke={dataColor}
            fillOpacity={0.2}
            fill={dataColor}
            strokeWidth={2}
          />
        ))}
      </g>
    );
  };
}

function makeVerticalLineLayer(dataColor: string) {
  return function VerticalLineLayer({
    xScale,
    yScale,
    data,
  }: CustomLayerProps) {
    const serieData = data[0].data;
    const pathStrings = serieData
      ?.map((datum) => {
        const lineGenerator = line();
        return lineGenerator([
          [xScale(datum.x as Date) as number, yScale(0) as number],
          [
            xScale(datum.x as Date) as number,
            yScale(datum.y as number) as number,
          ],
        ]);
      })
      ?.filter(Boolean) as string[];

    return (
      <g>
        {pathStrings.map((pathString, i) => (
          <path
            key={i}
            style={{ pointerEvents: "none" }}
            d={pathString}
            stroke={dataColor}
            strokeWidth={2}
          />
        ))}
      </g>
    );
  };
}
function getTimeTickValues(): GridValues<DatumValue> {
  const date = new Date();
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0);
  date.setMilliseconds(0);

  const days = [0, 1, 2, 3, 4, 5, 6];

  const dates = days.map((day) => {
    const newDate = new Date(date);
    newDate.setDate(date.getDate() - day);
    return newDate;
  });
  return dates;
}

/**
 * Function to create an svg path string.  Inspiration was found here:
 *   https://stackoverflow.com/questions/12115691/svg-d3-js-rounded-corner-on-one-corner-of-a-rectangle
 *
 * @param x top-left x-coordinate
 * @param y top-left y-coordinate
 * @param w width
 * @param h height
 * @param r corner-radius
 * @param tl top-left rounded?
 * @param tr top-right rounded?
 * @param bl bottom-left rounded?
 * @param br bottom-left rounded?
 * @returns
 */
function roundedRect(
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
  tl: boolean,
  tr: boolean,
  bl: boolean,
  br: boolean,
) {
  let retval;
  retval = `M${x + r},${y}`;
  retval += `h${w - 2 * r}`;
  if (tr) {
    retval += `a${r},${r} 0 0 1 ${r},${r}`;
  } else {
    retval += `h${r}`;
    retval += `v${r}`;
  }
  retval += `v${h - 2 * r}`;
  if (br) {
    retval += `a${r},${r} 0 0 1 ${-r},${r}`;
  } else {
    retval += `v${r}`;
    retval += `h${-r}`;
  }
  retval += `h${2 * r - w}`;
  if (bl) {
    retval += `a${r},${r} 0 0 1 ${-r},${-r}`;
  } else {
    retval += `h${-r}`;
    retval += `v${-r}`;
  }
  retval += `v${2 * r - h}`;
  if (tl) {
    retval += `a${r},${r} 0 0 1 ${r},${-r}`;
  } else {
    retval += `v${-r}`;
    retval += `h${r}`;
  }
  retval += "z";
  return retval;
}
