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

// class MultiPoolContractDataSourceManager {
//   ds: Record<string, MultiPoolContractDataSource>;
//   constructor() {
//     this.ds = {};
//   }

//   getDataSource(address: string, provider: providers.BaseProvider): MultiPoolContractDataSource {
//     if (this.ds[address]) {
//       return this.ds[address]
//     } else {
//       this.ds[address] = new MultiPoolContractDataSource({ address, provider})
//       return this.ds[address]
//     }
//   }
// }
