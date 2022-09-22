import { providers } from "ethers";
import LRUCache from "lru-cache";
import {
  CompoundV3Term,
  CompoundV3Term__factory,
} from "@elementfi/core-v2-typechain";
import { MultiTermDataSource } from "./MultiTermDataSource";
import { cached } from "@elementfi/base";
import { YieldSourceDataSource } from "src/datasources/YieldSource/YieldSourceDataSource";
import { UnknownYieldSourceDataSource } from "src/datasources/YieldSource/UnknownYieldSourceDataSource";

interface CompoundV3TermContractDataSourceOptions {
  address: string;
  provider: providers.BaseProvider;
  /**
   * A YieldSourceDataSource instance or an address
   */
  yieldSource: YieldSourceDataSource | string;
}

export class CompoundV3TermContractDataSource implements MultiTermDataSource {
  address: string;
  contract: CompoundV3Term;
  yieldSource: YieldSourceDataSource;
  cache: LRUCache<string, any>;

  constructor({
    address,
    provider,
    yieldSource,
  }: CompoundV3TermContractDataSourceOptions) {
    this.address = address;
    this.contract = CompoundV3Term__factory.connect(address, provider);
    this.yieldSource =
      typeof yieldSource === "string"
        ? new UnknownYieldSourceDataSource({ address: yieldSource })
        : yieldSource;
    this.cache = new LRUCache({ max: 500 });
  }

  getYieldSourceAddress(): Promise<string> {
    return cached({
      cacheKey: "getYieldSourceAddress",
      cache: this.cache,
      callback: () => this.contract.yieldSource(),
    });
  }
}
