import { BigNumber } from "ethers";
import { balancerVaultContract } from "elf/balancer/vault";
import { getPoolTokens } from "elf/pools/getPoolTokens";
import { PoolInfo } from "elf/pools/PoolInfo";

export async function fetchBaseAssetReservesInPool(
  poolInfo: PoolInfo,
): Promise<BigNumber> {
  const [, balances] = await balancerVaultContract.getPoolTokens(
    poolInfo.extensions.poolId,
  );
  const { baseAssetIndex } = getPoolTokens(poolInfo);
  return balances?.[baseAssetIndex];
}
