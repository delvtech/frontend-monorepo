import { YieldSourceDataSource } from "./YieldSourceDataSource";
import LRUCache from "lru-cache";
import { cached } from "@elementfi/base";

interface UnknownYieldSourceDataSourceOptions {
  address: string;
}

export class UnknownYieldSourceDataSource implements YieldSourceDataSource {
  address: string;
  cache: LRUCache<string, any>;

  constructor({ address }: UnknownYieldSourceDataSourceOptions) {
    this.address = address;
    this.cache = new LRUCache({ max: 500 });
  }

  async getName(): Promise<string> {
    return cached({
      cacheKey: "getName",
      callback: async () => "Unnamed YieldSource",
      cache: this.cache,
    });
  }
}
