import { useSmartContractReadCall } from "@elementfi/react-query-typechain/src/hooks/useSmartContractReadCall/useSmartContractReadCall";
import { BigNumber } from "ethers";
import { formatEther } from "ethers/lib/utils";
import { QueryObserverResult } from "react-query";
import { poolIdsByPoolAddress } from "src/elf/liquiditymining/eligiblepools";
import { masterChef } from "src/elf/liquiditymining/masterChef";

/**
 * Returns the pending ELFI reward for a user on a given pool
 */
export function usePendingSushi(
  poolAddress: string | undefined,
  account: string | null | undefined,
): QueryObserverResult<string> {
  return useSmartContractReadCall(masterChef, "pendingSushi", {
    callArgs: [poolIdsByPoolAddress[poolAddress as string], account as string],
    enabled: !!account && !!poolAddress,
    select: (pendingSushi) => formatEther(pendingSushi),
  });
}
