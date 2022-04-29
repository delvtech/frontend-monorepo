import { principalPools } from "elf/pools/ccpool";
import { PoolContract } from "elf/pools/PoolContract";
import { PoolInfo } from "elf/pools/PoolInfo";
import { yieldPools } from "elf/pools/weightedPool";

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
