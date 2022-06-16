import { useSmartContractReadCall } from "@elementfi/react-query-typechain/src/hooks/useSmartContractReadCall/useSmartContractReadCall";
import { formatEther } from "ethers/lib/utils";
import { QueryObserverResult } from "react-query";
import { masterChef } from "src/elf/liquiditymining/masterChef";

export function useSushiPerBlock(): QueryObserverResult<number> {
  return useSmartContractReadCall(masterChef, "sushiPerBlock", {
    select: (sushiPerBlock) => +formatEther(sushiPerBlock),
  });
}
