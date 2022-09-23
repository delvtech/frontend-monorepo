import { providers } from "ethers";
import LRUCache from "lru-cache";
import { Term, Term__factory } from "@elementfi/core-v2-typechain";
import { TokenDataSource } from "./TokenDataSource";
import { cached } from "@elementfi/base";

export interface TokenDataSourceOptions {
  address: string;
  provider: providers.BaseProvider;
}

export class TokenContractDataSource implements TokenDataSource {
  address: string;
  contract: Term;
  cache: LRUCache<string, any>;

  constructor({ address, provider }: TokenDataSourceOptions) {
    this.address = address;
    this.contract = Term__factory.connect(address, provider);
    this.cache = new LRUCache({ max: 500 });
  }
}
