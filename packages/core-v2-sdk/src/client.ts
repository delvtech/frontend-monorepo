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
}
