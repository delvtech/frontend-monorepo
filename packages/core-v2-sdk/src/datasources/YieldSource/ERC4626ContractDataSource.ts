import { YieldSourceDataSource } from "./YieldSourceDataSource";
import { providers } from "ethers";
import LRUCache from "lru-cache";
import { cached } from "@elementfi/base";
import { ERC4626, ERC4626__factory } from "@elementfi/core-v2-typechain";

interface ERC4626ContractDataSourceOptions {
  address: string;
  provider: providers.BaseProvider;
}

export class ERC4626ContractDataSource implements YieldSourceDataSource {
  address: string;
  contract: ERC4626;
  cache: LRUCache<string, any>;

  constructor({ address, provider }: ERC4626ContractDataSourceOptions) {
    this.address = address;
    this.contract = ERC4626__factory.connect(address, provider);
    this.cache = new LRUCache({ max: 500 });
  }

  async getName(): Promise<string> {
    return cached({
      cacheKey: "getName",
      callback: async () => {
        return this.contract.name();
      },
      cache: this.cache,
    });
  }
}
