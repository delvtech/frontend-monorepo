export interface YieldSourceDataSource {
  address: string;
  getName: () => Promise<string>;
}
