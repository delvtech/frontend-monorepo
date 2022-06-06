import { Web3Provider } from "@ethersproject/providers";
import { BigNumber } from "ethers";

export async function fetchEthBalance(
  library: Web3Provider,
  account: string,
): Promise<BigNumber> {
  return library.getBalance(account);
}
