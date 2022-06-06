import { ReactElement, useState } from "react";

import {
  Button,
  Card,
  Icon,
  Intent,
  Menu,
  MenuItem,
  Position,
  Tab,
  Tabs,
} from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import { Popover2 } from "@blueprintjs/popover2";
import { format } from "d3-format";
import { commify } from "ethers/lib/utils";
import { t } from "ttag";

import tw from "efi-tailwindcss-classnames";
import { useNowMs } from "ui/base/hooks/useNowMs/useNowMs";
import { useIsTailwindLargeScreen } from "ui/base/mediaBreakpoints";
import { LineChart } from "ui/charts/LineChart/LineChart";
import { useLiquidityHistoryForPool } from "ui/pools/hooks/useLiquidityHistoryForPool";
import { useVolumeHistoryForPool } from "ui/pools/hooks/useLiquidityVolumeHistoryForPool";
import { useTotalFiatLiquidity } from "ui/pools/hooks/useTotalFiatLiquidityForPool/useTotalFiatLiquidityForPool";
import { ChartMessages } from "ui/pools/PoolCharts/ChartMessagesProps";
import { useCurrencyPref } from "ui/prefs/useCurrency/useCurencyPref";
import { useDarkMode } from "ui/prefs/useDarkMode/useDarkMode";
import { useTokenPrice } from "ui/token/hooks/useTokenPrice";
import { ONE_WEEK_IN_MILLISECONDS, ONE_WEEK_IN_SECONDS } from "base/time";
import { TimeData } from "elf/charts/TimeData";
import { getPoolTokens } from "elf/pools/getPoolTokens";
import { PoolInfo } from "elf/pools/PoolInfo";

import { binDataByDay } from "./helpers/binDataByDay";
import { convertChartDatasToSeries } from "./helpers/convertChartDatasToSeries";

enum ChartType {
  LIQUIDITY = "liquidity",
  VOLUME = "volume",
}

interface PoolChartsProps {
  poolInfo: PoolInfo;
}

export function PoolCharts({ poolInfo }: PoolChartsProps): ReactElement {
  const { isDarkMode } = useDarkMode();
  const { currency } = useCurrencyPref();
  const nowTimestampMs = useNowMs();
  const [binVolumeData, setBinVolumeData] = useState(true);
  const weekAgoTimestampMs = nowTimestampMs - ONE_WEEK_IN_MILLISECONDS;

  const {
    volumeData: rawVolumeData,
    liquidityData,
    setChart,
    showLiquidityChart,
    poolAge,
  } = usePoolCharts(poolInfo);

  const totalLiquidity = useTotalFiatLiquidity(poolInfo);

  const volumeData = binVolumeData
    ? binDataByDay(rawVolumeData, weekAgoTimestampMs, nowTimestampMs)
    : rawVolumeData;

  const { createdAtTimestamp } = poolInfo.extensions;
  const createdAtMs = createdAtTimestamp * 1000;
  const { liquiditySerie, volumeSerie } = convertChartDatasToSeries(
    liquidityData,
    volumeData,
    weekAgoTimestampMs,
    nowTimestampMs,
    createdAtMs,
    totalLiquidity?.toDecimal() ?? 0,
  );

  const labelElement = binVolumeData ? (
    <Icon icon={IconNames.SMALL_TICK} intent={Intent.SUCCESS} />
  ) : undefined;

  const isLargeScreen = useIsTailwindLargeScreen();
  return (
    <div
      className={tw("flex", "flex-1", "h-500")}
      style={{ minHeight: "300px" }}
    >
      <div className={tw("flex", "flex-col", "w-full")}>
        <div className={tw("mb-2", "flex", "space-x-4")}>
          <span>{t`Pool Charts`}</span>
        </div>
        <Card className={tw("flex", "flex-1", "flex-col")}>
          <div
            className={tw("w-full", "flex", "z-10", "justify-between", {
              "pr-10": isLargeScreen,
            })}
          >
            <Tabs onChange={setChart as (newTabId: ChartType) => void}>
              <Tab id={ChartType.LIQUIDITY} title={t`Liquidity`} />
              <Tab id={ChartType.VOLUME} title={t`Volume`} />
            </Tabs>
            {!showLiquidityChart && (
              <Popover2
                content={
                  <Menu>
                    <MenuItem
                      icon={IconNames.GROUPED_BAR_CHART}
                      onClick={() => setBinVolumeData(!binVolumeData)}
                      text={t`Group data`}
                      labelElement={labelElement}
                    />
                  </Menu>
                }
                position={Position.BOTTOM_LEFT}
              >
                <Button icon={IconNames.SETTINGS} />
              </Popover2>
            )}
          </div>
          <div className={tw("w-full", "h-full")}>
            <ChartMessages poolAgeInSeconds={poolAge} hasData={true}>
              <LineChart
                key={isDarkMode ? "darkline" : "lightline"}
                chartType={showLiquidityChart ? "lines" : "bars"}
                groupBarData={binVolumeData}
                dataLabel={`(${currency.symbol_native})`}
                darkMode={isDarkMode}
                data={showLiquidityChart ? liquiditySerie : volumeSerie}
                formatYValues={formatYValues}
              />
            </ChartMessages>
          </div>
        </Card>
      </div>
    </div>
  );
}
function usePoolCharts(poolInfo: PoolInfo) {
  const nowMs = useNowMs();
  const poolAge = getPoolAge(poolInfo, nowMs);

  const liquidityData =
    useLiquidityHistoryForPool(poolInfo, ONE_WEEK_IN_SECONDS) ?? [];

  const volumeData =
    useVolumeHistoryForPool(poolInfo, ONE_WEEK_IN_SECONDS) ?? [];
  const { currency } = useCurrencyPref();
  const { baseAssetContract } = getPoolTokens(poolInfo);
  const { data: baseAssetPrice } = useTokenPrice(baseAssetContract, currency);
  const fiatPrice = baseAssetPrice?.toDecimal() ?? 1;
  const liquidityFiatData: TimeData[] = liquidityData.map(
    ({ value, timeMs }) => ({
      value: fiatPrice * value,
      timeMs,
    }),
  );
  const volumeFiatData: TimeData[] = volumeData.map(({ value, timeMs }) => ({
    value: fiatPrice * value,
    timeMs,
  }));

  const [activeChart, setChart] = useState(ChartType.LIQUIDITY);
  const showLiquidityChart = activeChart === ChartType.LIQUIDITY;
  const showVolumeChart = activeChart === ChartType.VOLUME;
  return {
    poolAge,
    liquidityData: liquidityFiatData,
    volumeData: volumeFiatData,
    activeChart,
    setChart,
    showLiquidityChart,
    showVolumeChart,
  };
}

function getPoolAge(poolInfo: PoolInfo, nowTimestampMs: number) {
  const nowInSeconds = Math.floor(nowTimestampMs / 1000);
  const poolCreatedAt = poolInfo.extensions.createdAtTimestamp;

  const poolAge = nowInSeconds - poolCreatedAt;
  return poolAge;
}

function formatYValues(value: number) {
  const f = format(".2s");

  if (value > 10000) {
    // use 'B' for billion, not 'G' for giga
    return f(value).replace("G", "B");
  }

  return commify(value);
}
