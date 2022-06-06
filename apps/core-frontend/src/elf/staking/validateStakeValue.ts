import { BigNumber } from "ethers";
import { parseUnits } from "ethers/lib/utils";

export function validateStakingValue(
  amount: string | undefined,
  tokenBalanceOf: BigNumber | undefined,
  tokenDecimals: number | undefined,
): boolean {
  const isValidTokenValue =
    amount && tokenBalanceOf
      ? parseUnits(amount || "0", tokenDecimals).lte(tokenBalanceOf)
      : true;

  return isValidTokenValue;
}
