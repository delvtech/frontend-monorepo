import { PoolInfo } from "@elementfi/core/pools/PoolInfo";
import {
  eligibleGoerliPoolContracts,
  poolIdsByPoolAddress,
} from "src/elf/liquiditymining/eligiblepools";
import { MASTER_CHEF_GOERLI_ADDRESS } from "src/elf/liquiditymining/masterChef";
import { useUserInfo } from "src/ui/liquiditymining/hooks/useUserInfo";
import { useLPTokenBalance } from "./useLPTokenBalance";

/**
 * Function to calculate the percent share of a user's deposit in a specified pool
 *
 * @param poolInfo Pool
 * @param account User address
 * @returns A string denoting a user's percentage in the specified pool
 */
export function usePoolShare(
  poolAddress: string,
  account: string | null | undefined,
): string {
  const poolId = poolIdsByPoolAddress[poolAddress];
  const poolContract = eligibleGoerliPoolContracts[poolId];

  const totalPoolShare = useLPTokenBalance(
    poolContract,
    MASTER_CHEF_GOERLI_ADDRESS,
  );

  const { data: userInfo } = useUserInfo(account, poolAddress);
  const depositedBalance = userInfo?.amount || "0.0";

  if (+depositedBalance === 0) {
    return "0.00%";
  }

  return `${(+depositedBalance / +totalPoolShare).toFixed(2)}%`;
}
