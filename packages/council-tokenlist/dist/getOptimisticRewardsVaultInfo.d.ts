import { Provider } from "@ethersproject/abstract-provider";
import { OptimisticRewardsVaultInfo } from "./types";
export declare function getOptimisticRewardsVaultInfo(
  provider: Provider,
  chainId: number,
  tokenAddress: string,
  name: string,
): Promise<OptimisticRewardsVaultInfo | undefined>;
