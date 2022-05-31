import { PoolInfo } from "@elementfi/core/pools/PoolInfo";
import { useTotalFiatLiquidity } from "@elementfi/core/pools/hooks/useTotalFiatLiquidityForPool/useTotalFiatLiquidityForPool";
import { useSmartContractReadCall } from "@elementfi/react-query-typechain/src/hooks/useSmartContractReadCall/useSmartContractReadCall";
import { formatEther, formatUnits } from "ethers/lib/utils";
import { ConvergentCurvePool } from "@elementfi/core-typechain/dist/v1.1";

/**
 * Function to calculate the price of a pool's LP token
 */
export function useLPTokenPrice(
  poolInfo: PoolInfo,
  poolContract: ConvergentCurvePool,
): string {
  const { data: totalLPTokens } = useSmartContractReadCall(
    poolContract,
    "totalSupply",
    { select: (totalSupply) => formatEther(totalSupply) },
  );

  const ccPoolTVL = useTotalFiatLiquidity(poolInfo);

  if (!ccPoolTVL || !totalLPTokens || +totalLPTokens === 0) {
    return "0.00";
  }

  // Since this is fiat, it's okay to fix it to 2 decimals
  const price = (+formatUnits(
    ccPoolTVL.divide(+totalLPTokens).amount,
    2,
  )).toFixed(2);

  return price;
}
