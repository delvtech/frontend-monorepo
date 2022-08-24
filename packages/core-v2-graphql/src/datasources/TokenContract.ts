import { Provider } from "@ethersproject/providers";
import { ERC20, ERC20__factory } from "@elementfi/core-v2-typechain";
import { BigNumber } from "ethers";

// TODO: add caching to datasource
export class TokenContract {
  address: string;
  contract: ERC20;

  constructor(address: string, provider: Provider) {
    this.address = address;
    this.contract = ERC20__factory.connect(address, provider);
  }

  async getBalanceOf(address: string): Promise<string> {
    return (await this.contract.balanceOf(address)).toString();
  }

  async getAllowance(owner: string, spender: string): Promise<string> {
    return (await this.contract.allowance(owner, spender)).toString();
  }

  async getDecimals(): Promise<string> {
    return (await this.contract.decimals()).toString();
  }

  async getSymbol(): Promise<string> {
    return (await this.contract.symbol()).toString();
  }

  async getname(): Promise<string> {
    return (await this.contract.name()).toString();
  }
}
