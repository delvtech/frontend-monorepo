import { ethers, providers, Signer } from "ethers";
import { formatUnits, parseUnits } from "ethers/lib/utils";
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
    provider: providers.Provider,
    options?: {
      apiDataSource?: TokenAPIDataSource;
      erc20DataSource?: ContractDataSource<ERC20>;
    },
  ) {
    this.address = address;
    this.apiDataSource = options?.apiDataSource ?? new CoinGeckoAPIDataSource();
    this.erc20DataSource =
      options?.erc20DataSource ??
      new ContractDataSource(ERC20__factory.connect(address, provider));
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

  async getPrice(currency: string): Promise<number | null> {
    // TODO: find a more reliable way to get the id
    const id = (await this.getName()).toLowerCase();
    return this.apiDataSource.getTokenPrice(id, currency);
  }

  async getAllowance(owner: string, spender: string): Promise<string> {
    const balanceBigNumber = await this.erc20DataSource.call("allowance", [
      owner,
      spender,
    ]);
    const decimals = await this.getDecimals();
    return formatUnits(balanceBigNumber, decimals);
  }

  async getBalanceOf(address: string): Promise<string> {
    const balanceBigNumber = await this.erc20DataSource.call("balanceOf", [
      address,
    ]);
    const decimals = await this.getDecimals();
    return formatUnits(balanceBigNumber, decimals);
  }

  /**
   * Sets approval of token access up to a certain amount
   * @param {Signer} signer - Signer.
   * @param {string} who - Address to approve access to.
   * @param {string} [amount] - Amount approved for, defaults to maximum.
   * @return {Promise<boolean>} successful - Boolean denoting a successful approval.
   */
  async approve(
    signer: Signer,
    who: string,
    amount?: string,
  ): Promise<boolean> {
    const token = this.erc20DataSource.contract.connect(signer);
    const transaction = await token.approve(
      who,
      amount
        ? parseUnits(amount, await this.getDecimals())
        : ethers.constants.MaxUint256,
    );
    await transaction.wait(); // will throw an error if transaction fails
    return true;
  }
}
