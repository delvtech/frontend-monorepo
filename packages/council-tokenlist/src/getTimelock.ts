import { Provider } from "@ethersproject/abstract-provider";
import { Timelock__factory } from "elf-council-typechain";
import { ethers } from "ethers";

import { TimelockInfo } from "src/types";

export async function getTimelockInfo(
  provider: Provider,
  chainId: number,
  tokenAddress: string,
  name: string,
): Promise<TimelockInfo | undefined> {
  if (!tokenAddress || tokenAddress === ethers.constants.AddressZero) {
    console.error("Invavlid Token Address for ", name, tokenAddress);
    return;
  }
  const timelockContract = Timelock__factory.connect(tokenAddress, provider);

  const waitTime = await timelockContract.waitTime();

  return {
    chainId,
    address: tokenAddress,
    name,
    decimals: 0,
    symbol: "",
    extensions: {
      waitTime: waitTime.toString(),
    },
  };
}
