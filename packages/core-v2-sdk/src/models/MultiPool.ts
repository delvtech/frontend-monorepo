import { providers } from "ethers";
import { ElementClient } from "src/client";
import { MultiPoolContractDataSource } from "src/datasources/MultiPool/MultiPoolContractDataSource";
import { MultiPoolDataSource } from "src/datasources/MultiPool/MultiPoolDataSource";
import { setDataSourceByAddress } from "src/utils/setDataSourceByAddress";
import { MultiTerm } from "./MultiTerm";

export class MultiPool {
  address: string;
  dataSource: MultiPoolDataSource;
  provider: providers.BaseProvider;

  constructor(
    address: string,
    client: ElementClient,
    dataSource?: MultiPoolDataSource,
  ) {
    this.address = address;
    this.provider = client.provider;
    this.dataSource =
      dataSource ??
      setDataSourceByAddress(
        new MultiPoolContractDataSource({ address, provider: client.provider }),
        client,
      );
  }

  async getTerm(): Promise<MultiTerm> {
    const address = await this.dataSource.getMultiTerm();
    return new MultiTerm(address, this.provider);
  }
}
