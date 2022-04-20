import { useTotalLiquidity } from "@elementfi/core/pools/hooks/useTotalLiquidity";
import { PoolInfo } from "@elementfi/core/pools/PoolInfo";
import { useUserInfo } from "src/ui/liquiditymining/hooks/useUserInfo";

/**
 * Function to calculate the percent share of a user's deposit in a specified pool
 *
 * @param poolInfo Pool
 * @param account User address
 * @returns A string denoting a user's percentage in the specified pool
 */
export function usePoolShare(
  poolInfo: PoolInfo,
  account: string | null | undefined,
): string {
  const poolTotal = useTotalLiquidity(poolInfo);
  const { data: userInfo } = useUserInfo(account, poolInfo.address);
  const depositedBalance = userInfo?.amount || "0.0";

  if (+depositedBalance === 0) {
    return "0.00";
  }

  return (+depositedBalance / poolTotal).toFixed(2);
}
