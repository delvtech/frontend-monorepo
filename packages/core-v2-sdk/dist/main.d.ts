import { providers, BaseContract, BigNumberish, ContractTransaction, Overrides, Signer } from "ethers";
import LRUCache from "lru-cache";
import { Pool as _Pool1, Term as _Term1, ERC4626Term, CompoundV3Term, ERC20, ERC4626 } from "@elementfi/core-v2-typechain";
import { TransferSingleEvent } from "@elementfi/core-v2-typechain/dist/contracts/Term";
interface DataSource extends Record<string, any> {
}
export interface ElementContextOptions {
    chainId: number;
    provider: providers.Provider;
    dataSources?: Record<string, any>[];
}
export class ElementContext {
    chainId: number;
    provider: providers.Provider;
    dataSources: DataSource[];
    constructor({ chainId, provider, dataSources }: ElementContextOptions);
    getDataSource<T extends Record<string, any>>(filter: Partial<T>): T | null;
    registerDataSource<T extends Record<string, any>>(filter: Partial<T>, dataSource: T): T;
}
export class CachedDataSource implements DataSource {
    cache: LRUCache<string, any>;
    constructor(cache?: LRUCache<string, any>);
    cached<T extends (...args: any) => any, TKey = any>(cacheKey: TKey, callback: T): ReturnType<T>;
}
type AnyFunction = (...args: any) => any;
/**
 * Get a union of all keys/properties on T that are functions
 */
export type FunctionKeys<T> = Exclude<{
    [K in keyof T]: T[K] extends AnyFunction ? K : never;
}[keyof T], undefined>;
export class ContractDataSource<T extends BaseContract> extends CachedDataSource {
    address: string;
    contract: T;
    constructor(contract: T, cache?: LRUCache<string, any>);
    call<K extends FunctionKeys<T>>(property: K, args: T[K] extends AnyFunction ? Parameters<T[K]> : never): T[K] extends AnyFunction ? ReturnType<T[K]> : never;
}
export class HTTPDataSource<T = any> extends CachedDataSource {
    baseURL: string;
    defaultRequestOptions: RequestInit;
    defaultGetOptions: RequestInit;
    defaultPostOptions: RequestInit;
    defaultPutOptions: RequestInit;
    defaultDeleteOptions: RequestInit;
    onResponse: (res: Response) => Promise<T>;
    constructor(baseURL: string, options?: {
        defaultRequestOptions?: RequestInit;
        defaultGetOptions?: RequestInit;
        defaultPostOptions?: RequestInit;
        defaultPutOptions?: RequestInit;
        defaultDeleteOptions?: RequestInit;
        onResponse?: (res: Response) => Promise<T>;
    });
    post<T>(path: string, options: RequestInit): Promise<T>;
    get<T>(path: string, options?: RequestInit): Promise<T>;
    put<T>(path: string, options: RequestInit): Promise<T>;
    delete<T>(path: string, options?: RequestInit): Promise<T>;
}
interface PoolReserves {
    bonds: string;
    shares: string;
}
interface PoolParameters {
    mu: string;
    timeStretch: string;
}
export interface MultiPoolDataSource {
    address: string;
    getPoolIds: (fromBlock?: number, toBlock?: number) => Promise<number[]>;
    getMultiTerm: () => Promise<string>;
    getPoolReserves: (tokenId: number) => Promise<PoolReserves>;
    getPoolParameters: (tokenId: number) => Promise<PoolParameters>;
}
export class MultiPoolContractDataSource extends ContractDataSource<_Pool1> implements MultiPoolDataSource {
    constructor(address: string, provider: providers.Provider);
    getPoolIds(fromBlock?: number, toBlock?: number): Promise<number[]>;
    getMultiTerm(): Promise<string>;
    /**
     * Fetches and caches the pool reserves from our datasource (contract).
     * @notice This function returns reserves as string representation of a fixed point number.
     * @param {number} tokenId - the pool id (expiry)
     * @return {Promise<PoolReserves>}
     */
    getPoolReserves(tokenId: number): Promise<PoolReserves>;
    /**
     * Fetches and caches the pool parameters from our datasource (contract).
     * @notice This function also handles converting the pool parameters from a fixed point number.
     * @param {number} tokenId - the pool id (expiry)
     * @return {Promise<PoolParameters>}
     */
    getPoolParameters(tokenId: number): Promise<PoolParameters>;
}
export interface MultiTermDataSource {
    address: string;
    getTermIds: (fromBlock?: number, toBlock?: number) => Promise<number[]>;
    getCreatedAtBlock: (tokenId: number) => Promise<number | null>;
    getYieldSource: () => Promise<string | null>;
    getBaseAsset: () => Promise<string>;
    getSymbol: (tokenId: number) => Promise<string>;
    getDecimals: () => Promise<number>;
    getName: (tokenId: number) => Promise<string>;
    getBalanceOf: (tokenId: number, address: string) => Promise<string>;
    getUnlockedPricePerShare: () => Promise<string>;
}
export class MultiTermContractDataSource extends ContractDataSource<_Term1> implements MultiTermDataSource {
    constructor(address: string, provider: providers.Provider);
    getTransferEvents(from?: string | null, to?: string | null, fromBlock?: number, toBlock?: number): Promise<TransferSingleEvent[]>;
    getTermIds(fromBlock?: number, toBlock?: number): Promise<number[]>;
    getCreatedAtBlock(tokenId: number): Promise<number | null>;
    getYieldSource(): Promise<null>;
    getBaseAsset(): Promise<string>;
    getSymbol(tokenId: number): Promise<string>;
    getDecimals(): Promise<number>;
    getName(tokenId: number): Promise<string>;
    getBalanceOf(tokenId: number, address: string): Promise<string>;
    /**
     * Fetches and caches the terms unlockedSharePrice value from our datasource (contract).
     * @notice This function converts the sharePrice from a fixed point number.
     * @param {number} tokenId - the term id (expiry)
     * @return {Promise<string>} The unlocked share price as a string.
     */
    getUnlockedPricePerShare(): Promise<string>;
}
export class ERC4626TermContractDataSource extends MultiTermContractDataSource {
    contract: ERC4626Term;
    constructor(address: string, provider: providers.Provider);
    getYieldSourceAddress(this: ContractDataSource<ERC4626Term>): Promise<string>;
}
export class CompoundV3TermContractDataSource extends MultiTermContractDataSource {
    contract: CompoundV3Term;
    constructor(address: string, provider: providers.Provider);
    getYieldSourceAddress(this: ContractDataSource<CompoundV3Term>): Promise<string>;
}
export interface TokenDataSource {
    address: string;
    getSymbol: () => Promise<string>;
    getDecimals: () => Promise<number>;
    getName: () => Promise<string>;
    getPrice: (currency: string) => Promise<number | null>;
    getAllowance: (owner: string, spender: string) => Promise<string>;
    getBalanceOf: (address: string) => Promise<string>;
}
export interface TokenAPIDataSource {
    getTokenPrice: (id: string, currency: string) => Promise<number | null>;
}
export class CoinGeckoAPIDataSource extends HTTPDataSource {
    static baseURL: "https://api.coingecko.com/api/v3/";
    constructor();
    getTokenPrice<ID extends string, CODE extends string>(id: ID, currency: CODE): Promise<number | null>;
}
export class TokenContractDataSource implements TokenDataSource {
    address: string;
    apiDataSource: TokenAPIDataSource;
    erc20DataSource: ContractDataSource<ERC20>;
    constructor(address: string, provider: providers.Provider, options?: {
        apiDataSource?: TokenAPIDataSource;
        erc20DataSource?: ContractDataSource<ERC20>;
    });
    getSymbol(): Promise<string>;
    getDecimals(): Promise<number>;
    getName(): Promise<string>;
    getPrice(currency: string): Promise<number | null>;
    getAllowance(owner: string, spender: string): Promise<string>;
    getBalanceOf(address: string): Promise<string>;
}
export interface YieldSourceDataSource {
    address: string;
    getName: () => Promise<string>;
}
export class UnknownYieldSourceDataSource extends CachedDataSource implements YieldSourceDataSource {
    address: string;
    constructor(address: string);
    getName(): Promise<string>;
}
export class ERC4626ContractDataSource extends ContractDataSource<ERC4626> implements YieldSourceDataSource {
    constructor(address: string, provider: providers.Provider);
    getName(): Promise<string>;
}
export class Token {
    address: string;
    context: ElementContext;
    dataSource: TokenDataSource;
    constructor(address: string, context: ElementContext, dataSource?: TokenDataSource);
    getSymbol(): Promise<string>;
    getDecimals(): Promise<number>;
    getName(): Promise<string>;
    getPrice(currency: string): Promise<number | null>;
    getAllowance(owner: string, spender: string): Promise<string>;
    getBalanceOf(address: string): Promise<string>;
}
export class YieldSource {
    address: string;
    context: ElementContext;
    dataSource: YieldSourceDataSource;
    constructor(address: string, context: ElementContext, dataSource?: YieldSourceDataSource);
    getName(): Promise<string>;
}
declare class PrincipalToken {
    id: number;
    context: ElementContext;
    term: Term;
    maturityDate: Date;
    constructor(id: number, context: ElementContext, term: Term);
    getBaseAsset(): Promise<Token>;
    getSymbol(): Promise<string>;
    getDecimals(): Promise<number>;
    getName(): Promise<string>;
    getBalanceOf(address: string): Promise<string>;
}
declare class YieldToken {
    id: number;
    context: ElementContext;
    term: Term;
    maturityDate: Date;
    constructor(id: number, context: ElementContext, term: Term);
    getBaseAsset(): Promise<Token>;
    getSymbol(): Promise<string>;
    getDecimals(): Promise<number>;
    getName(): Promise<string>;
    getBalanceOf(address: string): Promise<string>;
    getAccruedInterest(): Promise<string>;
}
export class Term {
    id: number;
    context: ElementContext;
    multiTerm: MultiTerm;
    principalToken: PrincipalToken;
    maturityDate: Date;
    constructor(id: number, context: ElementContext, multiTerm: MultiTerm);
    getYieldSource(): Promise<YieldSource | null>;
    getBaseAsset(): Promise<Token>;
    tvl(atBlock: number): Promise<string>;
    createdAtBlock(): Promise<number | null>;
    getYieldToken(startTimeStamp: number): YieldToken;
}
export class MultiTerm {
    address: string;
    context: ElementContext;
    dataSource: MultiTermDataSource;
    constructor(address: string, context: ElementContext, dataSource?: MultiTermDataSource);
    getTerm(expiryTimestamp: number): Promise<Term | null>;
    getTerms(fromBlock?: number, toBlock?: number): Promise<Term[]>;
    getYieldSource(): Promise<YieldSource | null>;
    getBaseAsset(): Promise<Token>;
    getDecimals(): Promise<number>;
    getTVL(atBlock: number): Promise<string>;
    /**
     * Gets the MultiTerm's unlockedSharePrice value
     * @return {Promise<string>} The unlocked share price as a string.
     */
    getUnlockedPricePerShare(): Promise<string>;
}
export class Pool {
    id: number;
    context: ElementContext;
    multiPool: MultiPool;
    maturityDate: Date;
    constructor(id: number, context: ElementContext, multiPool: MultiPool);
    getYieldSource(): Promise<YieldSource | null>;
    getBaseAsset(): Promise<Token>;
    /**
     * Gets the bond and shares reserves for the pol.
     * @return {Promise<PoolReserves>}
     */
    getReserves(): Promise<PoolReserves>;
    /**
     * Gets the bond reserves total from the pool.
     * @return {Promise<string>} Bond reserves as a string.
     */
    getBondReserves(): Promise<string>;
    /**
     * Gets the share reserves total from the pool.
     * @return {Promise<string>} Share reserves as a string.
     */
    getShareReserves(): Promise<string>;
    shareAsset(): Promise<Token | null>;
    /**
     * Gets the pool parameters, timeStretch and mu (initial price per share).
     * @return {Promise<PoolParameters>}
     */
    getParameters(): Promise<PoolParameters>;
    /**
     * Gets principle token spot price from the pool, disregarding slippage.
     * @dev Formula source: https://github.com/element-fi/analysis/blob/83ca31c690caa168274ef5d8cd807d040d9b9f59/scripts/PricingModels2.py#L500
     * @return {Promise<string>} Principle token spot price.
     */
    getSpotPrice(): Promise<string>;
}
export class MultiPool {
    address: string;
    context: ElementContext;
    dataSource: MultiPoolDataSource;
    constructor(address: string, context: ElementContext, dataSource?: MultiPoolDataSource);
    getPool(expiry: number): Promise<Pool | null>;
    getPools(fromBlock?: number, toBlock?: number): Promise<Pool[]>;
    getMultiTerm(): Promise<MultiTerm>;
    getYieldSource(): Promise<YieldSource | null>;
    getBaseAsset(): Promise<Token>;
    /**
     * Gets the pool reserves
     * @param {number} expiry - the pool id
     * @return {Promise<PoolReserves>} pool reserves.
     */
    getPoolReserves(expiry: number): Promise<PoolReserves>;
    /**
     * Gets the pool parameters
     * @param {number} expiry - the pool id
     * @return {Promise<PoolParameters>} pool parameters.
     */
    getPoolParameters(expiry: number): Promise<PoolParameters>;
}
/**
 * A method to buy yield tokens.  Unclear at this point if this is simply performing the internal flashloan to perform a YTC.
 * @param tokenAddress
 * @param vaultAddress
 * @param amount
 * @param signer
 * @param overrides
 * @returns
 */
export function buyYieldTokens(tokenAddress: string, vaultAddress: string, amount: BigNumberish, signer: Signer, overrides?: Overrides): Promise<ContractTransaction>;
/**
 * calculates a trade of prinicipal tokens
 * this is likely to get a lot more complicated with swap kinds, exact in, exact out etc
 * @param tokenAmountsIn
 * @param tokenReserves
 * @returns
 */
export function calcSwapConvergentCurvePool(tokenAmountsIn: BigNumberish[], tokenReserves: BigNumberish[]): string;
/**
 * calculates an amount of LP tokens out for an amount of asset provided.  could be single sided or double sided.
 * this one is likely to get a lot more complicated.  there could be join kinds like exact amount in, exact amount out etc.
 * @param tokenAmountsIn
 * @param tokenReserves
 * @returns
 */
export function calculateLPTokensOut(tokenAmountsIn: BigNumberish[], tokenReserves: BigNumberish[]): string;
/**
 * A function to provide liquidity to a v2 term
 * @param tokensInAddresses
 * @param amounts
 * @param vaultAddress
 * @param slippage
 * @param signer
 * @param overrides
 * @returns
 */
export function provideLiquidity(amounts: BigNumberish[], tokensInAddresses: string[], vaultAddress: string, slippage: BigNumberish, signer: Signer, overrides?: Overrides): Promise<ContractTransaction>;
/**
 * redeem liquidity after the term is mature to the underlying
 * @param amount
 * @param poolAddress
 * @param signer
 * @param overrides
 * @returns
 */
export function redeemLiquidity(amount: BigNumberish, poolAddress: string, signer: Signer, overrides?: Overrides): Promise<ContractTransaction>;
/**
 * performs a trade of principal tokens on a v2 pool
 * this is likely to get a lot more complicated with swap kinds, exact in, exact out etc
 * @param tokenInAddress
 * @param tokenOutAddress
 * @param vaultAddress
 * @param amount
 * @param slippage
 * @param signer
 * @param overrides
 * @returns
 */
export function tradePrincipalTokens(amount: BigNumberish, tokenInAddress: string, tokenOutAddress: string, vaultAddress: string, slippage: BigNumberish, signer: Signer, overrides?: Overrides): Promise<ContractTransaction>;
/**
 * withdraw liquidity before the term is expired to underlying and pts
 * @param amount
 * @param poolAddress
 * @param signer
 * @param overrides
 * @returns
 */
export function withdrawLiquidity(amount: BigNumberish, poolAddress: string, signer: Signer, overrides?: Overrides): Promise<ContractTransaction>;

//# sourceMappingURL=main.d.ts.map
