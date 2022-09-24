import { ElementClient } from "src/client";
import { MultiTermDataSource } from "src/datasources/MultiTerm/MultiTermDataSource";
import { MultiTermContractDataSource } from "src/datasources/MultiTerm/MultiTermContractDataSource";
import { Token } from "./Token";
import { YieldSource } from "./YieldSource";

export interface MultiTermOptions {
  address: string;
  client: ElementClient;
  dataSource?: MultiTermDataSource;
}

export class MultiTerm {
  address: string;
  client: ElementClient;
  dataSource: MultiTermDataSource;

  constructor({ address, client, dataSource }: MultiTermOptions) {
    this.address = address;
    this.client = client;
    this.dataSource =
      dataSource ??
      client.getDataSource<MultiTermDataSource>({ address }) ??
      new MultiTermContractDataSource({ address, provider: client.provider });
  }

  async getBaseAsset(): Promise<Token> {
    const address = await this.dataSource.getBaseAsset();
    return new Token({
      address,
      client: this.client,
    });
  }

  async getYieldSource(): Promise<YieldSource | null> {
    const address = await this.dataSource.getYieldSource();
    if (!address) {
      return null;
    }
    return new YieldSource({
      address,
      client: this.client,
    });
  }
}
