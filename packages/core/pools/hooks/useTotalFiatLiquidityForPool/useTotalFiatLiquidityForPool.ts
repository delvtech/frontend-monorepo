import { Money } from "ts-money";

import { useTotalLiquidity } from "@elementfi/core/pools/hooks/useTotalLiquidity";
import { useTokenPrice } from "@elementfi/core/token/hooks/useTokenPrice";
import { getPoolTokens } from "@elementfi/core/pools/getPoolTokens";
import { PoolInfo } from "@elementfi/core/pools/PoolInfo";
import { Currencies } from "ts-money";

export function useTotalFiatLiquidity(poolInfo: PoolInfo): Money | undefined {
  const { baseAssetContract } = getPoolTokens(poolInfo);
  const { data: baseAssetPrice } = useTokenPrice(
    baseAssetContract,
    Currencies.USD,
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
    Math.round,
  );

  return totalFiatLiquidity;
}
