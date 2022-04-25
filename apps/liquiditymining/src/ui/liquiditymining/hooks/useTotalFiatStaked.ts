import { PoolInfo } from "@elementfi/core/pools/PoolInfo";
import { useLPTokenPrice } from "src/ui/liquiditymining/hooks/useLPTokenPrice";
import { useUserInfo } from "src/ui/liquiditymining/hooks/useUserInfo";

/**
 * Calculate a user's total fiat value staked in a specified pool
 *
 * @param poolInfo pool
 * @param account userAddress
 * @returns Returns total fiat value staked in a string format: i.e., "3.50"
 */
export function useTotalFiatStaked(
  poolInfo: PoolInfo,
  account: string | null | undefined,
): string {
  const LPTokenPrice = useLPTokenPrice(poolInfo);

  const { data: userInfo } = useUserInfo(account, poolInfo.address);
  const depositedBalance = userInfo?.amount || "0.0";

  return (+LPTokenPrice * +depositedBalance).toFixed(2);
}
