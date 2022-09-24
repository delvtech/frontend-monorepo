import LRUCache from "lru-cache";
import { FixedNumber, BigNumberish, BigNumber } from "ethers";
import { MerkleTree } from "merkletreejs";
import { Money } from "ts-money";
import { QueryObserverResult } from "react-query";
type GetAndSetOptions = Parameters<LRUCache<string, any>["get"]>[1] & Parameters<LRUCache<string, any>["set"]>[2];
/**
 * A utility for wrapping a callback with caching logic.
 * @param options
 * @param options.cacheKey The string used to identify the cached result.
 * @param options.callback A function with a return value that will be cached
 *   and reused based on the cache's options.
 * @param options.cache An optional `lru-cache` instance to use for the
 *   callback's result. A new instance with `max: 500` is created by default.
 * @param options.options LRUCache's `get` and `set` options merged.
 * @returns The return value of the callback function.
 * @see https://github.com/isaacs/node-lru-cache
 */
export function cached<TCallback extends (...args: any[]) => any>({ cache, cacheKey, callback, options, }: {
    cacheKey: any;
    callback: TCallback;
    cache?: LRUCache<string, any>;
    options?: GetAndSetOptions;
}): ReturnType<TCallback>;
export const EMPTY_ARRAY: unknown[];
/**
 * Hook to only console.log when the inputs to console.log change.
 * @param consoleArgs arguments to console.log
 */
export function useConsole(...consoleArgs: any): void;
export enum ChainId {
    MAINNET = 1,
    GOERLI = 5,
    LOCAL = 31337
}
export const ETHEREUM_BLOCK_PER_DAY = 5760;
export const ETHEREUM_BLOCKS_PER_WEEK: number;
export const ChainNames: Record<ChainId, string>;
export const DEFAULT_CHAIN_IDS: ChainId[];
export function isLocalnet(chainId: number): boolean;
export function isGoerli(chainId: number): boolean;
export function isMainnet(chainId: number): boolean;
export const NUM_ETH_DECIMALS = 18;
export const ONE_ETHER: import("ethers").BigNumber;
export const ETH_ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";
export type LocalStorage = {
    getItem: (key: string) => string;
    setItem: (key: string, value: string) => boolean;
    clear: () => void;
};
export function useLocalStorage(): LocalStorage;
export interface FixedFormat {
    /**
     * number of decimals to use for fixed point math
     */
    decimals: number;
    /**
     * if the number is signed or unsigned
     */
    signed: boolean;
    /**
     * width in bits, must be power of 8. i.e. 8, 16, ..., 256.  Max is 256
     */
    width: number;
    /**
     * name of this format
     */
    name: string;
    /**
     * multiplier added to this number
     */
    _multiplier: string;
}
export interface FixedFormatOptions {
    decimals?: number;
    signed?: boolean;
    width?: number;
    name?: string;
    _multiplier?: string;
}
export function getSafeFixedNumber(value: string, formatOptions?: FixedFormatOptions): FixedNumber;
export function clipFixNumberToStringDecimals(value: FixedNumber, decimals: number): string;
export function clipStringValueToDecimals(value: string | undefined, maxDecimals: number): string;
/**
 * Helper function to get the number of digits after the decimal.  Assumes a properly formatted
 * number with only numeric characters and 0 or 1 decimals
 *
 * @param stringValue a numeric string with or without a decimal i.e. 3.14 or 42.
 */
export function getPlacesAfterDecimal(stringValue: string | undefined): number;
export interface Account {
    address: string;
    value: BigNumberish;
}
export function getMerkleTree(accounts: Account[]): MerkleTree;
export function hashAccount(account: Account): string;
/**
 * Helper function to get the fiat value for a cryptocurrency.  The conversion can easily throw
 * errors if BigNumber and Moneya are used incorrectly.
 *
 * @param {number} fiatValue the value of the crypto in the fiat, i.e. 400.01
 * @param {string} fiatCode  the ISO 4217 currency country code, i.e. 'USD'
 * @param {BigNumber} cryptoFractionalValue the fractional unit value, i.e. 10000000000000000000
 * (wei)
 * @param {number} cryptoDecimals the number of decimals to convert the fractional unit value to
 */
export function convertToFiatBalance(fiatValue: Money, cryptoFractionalValue: BigNumber, cryptoDecimals: number): Money;
export function convertNumberToFiatBalance(fiatValue: Money, cryptoNominalValue: number): Money;
interface FormatMoneyOptions {
    defaultMoney?: Money;
    wholeAmounts?: boolean;
}
/**
 * Helper to convert a Money object to a human readable string
 * ex: $1.23
 * @param {Money} money value to be formatted
 */
export function formatMoney(money: Money | undefined, options?: FormatMoneyOptions): string | undefined;
export interface PrefEnvelope<T> {
    pref: T;
    version: string;
}
/**
 * Use an envelope because JSON.stringify likes serializable objects and prefs
 * could be any data type.
 *
 * NOTE: Changing the shape of the PrefEnvelope might require a migration for
 * users who have persisted values.
 */
export function makePrefEnvelope<T>(pref: T): PrefEnvelope<T>;
interface PrefResult<T> {
    pref: T;
    setPref: (newPref: T) => void;
}
export function usePref<T>(id: string, defaultValue: T): PrefResult<T>;
export function getQueryData<T>(queryResult: QueryObserverResult<T>): T | undefined;
export function getQueriesData<T>(queryResults: QueryObserverResult<T>[]): (T | undefined)[];
/**
 * Formats a Date object, eg: "27"
 */
export const formatDay: (date: Date) => string;
/**
 * Formats a Date object, eg: "January 30, 2021"
 */
export const formatFullDate: (date: Date) => string;
/**
 * Formats a Date object, eg: "Jan 30, 2021"
 */
export const formatAbbreviatedDate: (date: Date) => string;
/**
 * Formats a Date object, eg: "Jan 30"
 */
export const formatAbbreviatedMonthAndDay: (date: Date) => string;
/**
 * Formats a Date object, eg: "2021"
 */
export const formatYear: (date: Date) => string;
export const ONE_MINUTE_IN_SECONDS = 60;
export const ONE_HOUR_IN_SECONDS: number;
export const ONE_DAY_IN_SECONDS: number;
export const ONE_WEEK_IN_SECONDS: number;
export const THIRTY_DAYS_IN_SECONDS: number;
export const ONE_YEAR_IN_SECONDS: number;
export const ONE_MINUTE_IN_MILLISECONDS: number;
export const ONE_HOUR_IN_MILLISECONDS: number;
export const TWELVE_HOUR_IN_MILLISECONDS: number;
export const ONE_DAY_IN_MILLISECONDS: number;
export const ONE_WEEK_IN_MILLISECONDS: number;
export const ONE_YEAR_IN_MILLISECONDS: number;
export const THIRTY_DAYS_IN_MILLISECONDS: number;
export function convertEpochSecondsToDate(seconds: number): Date;
export function assertNever(never: never): void;
/**
 * Performs a type check to make sure that a code path is unreachacle.  This is useful for example
 * in exhaustive type checking in switch statements:
 *
 * enum Foo {
 *   Bar = 'Bar',
 *   Baz = 'Baz',
 * }
 *
 * const foo = Foo.Bar;
 * switch (foo) {
 *   case Foo.Bar:
 *     // some logic here
 *     break;
 *   default:
 *     typeAssertNever(foo); // throws an error because case Foo.Baz is not covered!
 * }
 *
 * This function differs from assertNever in that it won't actually throw an error if the code is reached.
 * @param checkNever variable that should be equal to never by the time this function is reached.
 */
export function typeAassertNever(checkNever: never): void;
interface FormatBalanceOptions {
    /**
     * Whether or not to include commas when formatting, default is true.
     * Example: "1,000,000"
     */
    formatCommas: boolean;
}
/**
 * @deprecated BigNumber balance is deprecated, use formatBalance2 instead that just uses strings
 */
export function formatBalance(balance: BigNumber | undefined, decimals: number | undefined, maxPrecision?: number, options?: FormatBalanceOptions): string;
export function formatBalance2(balance: string | undefined, decimals: number | undefined, maxPrecision?: number, options?: FormatBalanceOptions): string;
export function formatPercent(decimalAmount: number, precision?: number): string;
export function sortAddresses(addresses: string[]): string[];
export function validateAddresses(addresses: string[]): void | never;

//# sourceMappingURL=index.d.ts.map
