export interface MultiTermDataSource {
  address: string;
  getTermIds: (fromBlock?: number, toBlock?: number) => Promise<number[]>;
  getCreatedAtBlock: (tokenId: number) => Promise<number | null>;
  getYieldSource: () => Promise<string | null>;
  getBaseAsset: () => Promise<string>;
  getSymbol: (tokenId: number) => Promise<string>;
  getDecimals: () => Promise<number>;
  getName: (tokenId: number) => Promise<string>;
  getBalanceOf: (tokenId: number, address: string) => Promise<string>;
}
