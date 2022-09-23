export interface MultiTermDataSource {
  address: string;
  getBaseAsset: () => Promise<string>;
  getYieldSource: () => Promise<string | null>;
}
