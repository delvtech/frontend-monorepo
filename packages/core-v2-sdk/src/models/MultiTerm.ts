import { providers } from "ethers";
import { MultiTermDataSource } from "src/datasources/MultiTerm/MultiTermDataSource";
import { MultiTermContractDataSource } from "src/datasources/MultiTerm/MultiTermContractDataSource";
import { Token } from "./Token";

export class MultiTerm {
  address: string;
  dataSource: MultiTermDataSource;
  provider: providers.BaseProvider;

  constructor(
    address: string,
    provider: providers.BaseProvider,
    dataSource?: MultiTermDataSource,
  ) {
    this.address = address;
    this.dataSource =
      dataSource ?? new MultiTermContractDataSource({ address, provider });
    this.provider = provider;
  }

  async getBaseAsset(): Promise<Token> {
    const address = await this.dataSource.getBaseAsset();
    return new Token(address, this.provider);
  }
}
