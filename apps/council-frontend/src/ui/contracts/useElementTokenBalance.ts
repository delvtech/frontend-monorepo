import { elementTokenContract } from "src/contracts";
import { BigNumber } from "@ethersproject/bignumber";
import { QueryObserverResult } from "react-query";
import { useSmartContractReadCall } from "@elementfi/react-query-typechain/src/hooks/useSmartContractReadCall/useSmartContractReadCall";

export function useElementTokenBalanceOf(
  account: string | null | undefined,
): QueryObserverResult<BigNumber> {
  return useSmartContractReadCall(elementTokenContract, "balanceOf", {
    enabled: !!account,
    callArgs: [account as string],
  });
}
