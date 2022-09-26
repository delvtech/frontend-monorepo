import LRUCache from "lru-cache";
import { cached } from "@elementfi/base";
import { DataSource } from "./DataSource";

export class CachedDataSource implements DataSource {
  cache: LRUCache<string, any>;

  constructor(cache?: LRUCache<string, any>) {
    this.cache = cache ?? new LRUCache({ max: 500 });
  }

  cached<T extends (...args: any) => any>(
    cacheKey: unknown,
    callback: T,
  ): ReturnType<T> {
    return cached({
      cacheKey,
      cache: this.cache,
      callback,
    });
  }
}
