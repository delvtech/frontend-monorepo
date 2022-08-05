import { Provider } from "@ethersproject/providers";
import {
  ERC20Forwarder,
  ERC20Forwarder__factory,
} from "@elementfi/core-v2-typechain";

export class ERC20ForwarderContract {
  address: string;
  contract: ERC20Forwarder;

  constructor(address: string, provider: Provider) {
    this.address = address;
    this.contract = ERC20Forwarder__factory.connect(address, provider);
  }
}
