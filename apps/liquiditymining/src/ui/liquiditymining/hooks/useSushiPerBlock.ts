import { useSmartContractReadCall } from "@elementfi/react-query-typechain";
import { formatEther } from "ethers/lib/utils";
import { ConvergentCurvePool } from "@elementfi/core-typechain/dist/v1.1";
import { QueryObserverResult } from "react-query";
import { masterChef } from "src/elf/liquiditymining/masterChef";

export function useSushiPerBlock(): QueryObserverResult<number> {
  return useSmartContractReadCall(masterChef, "sushiPerBlock", {
    select: (sushiPerBlock) => +formatEther(sushiPerBlock),
  });
}
