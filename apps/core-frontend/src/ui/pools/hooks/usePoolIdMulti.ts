import { QueryObserverResult } from "react-query";

import { useSmartContractReadCalls } from "ui/contracts/useSmartContractReadCalls/useSmartContractReadCalls";
import { PoolContract } from "elf/pools/PoolContract";

export function usePoolIdMulti(
  pools: (PoolContract | undefined)[],
): QueryObserverResult<string>[] {
  return useSmartContractReadCalls(pools, "getPoolId", { staleTime: Infinity });
}
