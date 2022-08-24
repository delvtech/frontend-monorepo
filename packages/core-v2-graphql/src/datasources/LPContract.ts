import { Provider } from "@ethersproject/providers";
import { LP, LP__factory } from "@elementfi/core-v2-typechain";

// TODO: add caching to datasource
export class LPContract {
  address: string;
  contract: LP;

  constructor(address: string, provider: Provider) {
    this.address = address;
    this.contract = LP__factory.connect(address, provider);
  }
}
