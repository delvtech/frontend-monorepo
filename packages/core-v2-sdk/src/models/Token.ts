import { ElementClient } from "src/client";
import { TokenContractDataSource } from "src/datasources/Token/TokenContractDataSource";
import { TokenDataSource } from "src/datasources/Token/TokenDataSource";

export interface TokenOptions {
  address: string;
  client: ElementClient;
  dataSource?: TokenDataSource;
}

export class Token {
  address: string;
  client: ElementClient;
  dataSource: TokenDataSource;

  constructor({ address, client, dataSource }: TokenOptions) {
    this.address = address;
    this.client = client;
    this.dataSource =
      dataSource ??
      client.getDataSource<TokenDataSource>({ address }) ??
      new TokenContractDataSource({ address, provider: client.provider });
  }
}
