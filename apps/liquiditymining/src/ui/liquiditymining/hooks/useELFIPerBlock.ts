import { usePoolInfo } from "src/ui/liquiditymining/hooks/usePoolInfo";
import { useSushiPerBlock } from "src/ui/liquiditymining/hooks/useSushiPerBlock";
import { useTotalAllocPoint } from "src/ui/liquiditymining/hooks/useTotalAlloc";

/**
 * Grabs the amount of sushi this pool is allocated per block
 * // TODO: Move to peripherals/ workspace
 */
export function useELFIPerBlock(poolAddress: string): number {
  const { data: sushiPerBlock } = useSushiPerBlock();
  const { data: totalAllocPoint } = useTotalAllocPoint();

  const { data: poolInfo } = usePoolInfo(poolAddress);

  if (!poolInfo || !sushiPerBlock || !totalAllocPoint) {
    return 0;
  }

  // The ratio the pool is allocated
  const ratio = poolInfo.allocPoint / totalAllocPoint;

  // The amount of ELFI the pool is allocated
  const rewardsRate = sushiPerBlock * ratio;

  return rewardsRate;
}
