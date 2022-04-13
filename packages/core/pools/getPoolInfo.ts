import { principalPools } from "@elementfi/core/pools/ccpool";
import { PoolContract } from "@elementfi/core/pools/PoolContract";
import { PoolInfo } from "@elementfi/core/pools/PoolInfo";
import { yieldPools } from "@elementfi/core/pools/weightedPool";

export const getAllPoolAddresses = (): string[] =>
  [...yieldPools, ...principalPools].map(({ address }) => address);

export function getPoolTokenInfoFromContract(
  poolContract: PoolContract | undefined,
): PoolInfo | undefined {
  const allPools = [...yieldPools, ...principalPools];

  const poolInfo = allPools.find(
    (pool) => pool.address === poolContract?.address,
  );

  return poolInfo;
}

export function getPoolInfo(address: string): PoolInfo {
  const allPools = [...yieldPools, ...principalPools];

  const poolInfo = allPools.find((pool) => pool.address === address);

  return poolInfo as PoolInfo;
}
