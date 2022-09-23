export interface MultiPoolDataSource {
  address: string;
  getMultiTerm: () => Promise<string>;
}
