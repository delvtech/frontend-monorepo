import { principalPoolContractsByAddress } from "@elementfi/core/pools/ccpool";
import { PoolContract } from "@elementfi/core/pools/PoolContract";
import { yieldPoolContractsByAddress } from "@elementfi/core/pools/weightedPool";

export function getPoolContract(poolAddress: string): PoolContract {
  return (
    principalPoolContractsByAddress[poolAddress] ??
    yieldPoolContractsByAddress[poolAddress]
  );
}
