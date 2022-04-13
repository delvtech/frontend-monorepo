import { formatUnits } from "ethers/lib/utils";
import { usePoolSpotPrice } from "@elementfi/core/pools/hooks/usePoolSpotPrice/usePoolSpotPrice";
import { usePoolTokens } from "@elementfi/core/pools/hooks/usePoolTokens/usePoolTokens";
import { getPoolContract } from "@elementfi/core/pools/getPoolContract";
import { getPoolTokens } from "@elementfi/core/pools/getPoolTokens";
import { PoolInfo } from "@elementfi/core/pools/PoolInfo";

export function useTotalLiquidity(poolInfo: PoolInfo): number {
  const pool = getPoolContract(poolInfo.address);
  const { data: [, balances] = [undefined, undefined] } = usePoolTokens(pool);
  const { baseAssetInfo, baseAssetIndex, termAssetInfo, termAssetIndex } =
    getPoolTokens(poolInfo);
  const { decimals: baseAssetDecimals } = baseAssetInfo;
  const baseBalance = +formatUnits(
    balances?.[baseAssetIndex] ?? 0,
    baseAssetDecimals,
  );
  const termBalance = +formatUnits(
    balances?.[termAssetIndex] ?? 0,
    termAssetInfo.decimals,
  );
  const spotPrice = usePoolSpotPrice(pool, termAssetInfo.address) ?? 0;
  const termBalanceInBaseUnits = termBalance * spotPrice;
  const totalSupplyInBaseUnits = baseBalance + termBalanceInBaseUnits;
  return totalSupplyInBaseUnits;
}
