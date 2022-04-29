import {
  getPoolInfoForPrincipalToken,
  isPrincipalPool,
} from "elf/pools/ccpool";
import { getPrincipalTokenInfoForPool } from "elf/pools/getPrincipalTokenInfoForPool";
import { PoolInfo } from "elf/pools/PoolInfo";
import { getPoolInfoForYieldToken } from "elf/pools/weightedPool";
import { getYieldTokenForPrincipalToken } from "elf/tranche/tranches";

export function getOppositePoolInfo(poolInfo: PoolInfo): PoolInfo | undefined {
  const principalTokenInfo = getPrincipalTokenInfoForPool(poolInfo);
  if (isPrincipalPool(poolInfo)) {
    const yieldToken = getYieldTokenForPrincipalToken(
      principalTokenInfo.address,
    );
    return getPoolInfoForYieldToken(yieldToken.address);
  }

  return getPoolInfoForPrincipalToken(principalTokenInfo.address);
}
