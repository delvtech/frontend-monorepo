import { Money } from "ts-money";

import { useFeeVolumeFiatForPool } from "ui/pools/hooks/useFeeVolumeForPool/useFeeVolumeForPool";
import { useVolumeForPool } from "ui/pools/hooks/useVolumeForPool/useVolumeForPool";
import { ONE_DAY_IN_SECONDS } from "base/time";
import { PoolInfo } from "elf/pools/PoolInfo";

export function useVolumeTrend(poolInfo: PoolInfo): {
  volume24hr: number | undefined;
  volumeTrend: number | undefined;
} {
  const volume24hr = useVolumeForPool(poolInfo, ONE_DAY_IN_SECONDS);
  // // the volume from 48hrs ago to 24hrs ago
  const volumePrevious24hr = useVolumeForPool(
    poolInfo,
    ONE_DAY_IN_SECONDS * 2,
    ONE_DAY_IN_SECONDS,
  );

  const volumeTrend = getTrend(volumePrevious24hr, volume24hr);
  return { volume24hr, volumeTrend };
}

export function useFeeVolumeTrend(poolInfo: PoolInfo): {
  feeVolume24hr?: Money;
  feeVolumeTrend?: number;
} {
  const feeVolume24hr = useFeeVolumeFiatForPool(poolInfo, ONE_DAY_IN_SECONDS);
  const feeVolumePrevious24hr = useFeeVolumeFiatForPool(
    poolInfo,
    ONE_DAY_IN_SECONDS * 2,
    ONE_DAY_IN_SECONDS,
  );

  if (!feeVolume24hr) {
    return {};
  }

  const feeVolumeTrend = getTrend(
    feeVolumePrevious24hr?.toDecimal(),
    feeVolume24hr?.toDecimal(),
  );
  return { feeVolume24hr, feeVolumeTrend };
}

function getTrend(
  oldValue: number | undefined,
  newValue: number | undefined,
): number | undefined {
  if (oldValue === undefined || newValue === undefined) {
    return undefined;
  }

  if (oldValue === 0 || newValue === 0) {
    return 0;
  }

  const trend = (newValue - oldValue) / oldValue;

  return trend;
}
