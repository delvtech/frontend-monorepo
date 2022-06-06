import { BigNumberish } from "ethers";

// this one is likely to get a lot more complicated.  there could be join kinds like exact amount in, exact amount out etc.
export function calculateLPTokensOut(
  tokenAmountsIn: BigNumberish[],
  tokenReserves: BigNumberish[],
): string {
  return "1";
}
