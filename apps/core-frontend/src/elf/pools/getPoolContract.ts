import { principalPoolContractsByAddress } from "elf/pools/ccpool";
import { PoolContract } from "elf/pools/PoolContract";
import { yieldPoolContractsByAddress } from "elf/pools/weightedPool";

export function getPoolContract(poolAddress: string): PoolContract {
  return (
    principalPoolContractsByAddress[poolAddress] ??
    yieldPoolContractsByAddress[poolAddress]
  );
}
