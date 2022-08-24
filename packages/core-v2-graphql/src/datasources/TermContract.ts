import { Provider } from "@ethersproject/providers";
import { Term, Term__factory } from "@elementfi/core-v2-typechain";

// TODO: add caching to datasource
export class TermContract {
  address: string;
  contract: Term;

  constructor(address: string, provider: Provider) {
    this.address = address;
    this.contract = Term__factory.connect(address, provider);
  }
}
