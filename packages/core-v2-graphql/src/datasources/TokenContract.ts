import { Provider } from "@ethersproject/providers";
import { ERC20, ERC20__factory } from "@elementfi/core-v2-typechain";
import { BigNumber } from "ethers";

export class TokenContract {
  address: string;
  contract: ERC20;

  constructor(address: string, provider: Provider) {
    this.address = address;
    this.contract = ERC20__factory.connect(address, provider);
    console.log("here");
  }

  async getBalanceOf(address: string): Promise<BigNumber> {
    return this.contract.balanceOf(address);
  }

  async getAllowance(owner: string, spender: string): Promise<BigNumber> {
    return this.contract.allowance(owner, spender);
  }
}
