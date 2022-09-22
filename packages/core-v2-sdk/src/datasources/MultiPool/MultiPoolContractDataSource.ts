import { providers } from "ethers";
import LRUCache from "lru-cache";
import {
  ERC4626Term__factory,
  Pool,
  Pool__factory,
} from "@elementfi/core-v2-typechain";
import { MultiPoolDataSource } from "./MultiPoolDataSource";
import { MultiTermDataSource } from "src/datasources/MultiTerm/MultiTermDataSource";
import { ERC4626TermContractDataSource } from "src/datasources/MultiTerm/ERC4626TermContractDataSource";

interface MultiPoolContractDataSourceOptions {
  address: string;
  provider: providers.BaseProvider;
  multiTerm: MultiTermDataSource;
}

export class MultiPoolContractDataSource implements MultiPoolDataSource {
  address: string;
  contract: Pool;
  multiTerm: MultiTermDataSource;
  cache: LRUCache<string, any>;

  constructor({
    address,
    provider,
    multiTerm,
  }: MultiPoolContractDataSourceOptions) {
    this.address = address;
    this.contract = Pool__factory.connect(address, provider);
    this.multiTerm = multiTerm;
    this.cache = new LRUCache({ max: 500 });
  }

  static async createERC4626MultiPool(
    address: string,
    provider: providers.BaseProvider,
  ): Promise<MultiPoolContractDataSource> {
    const multiPoolContract = Pool__factory.connect(address, provider);
    const multiTermAddress = await multiPoolContract.term();
    const termContract = ERC4626Term__factory.connect(
      multiTermAddress,
      provider,
    );
    const yieldSourceAddress = await termContract.vault();
    const multiTermDataSource = new ERC4626TermContractDataSource({
      address: multiTermAddress,
      provider,
      yieldSource: yieldSourceAddress,
    });
    return new MultiPoolContractDataSource({
      address,
      provider,
      multiTerm: multiTermDataSource,
    });
  }
}
