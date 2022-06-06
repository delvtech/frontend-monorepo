import { BigNumber } from "ethers";
import { formatUnits } from "ethers/lib/utils";

export function consoleEther(
  name: string,
  value: BigNumber | undefined,
  units = 18,
): void {
  if (!value) {
    return;
  }

  // eslint-disable-next-line no-console
  console.log(name, formatUnits(value, units));
}
