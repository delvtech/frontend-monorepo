import { Provider } from "@ethersproject/providers";
import { MultiToken, MultiToken__factory } from "@elementfi/core-v2-typechain";

export class MultiTokenContract {
  address: string;
  contract: MultiToken;

  constructor(address: string, provider: Provider) {
    this.address = address;
    this.contract = MultiToken__factory.connect(address, provider);
  }
}
