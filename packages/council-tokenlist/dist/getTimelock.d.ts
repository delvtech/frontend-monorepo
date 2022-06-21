import { Provider } from "@ethersproject/abstract-provider";
import { TimelockInfo } from "./types";
export declare function getTimelockInfo(provider: Provider, chainId: number, tokenAddress: string, name: string): Promise<TimelockInfo | undefined>;
