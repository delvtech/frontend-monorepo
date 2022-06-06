import { formatUnits } from "ethers/lib/utils";
import { usePoolSpotPrice } from "ui/pools/hooks/usePoolSpotPrice/usePoolSpotPrice";
import { usePoolTokens } from "ui/pools/hooks/usePoolTokens/usePoolTokens";
import { getPoolContract } from "elf/pools/getPoolContract";
import { getPoolTokens } from "elf/pools/getPoolTokens";
import { PoolInfo } from "elf/pools/PoolInfo";

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
