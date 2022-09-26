import { providers } from "ethers";

export interface ElementContextOptions {
  chainId: number;
  provider: providers.BaseProvider;
  dataSources?: Record<string, any>[];
}

export class ElementContext {
  chainId: number;
  provider: providers.BaseProvider;
  dataSources: Record<string, any>[];

  constructor({ chainId, provider, dataSources = [] }: ElementContextOptions) {
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

  registerDataSource<T extends Record<string, any>>(
    filter: Partial<T>,
    dataSource: T,
  ): T {
    const existing = this.getDataSource(filter);
    if (existing) {
      return existing;
    }
    this.dataSources.push(dataSource);
    return dataSource;
  }
}
