import {
  BigNumber,
  BigNumberish,
  ContractReceipt,
  ContractTransaction,
  Overrides,
  Signer,
} from "ethers";

// this is likely to get a lot more complicated with swap kinds, exact in, exact out etc
export function calculateTradePrincipalTokens(
  tokenAmountsIn: BigNumberish[],
  tokenReserves: BigNumberish[],
): string {
  return "1";
}
