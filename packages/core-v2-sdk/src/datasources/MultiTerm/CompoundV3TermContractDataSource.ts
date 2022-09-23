import {
  CompoundV3Term,
  CompoundV3Term__factory,
} from "@elementfi/core-v2-typechain";
import { cached } from "@elementfi/base";
import {
  MultiTermContractDataSource,
  MultiTermContractDataSourceOptions,
} from "./MultiTermContractDataSource";

interface CompoundV3TermContractDataSourceOptions
  extends MultiTermContractDataSourceOptions {}

export class CompoundV3TermContractDataSource extends MultiTermContractDataSource {
  contract: CompoundV3Term;

  constructor(options: CompoundV3TermContractDataSourceOptions) {
    super(options);
    const { address, provider } = options;
    this.contract = CompoundV3Term__factory.connect(address, provider);
  }

  getYieldSourceAddress(): Promise<string> {
    return cached({
      cacheKey: "getYieldSourceAddress",
      cache: this.cache,
      callback: () => this.contract.yieldSource(),
    });
  }
}
