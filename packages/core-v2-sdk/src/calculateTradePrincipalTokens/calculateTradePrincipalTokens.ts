import {
  BigNumber,
  BigNumberish,
  ContractReceipt,
  ContractTransaction,
  Overrides,
  Signer,
} from "ethers";

/**
 * calculates a trade of prinicipal tokens
 * this is likely to get a lot more complicated with swap kinds, exact in, exact out etc
 * @param tokenAmountsIn
 * @param tokenReserves
 * @returns
 */
export function calculateTradePrincipalTokens(
  tokenAmountsIn: BigNumberish[],
  tokenReserves: BigNumberish[],
): string {
  return "1";
}
