import { PrincipalTokenInfo } from "@elementfi/tokenlist";
import { isPrincipalPool } from "elf/pools/ccpool";
import { PoolInfo } from "elf/pools/PoolInfo";
import { principalTokenInfos } from "elf/tranche/tranches";

export function getPrincipalTokenInfoForPool(
  poolInfo: PoolInfo,
): PrincipalTokenInfo {
  if (isPrincipalPool(poolInfo)) {
    const trancheAddress = poolInfo.extensions.bond;
    const trancheInfo = principalTokenInfos.find(
      (info) => info.address === trancheAddress,
    ) as PrincipalTokenInfo;
    return trancheInfo;
  }

  const interestTokenAddress = poolInfo.extensions.interestToken;
  const trancheInfo = principalTokenInfos.find(
    (info) => info.extensions.interestToken === interestTokenAddress,
  ) as PrincipalTokenInfo;
  return trancheInfo;
}
