import { providers } from "ethers";
import LRUCache from "lru-cache";
import { Pool, Pool__factory } from "@elementfi/core-v2-typechain";
import { MultiPoolDataSource } from "./MultiPoolDataSource";
import { MultiTermDataSource } from "src/datasources/MultiTerm/MultiTermDataSource";
import { cached } from "@elementfi/base";

interface MultiPoolContractDataSourceOptions {
  address: string;
  provider: providers.BaseProvider;
}

export class MultiPoolContractDataSource implements MultiPoolDataSource {
  address: string;
  contract: Pool;
  cache: LRUCache<string, any>;

  constructor({ address, provider }: MultiPoolContractDataSourceOptions) {
    this.address = address;
    this.contract = Pool__factory.connect(address, provider);
    this.cache = new LRUCache({ max: 500 });
  }

  getMultiTerm(): Promise<string> {
    return cached({
      cacheKey: "getMultiTerm",
      cache: this.cache,
      callback: () => this.contract.term(),
    });
  }
}
