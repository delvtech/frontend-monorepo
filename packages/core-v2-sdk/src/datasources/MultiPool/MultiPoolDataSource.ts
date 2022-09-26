export interface MultiPoolDataSource {
  address: string;
  getPoolIds: (fromBlock?: number, toBlock?: number) => Promise<number[]>;
  getMultiTerm: () => Promise<string>;
  getShareReserves: (tokenId: string) => Promise<string>;
  getBondReserves: (tokenId: string) => Promise<string>;
}
