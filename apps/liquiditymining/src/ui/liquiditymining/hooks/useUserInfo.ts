import { useSmartContractReadCall } from "@elementfi/react-query-typechain";
import { formatEther } from "ethers/lib/utils";
import { QueryObserverResult } from "react-query";
import { poolIdsByPoolAddress } from "src/elf/liquiditymining/eligiblepools";
import { masterChef } from "src/elf/liquiditymining/masterChef";

export function useUserInfo(
  account: string | null | undefined,
  poolAddress: string,
): QueryObserverResult<{
  amount: string;
  rewardDebt: string;
}> {
  return useSmartContractReadCall(masterChef, "userInfo", {
    callArgs: [poolIdsByPoolAddress[poolAddress], account as string],
    enabled: !!account,
    select: ([amount, rewardDebt]) => ({
      amount: formatEther(amount),
      rewardDebt: formatEther(rewardDebt),
    }),
  });
}
