import { BigNumber } from "ethers";
import { commify, formatEther } from "ethers/lib/utils";

// Show eth in the format of xxxxxx.12345 place values after the decimal
export function formatEthBalance(ethBalance: BigNumber | number): string {
  const ethBalanceString = formatEther(ethBalance);
  const decimalIndex = ethBalanceString.indexOf(".");
  if (decimalIndex > -1) {
    return commify(ethBalanceString.slice(0, decimalIndex + 5));
  }
  return commify(ethBalanceString);
}
