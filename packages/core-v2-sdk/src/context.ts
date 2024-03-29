import { getDefaultProvider, providers } from "ethers";
import { DataSource } from "./datasources/DataSource";

export interface ElementContextOptions {
  chainId: number;
  provider?: providers.Provider;
  dataSources?: Record<string, any>[];
}

export class ElementContext {
  chainId: number;
  provider: providers.Provider;
  dataSources: DataSource[];

  constructor({ chainId, provider, dataSources = [] }: ElementContextOptions) {
    this.chainId = chainId;
    if (!provider) {
      console.warn(
        "You are using the default provider, subject to rate limiting.",
      );
    }
    this.provider = provider ?? getDefaultProvider(chainId);
    this.dataSources = dataSources;
  }

  // TODO: How can we make this more efficient, yet still flexible
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
