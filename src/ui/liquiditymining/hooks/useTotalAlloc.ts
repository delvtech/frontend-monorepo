import { useSmartContractReadCall } from "@elementfi/react-query-typechain";
import { BigNumber } from "ethers";
import { QueryObserverResult } from "react-query";
import { masterChef } from "src/elf/liquiditymining/masterChef";

export function useTotalAllocPoint(): QueryObserverResult<number> {
  return useSmartContractReadCall(masterChef, "totalAllocPoint", {
    staleTime: Infinity,
    select: (data) => +data.toString(),
  });
}
