import { PoolInfo } from "@elementfi/core/pools/PoolInfo";
import { useTotalFiatLiquidity } from "@elementfi/core/pools/hooks/useTotalFiatLiquidityForPool/useTotalFiatLiquidityForPool";
import { useLPTokenBalance } from "src/ui/liquiditymining/hooks/useLPTokenBalance";
import { eligibleGoerliPoolContracts } from "src/elf/liquiditymining/eligiblepools";
import { MASTER_CHEF_GOERLI_ADDRESS } from "src/elf/liquiditymining/masterChef";
import { commify } from "ethers/lib/utils";

/**
 * Function to calculate the price of a pool's LP token
 *
 * @param poolInfo
 * @returns A string denoting the price of a pool's LP token
 */
export function useLPTokenPrice(poolInfo: PoolInfo): string {
  const poolContract = eligibleGoerliPoolContracts[poolInfo.address];
  const { data: totalLPTokens } = useLPTokenBalance(
    poolContract,
    MASTER_CHEF_GOERLI_ADDRESS,
  );

  const ccPoolTVL = useTotalFiatLiquidity(poolInfo);

  if (!ccPoolTVL || !totalLPTokens || +totalLPTokens === 0) {
    return "0.00";
  }

  return commify(ccPoolTVL.divide(+totalLPTokens).amount.toFixed(2));
}
