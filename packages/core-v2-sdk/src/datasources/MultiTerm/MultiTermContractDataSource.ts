import { providers } from "ethers";
import LRUCache from "lru-cache";
import { Term, Term__factory } from "@elementfi/core-v2-typechain";
import { MultiTermDataSource } from "./MultiTermDataSource";
import { cached } from "@elementfi/base";

export interface MultiTermContractDataSourceOptions {
  address: string;
  provider: providers.BaseProvider;
}

export class MultiTermContractDataSource implements MultiTermDataSource {
  address: string;
  contract: Term;
  cache: LRUCache<string, any>;

  constructor({ address, provider }: MultiTermContractDataSourceOptions) {
    this.address = address;
    this.contract = Term__factory.connect(address, provider);
    this.cache = new LRUCache({ max: 500 });
  }

  async getYieldSource(): Promise<null> {
    // console.warn('Idk how to do that')
    return null;
  }

  async getBaseAsset(): Promise<string> {
    return cached({
      cacheKey: "getBaseAsset",
      cache: this.cache,
      callback: () => this.contract.token(),
    });
  }
}
