import { BigNumber } from "ethers";
import { formatEther } from "ethers/lib/utils";

export function formatEth(
  wei: BigNumber | undefined,
  defaultValue = 0,
): string {
  const finalWei = wei !== undefined ? wei : defaultValue;

  const formatted = formatEther(finalWei);
  return formatted;
}
