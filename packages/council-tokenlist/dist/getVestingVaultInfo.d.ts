import { Provider } from "@ethersproject/abstract-provider";
import { VestingVaultInfo } from "./types";
export declare function getVestingVaultInfo(
  provider: Provider,
  chainId: number,
  tokenAddress: string,
  name: string,
): Promise<VestingVaultInfo>;
