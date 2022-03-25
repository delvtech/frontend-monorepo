import { useSmartContractReadCall } from "@elementfi/react-query-typechain";
import { formatEther } from "ethers/lib/utils";
import { ConvergentCurvePool } from "@elementfi/core-typechain/dist/v1.1";
import { QueryObserverResult } from "react-query";

export function useLPTokenBalance(
  poolContract: ConvergentCurvePool,
  account: string | null | undefined,
): QueryObserverResult<string> {
  return useSmartContractReadCall(poolContract, "balanceOf", {
    callArgs: [account as string],
    select: (balanceOf) => formatEther(balanceOf),
    enabled: !!account,
  });
}
