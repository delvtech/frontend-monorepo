import { Provider } from "@ethersproject/abstract-provider";
import { OptimisticsGrantsContractInfo } from "./types";
export declare function getOptimisticGrantsInfo(provider: Provider, chainId: number, tokenAddress: string, name: string): Promise<OptimisticsGrantsContractInfo | undefined>;
