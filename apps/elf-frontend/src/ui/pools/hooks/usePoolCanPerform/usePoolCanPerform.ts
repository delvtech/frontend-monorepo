import { CanPerformPoolActions } from "canperform/CanPerformJsonFile";
import { useCanPerform } from "ui/canperform/useCanPerform";
import { isPrincipalPool } from "elf/pools/ccpool";
import { isYieldPool } from "elf/pools/weightedPool";
import { getTokenInfo } from "tokenlists/tokenlists";

export function useCanPerformPool(
  poolAddress: string,
  action: keyof CanPerformPoolActions,
): boolean {
  const {
    canPerform: { convergentPools, weightedPools },
  } = useCanPerform();

  const poolTokenInfo = getTokenInfo(poolAddress);

  if (isPrincipalPool(poolTokenInfo)) {
    const convergentPoolCanPerform = convergentPools.find(
      (covergentPool) => covergentPool.convergentPoolAddress === poolAddress,
    );

    if (!convergentPoolCanPerform) {
      // If there's no canPerform entry for this pool than assume it's not frozen
      return true;
    }

    return convergentPoolCanPerform[action];
  }

  if (isYieldPool(poolTokenInfo)) {
    const weightedPoolCanPerform = weightedPools.find(
      (weightedPool) => weightedPool.weightedPoolAddress === poolAddress,
    );
    if (!weightedPoolCanPerform) {
      // If there's no canPerform entry for this pool than assume it's not frozen
      return true;
    }

    return weightedPoolCanPerform[action];
  }

  // assume things aren't frozen by default
  return true;
}
