import { providers } from "ethers";
import { ERC20, ERC20__factory } from "@elementfi/core-v2-typechain";
import { ContractDataSource } from "src/datasources/ContractDataSource";
import { TokenAPIDataSource } from "src/datasources/TokenAPI/TokenAPIDataSource";
import { CoinGeckoAPIDataSource } from "src/datasources/TokenAPI/CoinGeckoAPIDataSource";
import { TokenDataSource } from "./TokenDataSource";

export class TokenContractDataSource implements TokenDataSource {
  address: string;
  apiDataSource: TokenAPIDataSource;
  erc20DataSource: ContractDataSource<ERC20>;

  constructor(
    address: string,
    provider: providers.BaseProvider,
    options?: {
      apiDataSource?: TokenAPIDataSource;
      erc20DataSource?: ContractDataSource<ERC20>;
    },
  ) {
    this.address = address;
    this.apiDataSource = options?.apiDataSource ?? new CoinGeckoAPIDataSource();
    this.erc20DataSource =
      options?.erc20DataSource ??
      new ContractDataSource<ERC20>(ERC20__factory.connect(address, provider));
  }

  getSymbol(): Promise<string> {
    return this.erc20DataSource.call("symbol", []);
  }

  getDecimals(): Promise<number> {
    return this.erc20DataSource.call("decimals", []);
  }

  getName(): Promise<string> {
    return this.erc20DataSource.call("name", []);
  }

  async getPrice(currency: string): Promise<number> {
    // TODO: find a more reliable way to get the id
    const id = await (await this.getName()).toLowerCase();
    return this.apiDataSource.getTokenPrice(id, currency);
  }

  async getAllowance(owner: string, spender: string): Promise<string> {
    const balanceBigNumber = await this.erc20DataSource.call("allowance", [
      owner,
      spender,
    ]);
    return balanceBigNumber.toString();
  }

  async getBalanceOf(address: string): Promise<string> {
    const balanceBigNumber = await this.erc20DataSource.call("balanceOf", [
      address,
    ]);
    return balanceBigNumber.toString();
  }
}
