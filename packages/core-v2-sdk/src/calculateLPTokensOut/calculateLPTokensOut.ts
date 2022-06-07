import { BigNumberish } from "ethers";

/**
 * calculates an amount of LP tokens out for an amount of asset provided.  could be single sided or double sided.
 * this one is likely to get a lot more complicated.  there could be join kinds like exact amount in, exact amount out etc.
 * @param tokenAmountsIn
 * @param tokenReserves
 * @returns
 */
export function calculateLPTokensOut(
  tokenAmountsIn: BigNumberish[],
  tokenReserves: BigNumberish[],
): string {
  return "1";
}
