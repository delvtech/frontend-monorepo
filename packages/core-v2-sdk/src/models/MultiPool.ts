import { ElementClient } from "src/client";
import { MultiPoolContractDataSource } from "src/datasources/MultiPool/MultiPoolContractDataSource";
import { MultiPoolDataSource } from "src/datasources/MultiPool/MultiPoolDataSource";
import { MultiTerm } from "./MultiTerm";

export interface MultiPoolOptions {
  address: string;
  client: ElementClient;
  dataSource?: MultiPoolDataSource;
}

export class MultiPool {
  client: ElementClient;
  dataSource: MultiPoolDataSource;
  address: string;

  constructor({ address, client, dataSource }: MultiPoolOptions) {
    this.client = client;
    this.dataSource =
      dataSource ??
      client.getDataSource<MultiPoolDataSource>({ address }) ??
      new MultiPoolContractDataSource({ address, provider: client.provider });
    this.address = address;
  }

  async getTerm(): Promise<MultiTerm> {
    const address = await this.dataSource.getMultiTerm();
    return new MultiTerm({
      address,
      client: this.client,
    });
  }
}
