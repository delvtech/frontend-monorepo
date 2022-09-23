import {
  ERC4626Term,
  ERC4626Term__factory,
} from "@elementfi/core-v2-typechain";
import { cached } from "@elementfi/base";
import {
  MultiTermContractDataSource,
  MultiTermContractDataSourceOptions,
} from "./MultiTermContractDataSource";

interface ERC4626TermContractDataSourceOptions
  extends MultiTermContractDataSourceOptions {}

export class ERC4626TermContractDataSource extends MultiTermContractDataSource {
  contract: ERC4626Term;

  constructor(options: ERC4626TermContractDataSourceOptions) {
    super(options);
    const { address, provider } = options;
    this.contract = ERC4626Term__factory.connect(address, provider);
  }

  getYieldSourceAddress(): Promise<string> {
    return cached({
      cacheKey: "getYieldSourceAddress",
      cache: this.cache,
      callback: () => this.contract.vault(),
    });
  }
}
