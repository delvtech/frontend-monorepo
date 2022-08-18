import { Provider } from "@ethersproject/providers";
import {
  ERC4626Term,
  ERC4626Term__factory,
} from "@elementfi/core-v2-typechain";

export class ERC4626TermContract {
  address: string;
  contract: ERC4626Term;

  constructor(address: string, provider: Provider) {
    this.address = address;
    this.contract = ERC4626Term__factory.connect(address, provider);
  }
}
