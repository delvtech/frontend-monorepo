import { providers, BaseContract, Signer, Wallet, BigNumberish, ContractTransaction, Overrides } from "ethers";
import LRUCache from "lru-cache";
import { Pool as _Pool1, Term as _Term1, ERC4626Term, CompoundV3Term, ERC20, ERC4626 } from "@elementfi/core-v2-typechain";
import { TransferSingleEvent } from "@elementfi/core-v2-typechain/dist/contracts/Term";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
export interface DataSource extends Record<string, any> {
}
export interface ElementContextOptions {
    chainId: number;
    provider?: providers.Provider;
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
interface MintResponse {
    principalTokens: string;
    yieldTokens: string;
}
export interface MultiPoolDataSource {
    address: string;
    getPoolIds: (fromBlock?: number, toBlock?: number) => Promise<string[]>;
    getMultiTerm: () => Promise<string>;
    getPoolReserves: (poolId: string) => Promise<PoolReserves>;
    getPoolParameters: (poolId: string) => Promise<PoolParameters>;
    getBaseAsset: () => Promise<string>;
    getSymbol: (poolId: string) => Promise<string>;
    getDecimals: () => Promise<number>;
    getName: (poolId: string) => Promise<string>;
    getBalanceOf: (poolId: string, address: string) => Promise<string>;
}
export class MultiPoolContractDataSource extends ContractDataSource<_Pool1> implements MultiPoolDataSource {
    constructor(address: string, provider: providers.Provider);
    getPoolIds(fromBlock?: number, toBlock?: number): Promise<string[]>;
    getMultiTerm(): Promise<string>;
    /**
     * Fetches and caches the pool reserves from our datasource (contract).
     * @notice This function returns reserves as string representation of a fixed point number.
     * @param {string} poolId - the pool id (expiry)
     * @return {Promise<PoolReserves>}
     */
    getPoolReserves(poolId: string): Promise<PoolReserves>;
    /**
     * Fetches and caches the pool parameters from our datasource (contract).
     * @notice This function also handles converting the pool parameters from a fixed point number.
     * @param {string} poolId - the pool id (expiry)
     * @return {Promise<PoolParameters>}
     */
    getPoolParameters(poolId: string): Promise<PoolParameters>;
    /**
     * Fetches the base asset address from our datasource (contract).
     */
    getBaseAsset(): Promise<string>;
    /**
     * Fetches the symbol for a given poolId from our datasource (contract).
     */
    getSymbol(poolId: string): Promise<string>;
    /**
     * Fetches the number of decimals used by tokens in our datasource (contract).
     */
    getDecimals(): Promise<number>;
    /**
     * Fetches the name for a given poolId from our datasource (contract).
     */
    getName(poolId: string): Promise<string>;
    /**
     * Fetches an address's balance of a given poolId from our datasource (contract).
     */
    getBalanceOf(poolId: string, address: string): Promise<string>;
}
export interface MultiTermDataSource {
    address: string;
    getTermIds: (fromBlock?: number, toBlock?: number) => Promise<string[]>;
    getCreatedAtBlock: (tokenId: string) => Promise<number | null>;
    getYieldSource: () => Promise<string | null>;
    getBaseAsset: () => Promise<string>;
    getSymbol: (tokenId: string) => Promise<string>;
    getDecimals: () => Promise<number>;
    getName: (tokenId: string) => Promise<string>;
    getBalanceOf: (tokenId: string, address: string) => Promise<string>;
    getUnlockedPricePerShare: () => Promise<string>;
    getTotalSupply: (tokenId: string) => Promise<string>;
    lock: (signer: Signer, termId: string, assetIds: string[], assetAmounts: string[], amount: string, ptDestination: string, ytDestination: string, ytBeginDate: number, hasPreFunding: boolean) => Promise<MintResponse>;
}
export class MultiTermContractDataSource extends ContractDataSource<_Term1> implements MultiTermDataSource {
    constructor(address: string, provider: providers.Provider);
    getTransferEvents(from?: string | null, to?: string | null, fromBlock?: number, toBlock?: number): Promise<TransferSingleEvent[]>;
    /**
     * Gets all terms that have been created from the datasource (contract).
     * @param {number} fromBlock - Optional, start block number to search from.
     * @param {number} toBlock - Optional, end block number to search to.
     * @return {Promise<string[]>} A promise of an array of unique term ids.
     */
    getTermIds(fromBlock?: number, toBlock?: number): Promise<string[]>;
    getCreatedAtBlock(tokenId: string): Promise<number | null>;
    getYieldSource(): Promise<null>;
    getBaseAsset(): Promise<string>;
    getSymbol(tokenId: string): Promise<string>;
    getDecimals(): Promise<number>;
    getName(tokenId: string): Promise<string>;
    getBalanceOf(tokenId: string, address: string): Promise<string>;
    /**
     * Fetches and caches the terms unlockedSharePrice value from our datasource (contract).
     * @notice This function converts the sharePrice from a fixed point number.
     * @return {Promise<string>} The unlocked share price as a string.
     */
    getUnlockedPricePerShare(): Promise<string>;
    /**
     * Gets the total supply of a certain token.
     * @param {string} tokenId - the token id (expiry)
     * @return {Promise<string>} total supply represented as a string
     */
    getTotalSupply(tokenId: string): Promise<string>;
    /**
     * Wraps the lock function in the Term contract, allows caller to mint fixed and variable positions in a term.
     * @async
     * @param {Signer} signer - Ethers signer object.
     * @param {string[]} assetIds -  The array of PT, YT and Unlocked share identifiers.
     * @param {string[]} assetAmounts - The amount of each input PT, YT and Unlocked share to use
     * @param {string} termId - The term id (expiry).
     * @param {BigNumber} amount - Amount of underlying tokens to use to mint.
     * @param {string} ptDestination - Address to receive principal tokens.
     * @param {string} ytDestination - Address to receive yield tokens.
     * @param {string} hasPreFunding- Have any funds already been sent to the contract, not commonly used for EOAs.
     * @return {Promise<MintResponse>}
     */
    lock(signer: Signer, termId: string, assetIds: string[], assetAmounts: string[], amount: string, ptDestination: string, ytDestination: string, ytBeginDate: number, hasPreFunding: boolean): Promise<MintResponse>;
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
export class PrincipalToken {
    id: string;
    context: ElementContext;
    term: Term;
    maturityDate: Date;
    constructor(context: ElementContext, term: Term);
    getBaseAsset(): Promise<Token>;
    getSymbol(): Promise<string>;
    getDecimals(): Promise<number>;
    getName(): Promise<string>;
    getBalanceOf(address: string): Promise<string>;
}
export class YieldToken {
    id: string;
    context: ElementContext;
    term: Term;
    maturityDate: Date;
    constructor(startTime: number, context: ElementContext, term: Term);
    getBaseAsset(): Promise<Token>;
    getSymbol(): Promise<string>;
    getDecimals(): Promise<number>;
    getName(): Promise<string>;
    getBalanceOf(address: string): Promise<string>;
    getAccruedInterest(): Promise<string>;
}
export class Term {
    id: string;
    guid: string;
    context: ElementContext;
    multiTerm: MultiTerm;
    principalToken: PrincipalToken;
    maturityDate: Date;
    constructor(id: string, context: ElementContext, multiTerm: MultiTerm);
    getYieldSource(): Promise<YieldSource | null>;
    getBaseAsset(): Promise<Token>;
    /**
     * Gets the TVL of this term, in terms of the underlying token
     * @todo Does not account for accrued interest, need access to _underlying(ShareState.locked)
     * @param {number} termId - the term id (expiry)
     * @return {Promise<string>} total supply represented as a string as a decimal number
     */
    getTVL(): Promise<string>;
    getCreatedAtBlock(): Promise<number | null>;
    getYieldToken(startTime: number): YieldToken;
    /**
     * Convenience method that mints fixed and variable positions in a term using underlying tokens.
     * This function assumes the token receiver is the signer address and the destination for both token positions are the same.
     * @async
     * @param {Signer} signer - Ethers signer object.
     * @param {string} amount - Amount of underlying tokens to use to mint.
     * @return {Promise<MintResponse>}
     */
    mint(signer: SignerWithAddress | Wallet, amount: string): Promise<MintResponse>;
}
/**
 * MultiTerm model class.
 * @class
 */
export class MultiTerm {
    address: string;
    context: ElementContext;
    dataSource: MultiTermDataSource;
    constructor(address: string, context: ElementContext, dataSource?: MultiTermDataSource);
    /**
     * Gets a Term by the termId from this MultiTerm.
     * @param {string} termId - the termId
     * @return {Term}
     */
    getTerm(termId: string): Term;
    /**
     * Gets all the Terms from this MultiTerm. Searches by TransferSingleEvents.
     * @async
     * @param {number} fromBlock - Optional, start block number to search from.
     * @param {number} toBlock - Optional, end block number to search to.
     * @return {Promise<Term[]>}
     */
    getTerms(fromBlock?: number, toBlock?: number): Promise<Term[]>;
    /**
     * Gets the yield source this MultiTerm deposits into.
     * @async
     * @function getYieldSource
     * @return {Promise<YieldSource | null>}
     */
    getYieldSource(): Promise<YieldSource | null>;
    /**
     * Gets the base asset as a Token model.
     * @async
     * @function getBaseAsset
     * @return {Promise<Token>} ERC20 token.
     */
    getBaseAsset(): Promise<Token>;
    /**
     * Gets the number of decimals used by this MultiTerm.
     * @async
     * @return {Promise<number>} The number of decimals.
     */
    getDecimals(): Promise<number>;
    /**
     * Gets the TVL for the MultiTerm contract, the sum of all term TVLs.
     * @async
     * @return {Promise<string>} TVL represented as a string in terms of underlying.
     */
    getTVL(): Promise<string>;
    /**
     * Gets the MultiTerm's unlockedSharePrice value
     * @async
     * @return {Promise<string>} The unlocked share price as a string.
     */
    getUnlockedPricePerShare(): Promise<string>;
}
/**
 * MultiPool model class.
 * @class
 */
export class MultiPool {
    address: string;
    context: ElementContext;
    dataSource: MultiPoolDataSource;
    /**
     * Create a MultiPool model.
     * @param {string} address - MultiPool contract address
     * @param {ElementContext} context - Context object for the sdk.
     * @param {MultiPoolDataSource} dataSource - Optional custom datasource for this model. Defaults to {@link MultiPoolContractDataSource}
     */
    constructor(address: string, context: ElementContext, dataSource?: MultiPoolDataSource);
    /**
     * Gets a Pool by the poolId from this MultiPool.
     * @param {string} poolId - the poolId
     * @return {Pool}
     */
    getPool(poolId: string): Pool;
    /**
     * Gets all the Pools from this MultiPool. Searches by PoolRegisteredEvents.
     * @async
     * @param {number} fromBlock - Optional, start block number to search from.
     * @param {number} toBlock - Optional, end block number to search to.
     * @return {Promise<Pool[]>}
     */
    getPools(fromBlock?: number, toBlock?: number): Promise<Pool[]>;
    /**
     * Gets the associated MultiTerm model.
     * @async
     * @return {Promise<MultiTerm>}
     */
    getMultiTerm(): Promise<MultiTerm>;
    /**
     * Gets the yield source the associated MultiTerm contract deposits into.
     * @async
     * @function getYieldSource
     * @return {Promise<YieldSource | null>}
     */
    getYieldSource(): Promise<YieldSource | null>;
    /**
     * Gets the base asset from the associated MultiTerm contract.
     * @async
     * @function getBaseAsset
     * @return {Promise<Token>} ERC20 token.
     */
    getBaseAsset(): Promise<Token>;
    /**
     * Gets the number of decimals used by this Multi Pool
     */
    getDecimals(): Promise<number>;
    /**
     * Gets the pool reserves
     * @async
     * @param {string} poolId - the pool id
     * @return {Promise<PoolReserves>} pool reserves.
     */
    getPoolReserves(poolId: string): Promise<PoolReserves>;
    /**
     * Gets the pool parameters
     * @param {string} poolId - the pool id
     * @return {Promise<PoolParameters>} pool parameters.
     */
    getPoolParameters(poolId: string): Promise<PoolParameters>;
}
/**
 * Pool model class.
 */
export class Pool {
    id: string;
    guid: string;
    context: ElementContext;
    multiPool: MultiPool;
    lpToken: LPToken;
    maturityDate: Date;
    /**
     * Creates a Pool model.
     * @param {number} id - the pool id (expiry)
     * @param {ElementContext} context - Context object for the sdk.
     * @param {MultiPool} multiPool - the MultiPool model where this pool is stored.
     */
    constructor(id: string, context: ElementContext, multiPool: MultiPool);
    /**
     * Gets the associated MultiTerm model for this pool.
     * @return {Promise<MultiTerm>}
     */
    getMultiTerm(): Promise<MultiTerm>;
    /**
     * @async
     * Gets the associated Term model for this pool.
     * @return {Promise<Term>}
     */
    getTerm(): Promise<Term>;
    /**
     * @async
     * Gets yield source for this pool.
     * @return {Promise<YieldSource | null>}
     */
    getYieldSource(): Promise<YieldSource | null>;
    /**
     * @async
     * Gets the base asset for this pool.
     * @return {Promise<Token>}
     */
    getBaseAsset(): Promise<Token>;
    /**
     * @async
     * Gets the bond and shares reserves for the pool.
     * @return {Promise<PoolReserves>}
     */
    getReserves(): Promise<PoolReserves>;
    /**
     * @async
     * Gets the bond reserves total from the pool.
     * @return {Promise<string>} Bond reserves as a string.
     */
    getBondReserves(): Promise<string>;
    /**
     * @async
     * Gets the share reserves total from the pool.
     * @return {Promise<string>} Share reserves as a string.
     */
    getShareReserves(): Promise<string>;
    /**
     * Gets the share asset of this pool.
     * @async
     * @return {Promise<Token | null>}
     */
    getShareAsset(): Promise<Token | null>;
    /**
     * @async
     * Gets the pool parameters, timeStretch and mu (initial price per share).
     * @return {Promise<PoolParameters>}
     */
    getParameters(): Promise<PoolParameters>;
    /**
     * Gets principal token spot price from the pool, disregarding slippage, denominated in the base asset.
     * @see {@link https://github.com/element-fi/analysis/blob/83ca31c690caa168274ef5d8cd807d040d9b9f59/scripts/PricingModels2.py#L500} for formula source.
     * @return {Promise<string>} Principle token spot price, denoted in base asset.
     */
    getSpotPrice(): Promise<string>;
    /**
     * Gets the TVL for this pool, denominated in the base asset.
     * @async
     * @return {Promise<string>} tvl represented as a string.
     */
    getTVL(): Promise<string>;
    /**
     * Calculates the Fixed APR of the principal token in this pool.
     * @async
     * @see {@link https://github.com/element-fi/analysis/blob/83ca31c690caa168274ef5d8cd807d040d9b9f59/scripts/PricingModels2.py#L487} for formula source.
     * @return {Promise<string>} Fixed APR represented as a string, not rounded.
     */
    getFixedAPR(): Promise<string>;
}
export class LPToken {
    id: string;
    context: ElementContext;
    pool: Pool;
    maturityDate: Date;
    constructor(context: ElementContext, pool: Pool);
    getBaseAsset(): Promise<Token>;
    getSymbol(): Promise<string>;
    getDecimals(): Promise<number>;
    getName(): Promise<string>;
    getBalanceOf(address: string): Promise<string>;
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
