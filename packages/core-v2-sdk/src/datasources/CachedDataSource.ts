import LRUCache from "lru-cache";
import { cached } from "@elementfi/base";
import { DataSource } from "./DataSource";

export class CachedDataSource implements DataSource {
  cache: LRUCache<string, any>;

  constructor(cache?: LRUCache<string, any>) {
    this.cache = cache ?? new LRUCache({ max: 500 });
  }

  // The return type will match the return type of the callback function.
  cached<T extends (...args: any) => any, TKey = any>(
    // The cache key will be reduced to a string
    cacheKey: TKey,
    callback: T,
  ): ReturnType<T> {
    return cached({
      cacheKey,
      cache: this.cache,
      callback,
    });
  }
}
