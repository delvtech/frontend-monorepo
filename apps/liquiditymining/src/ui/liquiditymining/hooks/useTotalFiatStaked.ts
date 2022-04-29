import { PoolInfo } from "@elementfi/core/pools/PoolInfo";
import { useLPTokenPrice } from "@elementfi/core/pools/hooks/useLPTokenPrice";
import { useUserInfo } from "src/ui/liquiditymining/hooks/useUserInfo";
import { eligibleGoerliPoolContracts } from "src/elf/liquiditymining/eligiblepools";
import { useLPTokenBalance } from "src/ui/liquiditymining/hooks/useLPTokenBalance";
import { MASTER_CHEF_GOERLI_ADDRESS } from "src/elf/liquiditymining/masterChef";

/**
 * Calculate a user's total fiat value staked in a specified pool
 *
 * @param poolInfo pool
 * @param account userAddress
 * @returns Returns total fiat value staked in a string format: i.e., "3.50"
 */
export function useTotalFiatStakedForUser(
  poolInfo: PoolInfo,
  account: string | null | undefined,
): string {
  const lpTokenPrice = useLPTokenPrice(
    poolInfo,
    eligibleGoerliPoolContracts[poolInfo.address],
  );

  const { data: userInfo } = useUserInfo(account, poolInfo.address);
  const depositedBalance = userInfo?.amount || "0.0";

  return (+lpTokenPrice * +depositedBalance).toFixed(2);
}

export function useTotalFiatStaked(poolInfo: PoolInfo): string {
  const poolContract = eligibleGoerliPoolContracts[poolInfo.address];
  const lpTokenPrice = useLPTokenPrice(poolInfo, poolContract);

  const { data: lpBalance } = useLPTokenBalance(
    poolContract,
    MASTER_CHEF_GOERLI_ADDRESS,
  );

  return (+lpTokenPrice * +(lpBalance || 0)).toFixed(2);
}
