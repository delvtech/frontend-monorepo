import { Provider } from "@ethersproject/providers";
import { Term, Term__factory } from "@elementfi/core-v2-typechain";

export class TermContract {
  address: string;
  contract: Term;

  constructor(address: string, provider: Provider) {
    this.address = address;
    this.contract = Term__factory.connect(address, provider);
  }
}
