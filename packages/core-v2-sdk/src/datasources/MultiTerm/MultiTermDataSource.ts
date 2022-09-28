export interface MultiTermDataSource {
  address: string;
  getTermIds: (fromBlock?: number, toBlock?: number) => Promise<number[]>;
  getCreatedAtBlock: (termId: number) => Promise<number | null>;
  getYieldSource: () => Promise<string | null>;
  getBaseAsset: () => Promise<string>;
  getSymbol: (termId: number) => Promise<string>;
  getDecimals: () => Promise<number>;
  getName: (termId: number) => Promise<string>;
  getBalanceOf: (termId: number, address: string) => Promise<string>;
  getUnlockedPricePerShare: () => Promise<string>;
}
