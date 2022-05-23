import { Provider } from "@ethersproject/abstract-provider";
import { AirdropContractInfo } from "./types";
export declare function getAirdropInfo(
  provider: Provider,
  chainId: number,
  tokenAddress: string,
  name: string,
): Promise<AirdropContractInfo | undefined>;
