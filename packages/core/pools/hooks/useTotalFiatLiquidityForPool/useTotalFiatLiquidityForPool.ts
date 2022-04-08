import { Money } from "ts-money";

import { useTotalLiquidity } from "core/pools/hooks/useTotalLiquidity";
import { useTokenPrice } from "core/token/hooks/useTokenPrice";
import { getPoolTokens } from "core/pools/getPoolTokens";
import { PoolInfo } from "core/pools/PoolInfo";
import { Currencies } from "ts-money";

export function useTotalFiatLiquidity(poolInfo: PoolInfo): Money | undefined {
  const { baseAssetContract } = getPoolTokens(poolInfo);
  const { data: baseAssetPrice } = useTokenPrice(
    baseAssetContract,
    Currencies.USD
  );

  const totalLiquidity = useTotalLiquidity(poolInfo);

  if (!baseAssetPrice) {
    return undefined;
  }

  const safeTotalLiquidity = Number.isFinite(totalLiquidity)
    ? totalLiquidity
    : 0;
  const totalFiatLiquidity = baseAssetPrice.multiply(
    safeTotalLiquidity,
    Math.round
  );

  return totalFiatLiquidity;
}
