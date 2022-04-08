import { principalPoolContractsByAddress } from "core/pools/ccpool";
import { PoolContract } from "core/pools/PoolContract";
import { yieldPoolContractsByAddress } from "core/pools/weightedPool";

export function getPoolContract(poolAddress: string): PoolContract {
  return (
    principalPoolContractsByAddress[poolAddress] ??
    yieldPoolContractsByAddress[poolAddress]
  );
}
