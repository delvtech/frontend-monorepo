import { useTotalLiquidity } from "@elementfi/core/pools/hooks/useTotalLiquidity";
import { PoolInfo } from "@elementfi/core/pools/PoolInfo";
import { useUserInfo } from "src/ui/liquiditymining/hooks/useUserInfo";

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
