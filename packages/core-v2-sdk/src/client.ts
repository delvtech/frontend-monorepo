import { providers } from "ethers";

export interface ElementClientOptions {
  chainId: number;
  provider: providers.BaseProvider;
  dataSources?: Record<string, any>[];
}

export class ElementClient {
  chainId: number;
  provider: providers.BaseProvider;
  dataSources: Record<string, any>[];

  constructor({ chainId, provider, dataSources = [] }: ElementClientOptions) {
    this.chainId = chainId;
    this.provider = provider;
    this.dataSources = dataSources;
  }

  getDataSource<T extends Record<string, any>>(filter: Partial<T>): T | null {
    const dataSource = this.dataSources.find((dataSource) => {
      let isMatch = true;
      for (const [key, value] of Object.entries(filter)) {
        if (!dataSource[key] !== value) {
          isMatch = false;
        }
      }
      return isMatch;
    });
    return (dataSource as T) ?? null;
  }
}
