import { providers, BaseContract, BigNumberish, ContractTransaction, Overrides, Signer } from "ethers";
import LRUCache from "lru-cache";
import { Pool as _Pool1, Term as _Term1, ERC4626Term, CompoundV3Term, ERC20, ERC4626 } from "@elementfi/core-v2-typechain";
import { TransferSingleEvent } from "@elementfi/core-v2-typechain/dist/contracts/Term";
export interface ElementClientOptions {
    chainId: number;
    provider: providers.BaseProvider;
    dataSources?: Record<string, any>[];
}
export class ElementClient {
    chainId: number;
    provider: providers.BaseProvider;
    dataSources: Record<string, any>[];
    constructor({ chainId, provider, dataSources }: ElementClientOptions);
    getDataSource<T extends Record<string, any>>(filter: Partial<T>): T | null;
    setDataSource<T extends Record<string, any>>(filter: Partial<T>, dataSource: T): T;
}
export class CachedDataSource {
    cache: LRUCache<string, any>;
    constructor(cache?: LRUCache<string, any>);
    cached<T extends (...args: any) => any>(cacheKey: unknown, callback: T): ReturnType<T>;
}
type AnyFunction = (...args: any) => any;
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
export interface MultiPoolDataSource {
    address: string;
    getPoolIds: (fromBlock?: number, toBlock?: number) => Promise<number[]>;
    getMultiTerm: () => Promise<string>;
    getShareReserves: (tokenId: string) => Promise<string>;
    getBondReserves: (tokenId: string) => Promise<string>;
}
export class MultiPoolContractDataSource extends ContractDataSource<_Pool1> implements MultiPoolDataSource {
    constructor(address: string, provider: providers.BaseProvider);
    getPoolIds(fromBlock?: number, toBlock?: number): Promise<number[]>;
    getMultiTerm(): Promise<string>;
    getReserves(tokenId: string): Promise<{
        shares: string;
        bonds: string;
    }>;
    getShareReserves(tokenId: string): Promise<string>;
    getBondReserves(tokenId: string): Promise<any>;
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
}
export class MultiTermContractDataSource extends ContractDataSource<_Term1> implements MultiTermDataSource {
    constructor(address: string, provider: providers.BaseProvider);
    getTransferEvents(from?: string | null, to?: string | null, fromBlock?: number, toBlock?: number): Promise<TransferSingleEvent[]>;
    getTermIds(fromBlock?: number, toBlock?: number): Promise<number[]>;
    getCreatedAtBlock(tokenId: number): Promise<number | null>;
    getYieldSource(): Promise<null>;
    getBaseAsset(): Promise<string>;
    getSymbol(tokenId: number): Promise<string>;
    getDecimals(): Promise<number>;
    getName(tokenId: number): Promise<string>;
    getBalanceOf(tokenId: number, address: string): Promise<string>;
}
export class ERC4626TermContractDataSource extends MultiTermContractDataSource {
    contract: ERC4626Term;
    constructor(address: string, provider: providers.BaseProvider);
    getYieldSourceAddress(this: ContractDataSource<ERC4626Term>): Promise<string>;
}
export class CompoundV3TermContractDataSource extends MultiTermContractDataSource {
    contract: CompoundV3Term;
    constructor(address: string, provider: providers.BaseProvider);
    getYieldSourceAddress(this: ContractDataSource<CompoundV3Term>): Promise<string>;
}
export interface TokenDataSource {
    address: string;
    getSymbol: () => Promise<string>;
    getDecimals: () => Promise<number>;
    getName: () => Promise<string>;
    getPrice: (currency: string) => Promise<number>;
    getAllowance: (owner: string, spender: string) => Promise<string>;
    getBalanceOf: (address: string) => Promise<string>;
}
export interface TokenAPIDataSource {
    getTokenPrice: (id: string, currency: string) => Promise<number>;
}
export class CoinGeckoAPIDataSource extends HTTPDataSource {
    static baseURL: "https://api.coingecko.com/api/v3/";
    constructor();
    getTokenPrice<ID extends string, CODE extends string>(id: ID, currency: CODE): Promise<number>;
}
export class TokenContractDataSource implements TokenDataSource {
    address: string;
    apiDataSource: TokenAPIDataSource;
    erc20DataSource: ContractDataSource<ERC20>;
    constructor(address: string, provider: providers.BaseProvider, options?: {
        apiDataSource?: TokenAPIDataSource;
        erc20DataSource?: ContractDataSource<ERC20>;
    });
    getSymbol(): Promise<string>;
    getDecimals(): Promise<number>;
    getName(): Promise<string>;
    getPrice(currency: string): Promise<number>;
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
    constructor(address: string, provider: providers.BaseProvider);
    getName(): Promise<string>;
}
export class Token {
    address: string;
    client: ElementClient;
    dataSource: TokenDataSource;
    constructor(address: string, client: ElementClient, dataSource?: TokenDataSource);
    getSymbol(): Promise<string>;
    getDecimals(): Promise<number>;
    getName(): Promise<string>;
    getPrice(currency: string): Promise<number>;
    getAllowance(owner: string, spender: string): Promise<string>;
    getBalanceOf(address: string): Promise<string>;
}
export class YieldSource {
    address: string;
    client: ElementClient;
    dataSource: YieldSourceDataSource;
    constructor(address: string, client: ElementClient, dataSource?: YieldSourceDataSource);
    getName(): Promise<string>;
}
declare class PrincipalToken {
    id: number;
    client: ElementClient;
    term: Term;
    constructor(id: number, client: ElementClient, term: Term);
    get maturity(): number;
    getBaseAsset(): Promise<Token>;
    getSymbol(): Promise<string>;
    getDecimals(): Promise<number>;
    getName(): Promise<string>;
    getBalanceOf(address: string): Promise<string>;
}
declare class YieldToken {
    id: number;
    client: ElementClient;
    term: Term;
    constructor(id: number, client: ElementClient, term: Term);
    get maturity(): number;
    getBaseAsset(): Promise<Token>;
    getSymbol(): Promise<string>;
    getDecimals(): Promise<number>;
    getName(): Promise<string>;
    getBalanceOf(address: string): Promise<string>;
    getAccruedInterest(): Promise<string>;
}
export class Term {
    id: number;
    client: ElementClient;
    multiTerm: MultiTerm;
    principalToken: PrincipalToken;
    constructor(id: number, client: ElementClient, multiTerm: MultiTerm);
    get maturity(): number;
    getYieldSource(): Promise<YieldSource | null>;
    getBaseAsset(): Promise<Token>;
    tvl(atBlock: number): Promise<string>;
    createdAtBlock(): Promise<number | null>;
    getYieldToken(startTimeStamp: number): YieldToken;
}
export class MultiTerm {
    address: string;
    client: ElementClient;
    dataSource: MultiTermDataSource;
    constructor(address: string, client: ElementClient, dataSource?: MultiTermDataSource);
    getTerm(expiryTimestamp: number): Promise<Term | null>;
    getTerms(fromBlock?: number, toBlock?: number): Promise<Term[]>;
    getYieldSource(): Promise<YieldSource | null>;
    getBaseAsset(): Promise<Token>;
    getDecimals(): Promise<number>;
    getTVL(atBlock: number): Promise<string>;
}
export class Pool {
    id: number;
    client: ElementClient;
    multiPool: MultiPool;
    constructor(id: number, client: ElementClient, multiPool: MultiPool);
    get maturity(): number;
    getYieldSource(): Promise<YieldSource | null>;
    getBaseAsset(): Promise<Token>;
    getBaseAssetReserves(): Promise<string>;
    shareAsset(): Promise<Token | null>;
}
export class MultiPool {
    address: string;
    client: ElementClient;
    dataSource: MultiPoolDataSource;
    constructor(address: string, client: ElementClient, dataSource?: MultiPoolDataSource);
    getPool(expiryTimestamp: number): Promise<Pool | null>;
    getPools(fromBlock?: number, toBlock?: number): Promise<Pool[]>;
    getMultiTerm(): Promise<MultiTerm>;
    getYieldSource(): Promise<YieldSource | null>;
    getBaseAsset(): Promise<Token>;
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
