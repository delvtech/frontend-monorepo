import { providers } from "ethers";
import { MultiPoolDataSource } from "src/datasources/MultiPool/MultiPoolDataSource";

export interface CoreV2Context {
  chainId: number;
  provider: providers.BaseProvider;
  multiPools: MultiPoolDataSource[];
  expiryTimestamps: number[];
}
