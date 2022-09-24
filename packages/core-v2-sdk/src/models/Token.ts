import { providers } from "ethers";
import { TokenContractDataSource } from "src/datasources/Token/TokenContractDataSource";
import { TokenDataSource } from "src/datasources/Token/TokenDataSource";

export class Token {
  address: string;
  dataSource: TokenDataSource;

  constructor(
    address: string,
    provider: providers.BaseProvider,
    dataSource?: TokenDataSource,
  ) {
    this.address = address;
    this.dataSource =
      dataSource || new TokenContractDataSource({ address, provider });
  }
}
