import { PoolParameters, PoolReserves } from "src/types";

export interface MultiPoolDataSource {
  address: string;
  getPoolIds: (fromBlock?: number, toBlock?: number) => Promise<number[]>;
  getMultiTerm: () => Promise<string>;
  getPoolReserves: (tokenId: number) => Promise<PoolReserves>;
  getPoolParameters: (tokenId: number) => Promise<PoolParameters>;
}
