import { useSmartContractReadCall } from "@elementfi/react-query-typechain/src/hooks/useSmartContractReadCall/useSmartContractReadCall";
import { formatEther } from "ethers/lib/utils";
import { QueryObserverResult } from "react-query";
import { poolIdsByPoolAddress } from "src/elf/liquiditymining/eligiblepools";
import { masterChef } from "src/elf/liquiditymining/masterChef";

export function usePoolInfo(poolAddress: string): QueryObserverResult<{
  accSushiPerShare: string;
  lastRewardBlock: number;
  allocPoint: number;
}> {
  return useSmartContractReadCall(masterChef, "poolInfo", {
    callArgs: [poolIdsByPoolAddress[poolAddress]],
    select: ([accSushiPerShare, lastRewardBlock, allocPoint]) => ({
      accSushiPerShare: formatEther(accSushiPerShare),
      allocPoint: +allocPoint.toString(),
      lastRewardBlock: +lastRewardBlock.toString(),
    }),
  });
}
