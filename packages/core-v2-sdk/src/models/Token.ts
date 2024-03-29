import { Signer } from "ethers";
import { ElementContext } from "src/context";
import { TokenContractDataSource } from "src/datasources/Token/TokenContractDataSource";
import { TokenDataSource } from "src/datasources/Token/TokenDataSource";
import { CoinGeckoAPIDataSource } from "src/datasources/TokenAPI/CoinGeckoAPIDataSource";

export class Token {
  address: string;
  context: ElementContext;
  dataSource: TokenDataSource;

  constructor(
    address: string,
    context: ElementContext,
    dataSource?: TokenDataSource,
  ) {
    this.address = address;
    this.context = context;
    if (dataSource) {
      this.dataSource = dataSource;
    } else {
      const tokenAPIDataSource = context.registerDataSource(
        { baseURL: CoinGeckoAPIDataSource.baseURL },
        new CoinGeckoAPIDataSource(),
      );
      this.dataSource = context.registerDataSource(
        { address },
        new TokenContractDataSource(address, context.provider, {
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

  getPrice(currency: string): Promise<number | null> {
    return this.dataSource.getPrice(currency);
  }

  getAllowance(owner: string, spender: string): Promise<string> {
    return this.dataSource.getAllowance(owner, spender);
  }

  getBalanceOf(address: string): Promise<string> {
    return this.dataSource.getBalanceOf(address);
  }

  /**
   * Sets approval of token access up to a certain amount
   * @param {Signer} signer - Signer.
   * @param {string} spender - Address to approve access to.
   * @param {string} [amount] - Amount approved for, defaults to maximum.
   * @return {Promise<boolean>} successful - Boolean denoting a successful approval.
   */
  approve(signer: Signer, spender: string, amount?: string): Promise<boolean> {
    return this.dataSource.approve(signer, spender, amount);
  }
}
