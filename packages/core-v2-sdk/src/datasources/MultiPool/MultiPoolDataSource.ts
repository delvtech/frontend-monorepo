import { PoolParameters, PoolReserves } from "src/types";

export interface MultiPoolDataSource {
  address: string;
  getPoolIds: (fromBlock?: number, toBlock?: number) => Promise<number[]>;
  getMultiTerm: () => Promise<string>;
  getPoolReserves: (poolId: number) => Promise<PoolReserves>;
  getPoolParameters: (poolId: number) => Promise<PoolParameters>;
}
