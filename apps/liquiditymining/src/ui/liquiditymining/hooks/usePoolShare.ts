import { eligibleGoerliPoolContracts } from "src/elf/liquiditymining/eligiblepools";
import { MASTER_CHEF_GOERLI_ADDRESS } from "src/elf/liquiditymining/masterChef";
import { useUserInfo } from "src/ui/liquiditymining/hooks/useUserInfo";
import { useLPTokenBalance } from "./useLPTokenBalance";

/**
 * Function to calculate the percent share of a user's deposit in a specified pool
 *
 * @param poolAddress
 * @param account User address
 * @returns A string denoting a user's percentage in the specified pool
 */
export function usePoolShare(
  poolAddress: string,
  account: string | null | undefined,
): string {
  const poolContract = eligibleGoerliPoolContracts[poolAddress];

  const { data: totalPoolShare } = useLPTokenBalance(
    poolContract,
    MASTER_CHEF_GOERLI_ADDRESS,
  );

  const { data: userInfo } = useUserInfo(account, poolAddress);
  const depositedBalance = userInfo?.amount || 0;

  const share = (+depositedBalance / +(totalPoolShare || 0)) * 100;

  return `${(share || 0).toFixed(2)}%`;
}
