import { ConvergentCurvePool } from "@elementfi/core-typechain/dist/v1";
import { ERC20 } from "@elementfi/core-typechain/dist/libraries";
import { BALANCER_POOL_LP_TOKEN_DECIMALS } from "integrations/balancer/pools";
import { useTokensWithBalance } from "ui/token/hooks/useTokensWithBalance";
import { isDust } from "elf/coins/isDust";
import { principalPoolContracts } from "elf/pools/ccpool";
import { useMemo } from "react";

export function useConvergentCurvePoolsWithLPBalance(
  account: string | null | undefined,
): ConvergentCurvePool[] {
  const allConvergentCurvePools = principalPoolContracts;
  const poolsWithLP = useTokensWithBalance(
    account,
    allConvergentCurvePools as unknown as ERC20[],
  );
  return useMemo(
    () =>
      poolsWithLP
        .filter(
          ({ balanceOf }) =>
            !isDust(balanceOf, BALANCER_POOL_LP_TOKEN_DECIMALS),
        )
        .map(({ token }) => token) as unknown as ConvergentCurvePool[],
    [poolsWithLP],
  );
}
