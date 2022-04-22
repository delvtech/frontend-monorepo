import { QueryObserverResult } from "react-query";
import { ConvergentCurvePool } from "@elementfi/core-typechain/dist/v1.1";
import { useSmartContractReadCall } from "@elementfi/react-query-typechain";
import { masterChef } from "src/elf/liquiditymining/masterChef";

export function useIsPoolApproved(
  poolContract: ConvergentCurvePool,
  account: string | null | undefined,
): QueryObserverResult<boolean> {
  return useSmartContractReadCall(poolContract, "allowance", {
    callArgs: [account as string, masterChef.address],
    select: (allowance) => allowance.gt(0),
    enabled: !!poolContract && !!account,
    staleTime: Infinity,
  });
}
