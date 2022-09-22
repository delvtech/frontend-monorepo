import { providers } from "ethers";
import LRUCache from "lru-cache";
import {
  ERC4626Term,
  ERC4626Term__factory,
} from "@elementfi/core-v2-typechain";
import { MultiTermDataSource } from "./MultiTermDataSource";
import { cached } from "@elementfi/base";
import { YieldSourceDataSource } from "src/datasources/YieldSource/YieldSourceDataSource";
import { ERC4626ContractDataSource } from "src/datasources/YieldSource/ERC4626ContractDataSource";

interface ERC4626TermContractDataSourceOptions {
  address: string;
  provider: providers.BaseProvider;
  /**
   * A YieldSourceDataSource instance or the address of an ERC4626 vault
   */
  yieldSource: YieldSourceDataSource | string;
}

export class ERC4626TermContractDataSource implements MultiTermDataSource {
  address: string;
  contract: ERC4626Term;
  yieldSource: YieldSourceDataSource;
  cache: LRUCache<string, any>;

  constructor({
    address,
    provider,
    yieldSource,
  }: ERC4626TermContractDataSourceOptions) {
    this.address = address;
    this.contract = ERC4626Term__factory.connect(address, provider);
    this.yieldSource =
      typeof yieldSource === "string"
        ? new ERC4626ContractDataSource({
            address: yieldSource,
            provider,
          })
        : yieldSource;
    this.cache = new LRUCache({ max: 500 });
  }

  getYieldSourceAddress(): Promise<string> {
    return cached({
      cacheKey: "getYieldSourceAddress",
      cache: this.cache,
      callback: () => this.contract.vault(),
    });
  }
}
