import { ERC20 } from "@elementfi/core-typechain/dist/libraries";
import { useSmartContractReadCall } from "ui/contracts/useSmartContractReadCall/useSmartContractReadCall";
import { getTokenInfo } from "tokenlists/tokenlists";
import { formatUnits } from "ethers/lib/utils";

/**
 * Gets the token balance formatted to its proper decimals.
 *
 * Example:
 *
 * const balance = useTokenBalance(WethContract, account); // 11.23827971
 * // TODO: Refactor to return number or undefined
 */
export function useTokenBalanceUNSAFE(
  tokenContract: ERC20 | undefined,
  account: string | null | undefined,
): number {
  const { data: tokenBalanceOf } = useSmartContractReadCall(
    tokenContract,
    "balanceOf",
    {
      callArgs: [account as string], // safe to cast because `enabled` is set
      enabled: !!account,
    },
  );

  if (!tokenBalanceOf || !tokenContract) {
    return 0;
  }
  const { decimals } = getTokenInfo(tokenContract?.address);

  const balance = +formatUnits(tokenBalanceOf, decimals);
  return balance;
}
