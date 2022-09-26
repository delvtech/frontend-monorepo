import { ElementClient } from "src/client";
import { YieldSourceDataSource } from "src/datasources/YieldSource/YieldSourceDataSource";
import { UnknownYieldSourceDataSource } from "src/datasources/YieldSource/UnknownYieldSourceDataSource";

export class YieldSource {
  address: string;
  client: ElementClient;
  dataSource: YieldSourceDataSource;

  constructor(
    address: string,
    client: ElementClient,
    dataSource?: YieldSourceDataSource,
  ) {
    this.address = address;
    this.client = client;
    this.dataSource =
      dataSource ??
      client.setDataSource(
        { address },
        new UnknownYieldSourceDataSource(address),
      );
  }

  getName(): Promise<string> {
    return this.dataSource.getName();
  }
}
