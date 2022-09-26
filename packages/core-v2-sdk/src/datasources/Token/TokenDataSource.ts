export interface TokenDataSource {
  address: string;
  getSymbol: () => Promise<string>;
  getDecimals: () => Promise<number>;
  getName: () => Promise<string>;
  getPrice: (currency: string) => Promise<number>;
  getAllowance: (owner: string, spender: string) => Promise<string>;
  getBalanceOf: (address: string) => Promise<string>;
}
