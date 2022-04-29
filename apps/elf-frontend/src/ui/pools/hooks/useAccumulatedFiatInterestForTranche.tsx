import { Money } from "ts-money";

import { useCurrencyPref } from "ui/prefs/useCurrency/useCurencyPref";
import { useTokenPrice } from "ui/token/hooks/useTokenPrice";
import { convertToFiatBalance } from "elf/money/convertToFiatBalance";
import { getPoolTokens } from "elf/pools/getPoolTokens";
import { PoolInfo } from "elf/pools/PoolInfo";

import { useAccumulatedInterestForTranche } from "./useAccumulatedInterestForTranche";

export function useAccumulatedFiatInterestForTranche(
  poolInfo: PoolInfo,
): Money | undefined {
  const { currency } = useCurrencyPref();
  const {
    baseAssetContract,
    baseAssetInfo: { decimals: baseAssetDecimals },
  } = getPoolTokens(poolInfo);

  const { data: baseAssetPrice } = useTokenPrice(baseAssetContract, currency);
  const accumulatedInterest = useAccumulatedInterestForTranche(poolInfo);

  let accumulatedInterestFiat;
  if (baseAssetPrice && baseAssetDecimals && accumulatedInterest) {
    accumulatedInterestFiat = convertToFiatBalance(
      baseAssetPrice,
      accumulatedInterest,
      baseAssetDecimals,
    );
  }

  return accumulatedInterestFiat;
}
