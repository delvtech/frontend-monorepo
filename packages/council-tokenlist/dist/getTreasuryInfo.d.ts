import { Provider } from "@ethersproject/abstract-provider";
import { TreasuryInfo } from "./types";
export declare function getTreasuryInfo(provider: Provider, chainId: number, tokenAddress: string, name: string): Promise<TreasuryInfo | undefined>;
