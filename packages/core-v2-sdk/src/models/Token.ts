import { ElementClient } from "src/client";
import { TokenContractDataSource } from "src/datasources/Token/TokenContractDataSource";
import { TokenDataSource } from "src/datasources/Token/TokenDataSource";
import { CoinGeckoAPIDataSource } from "src/datasources/TokenAPI/CoinGeckoAPIDataSource";

export class Token {
  address: string;
  client: ElementClient;
  dataSource: TokenDataSource;

  constructor(
    address: string,
    client: ElementClient,
    dataSource?: TokenDataSource,
  ) {
    this.address = address;
    this.client = client;
    if (dataSource) {
      this.dataSource = dataSource;
    } else {
      const tokenAPIDataSource = client.setDataSource(
        { baseURL: CoinGeckoAPIDataSource.baseURL },
        new CoinGeckoAPIDataSource(),
      );
      this.dataSource = client.setDataSource(
        { address },
        new TokenContractDataSource(address, client.provider, {
          apiDataSource: tokenAPIDataSource,
        }),
      );
    }
  }

  getSymbol(): Promise<string> {
    return this.dataSource.getSymbol();
  }

  getDecimals(): Promise<number> {
    return this.dataSource.getDecimals();
  }

  getName(): Promise<string> {
    return this.dataSource.getName();
  }

  getPrice(currency: string): Promise<number> {
    return this.dataSource.getPrice(currency);
  }

  getAllowance(owner: string, spender: string): Promise<string> {
    return this.dataSource.getAllowance(owner, spender);
  }

  getBalanceOf(address: string): Promise<string> {
    return this.dataSource.getBalanceOf(address);
  }
}
