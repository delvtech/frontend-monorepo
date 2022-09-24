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
  address: string;
  client: ElementClient;
  dataSource: MultiPoolDataSource;

  constructor({ address, client, dataSource }: MultiPoolOptions) {
    this.address = address;
    this.client = client;
    this.dataSource =
      dataSource ??
      client.getDataSource<MultiPoolDataSource>({ address }) ??
      new MultiPoolContractDataSource({ address, provider: client.provider });
  }

  async getTerm(): Promise<MultiTerm> {
    const address = await this.dataSource.getMultiTerm();
    return new MultiTerm({
      address,
      client: this.client,
    });
  }
}
