import {
  retry as tsRetry,
  retryAsync as tsRetryAsync,
  RetryOptions,
} from "ts-retry";

/**
 * A utility to retry erroneous functions a number of times until it succeeds.
 *
 * @param fn The function to try.
 * @param options ts-retry options, defaults to { maxTry: 10,  delay: 500 }
 * @returns A Promise which resolves with the return value of the fn param.
 */
export function retry<T>(fn: () => T, options?: RetryOptions): Promise<T> {
  return tsRetry(fn, {
    maxTry: 10,
    delay: 500,
    ...options,
  });
}

/**
 * A utility to retry erroneous async functions a number of times until it
 * succeeds.
 *
 * @param fn The async function to try.
 * @param options ts-retry options, defaults to { maxTry: 10,  delay: 500 }
 * @returns A Promise which resolves with the return value of the fn param.
 */
export function retryAsync<T>(
  fn: () => Promise<T>,
  options?: RetryOptions,
): Promise<T> {
  return tsRetryAsync(fn, {
    maxTry: 10,
    delay: 500,
    ...options,
  });
}
