import { ElementClient } from "src/client";
import { YieldSourceDataSource } from "src/datasources/YieldSource/YieldSourceDataSource";
import { UnknownYieldSourceDataSource } from "src/datasources/YieldSource/UnknownYieldSourceDataSource";

export interface YieldSourceOptions {
  address: string;
  client: ElementClient;
  dataSource?: YieldSourceDataSource;
}

export class YieldSource {
  client: ElementClient;
  dataSource: YieldSourceDataSource;
  address: string;

  constructor({ address, client, dataSource }: YieldSourceOptions) {
    this.client = client;
    this.dataSource =
      dataSource ??
      client.getDataSource<YieldSourceDataSource>({ address }) ??
      new UnknownYieldSourceDataSource({ address });
    this.address = address;
  }

  getName(): Promise<string> {
    return this.dataSource.getName();
  }
}
