import { Provider } from "@ethersproject/providers";
import { Pool, Pool__factory } from "@elementfi/core-v2-typechain";

export class PoolContract {
  address: string;
  contract: Pool;

  constructor(address: string, provider: Provider) {
    this.address = address;
    this.contract = Pool__factory.connect(address, provider);
  }
}
