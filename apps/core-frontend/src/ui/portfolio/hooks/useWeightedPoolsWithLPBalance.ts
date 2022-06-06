import { ERC20 } from "@elementfi/core-typechain/dist/libraries";
import { WeightedPool } from "@elementfi/core-typechain/dist/v1";
import { BALANCER_POOL_LP_TOKEN_DECIMALS } from "integrations/balancer/pools";
import { useTokensWithBalance } from "ui/token/hooks/useTokensWithBalance";
import { isDust } from "elf/coins/isDust";
import { yieldPoolContracts } from "elf/pools/weightedPool";

export function useWeightedPoolsWithLPBalance(
  account: string | null | undefined,
): WeightedPool[] {
  const allWeightedPools = yieldPoolContracts;
  const poolsWithLP = useTokensWithBalance(
    account,
    allWeightedPools as unknown as ERC20[],
  );
  return poolsWithLP
    .filter(
      ({ balanceOf }) => !isDust(balanceOf, BALANCER_POOL_LP_TOKEN_DECIMALS),
    )
    .map(({ token }) => token) as unknown as WeightedPool[];
}
