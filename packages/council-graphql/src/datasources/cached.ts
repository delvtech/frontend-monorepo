import LRUCache from "lru-cache";
import stringify from "fast-json-stable-stringify";

type AnyFunction = (...args: any[]) => any;
type GetAndSetOptions = Parameters<LRUCache<string, any>["get"]>[1] &
  Parameters<LRUCache<string, any>["set"]>[2];

/**
 * A utility for wrapping a callback with caching logic.
 * @param options
 * @param options.cacheKey The string used to identify the cached result.
 * @param options.callback A function with a return value that will be cached
 *   and reused based on the cache's options.
 * @param options.cache An optional `lru-cache` instance to use for the
 *   call back's result. A new instance with `max: 500` is created by default.
 * @param options.options LRUCache's `get` and `set` options merged.
 * @returns The return value of the callback function.
 */
export function cached<TCallback extends AnyFunction>({
  cache = new LRUCache({ max: 500 }),
  cacheKey,
  callback,
  options,
}: {
  cacheKey: string;
  callback: TCallback;
  cache?: LRUCache<string, any>;
  options?: GetAndSetOptions;
}): ReturnType<TCallback> {
  if (cache.has(cacheKey)) {
    console.log("✅ cache hit", cacheKey);
    return cache.get(cacheKey, options) as ReturnType<TCallback>;
  } else {
    console.log("❌ cache miss", cacheKey);
    const value = callback();
    cache.set(cacheKey, value, options);
    return value;
  }
}

/**
 * Create a cache key from a prefix and list of values (arguments)
 * @param prefix The starting value of the key.
 * @param args The values to stringify and append to the key.
 * @returns A string made up of the prefix and stringified arguments.
 */
export function getCacheKey(prefix: string, args: any[]): string {
  const argKeys: string[] = [];
  for (const arg of args) {
    if (arg === null) {
      argKeys.push("null");
    } else if (typeof arg === "object") {
      argKeys.push(stringify(arg));
    } else {
      argKeys.push(arg.toString());
    }
  }
  return `${prefix}:${argKeys.join(",")}`;
}
