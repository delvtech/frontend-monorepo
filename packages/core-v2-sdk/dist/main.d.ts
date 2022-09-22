import { providers, BigNumberish, ContractTransaction, Overrides, Signer } from "ethers";
import LRUCache from "lru-cache";
import { ERC4626, ERC4626Term, Pool as _Pool1 } from "@elementfi/core-v2-typechain";
export interface YieldSourceDataSource {
    address: string;
    getName: () => Promise<string>;
}
export interface MultiTermDataSource {
    address: string;
    yieldSource: YieldSourceDataSource;
}
export interface MultiPoolDataSource {
    address: string;
    multiTerm: MultiTermDataSource;
}
interface CoreV2Context {
    chainId: number;
    provider: providers.BaseProvider;
    multiPools: MultiPoolDataSource[];
    expiryTimestamps: number[];
}
export interface TokenFields {
    address: string;
    symbol: string;
    decimals: number;
    name: string;
    price: string;
}
export class Token {
    address: string;
    symbol: string;
    decimals: number;
    name: string;
    price: string;
    constructor({ address, symbol, decimals, name, price }: TokenFields);
}
export interface PrincipalTokenFields extends TokenFields {
    tokenId: string;
    maturity: string;
    pool: Pool;
    baseAsset: Token;
}
export class PrincipalToken extends Token {
    constructor(fields: PrincipalTokenFields);
}
export enum Protocol {
    YEARN = "Yearn"
}
export interface YieldSourceOptions {
    address: string;
}
export class YieldSource {
    address: string;
    constructor({ address }: YieldSourceOptions);
}
export interface PoolFields {
    id: string;
    multiPool: MultiPool;
    maturity: string;
    yieldSource: YieldSource;
    baseAsset: Token;
    baseAssetReserves: string;
    shareAsset: Token;
    shareAssetReserves: string;
    principalToken: PrincipalToken;
    principalTokenReserves: string;
    lpToken: Token;
    price: string;
    priceFiat: string;
    term: Term;
    tvl: string;
}
export class Pool {
    id: string;
    multiPool: MultiPool;
    maturity: string;
    yieldSource: YieldSource;
    baseAsset: Token;
    baseAssetReserves: string;
    shareAsset: Token;
    shareAssetReserves: string;
    principalToken: PrincipalToken;
    principalTokenReserves: string;
    lpToken: Token;
    price: string;
    priceFiat: string;
    term: Term;
    tvl: string;
    constructor({ id, multiPool, maturity, yieldSource, baseAsset, baseAssetReserves, shareAsset, shareAssetReserves, principalToken, principalTokenReserves, lpToken, price, priceFiat, term, tvl, }: PoolFields);
}
export interface TermFields {
    id: string;
    multiTerm: MultiTerm;
    name: string;
    maturity: string;
    yieldSource: YieldSource;
    baseAsset: Token;
    principalToken: PrincipalToken;
    pool: Pool;
    createdTimestamp: number;
    createdAtBlock: number;
    variableAPY: number;
    fixedAPR: number;
}
export class Term {
    id: string;
    multiTerm: MultiTerm;
    name: string;
    maturity: string;
    yieldSource: YieldSource;
    baseAsset: Token;
    principalToken: PrincipalToken;
    pool: Pool;
    createdTimestamp: number;
    createdAtBlock: number;
    variableAPY: number;
    fixedAPR: number;
    constructor({ id, multiTerm, name, maturity, yieldSource, baseAsset, principalToken, pool, createdTimestamp, createdAtBlock, variableAPY, fixedAPR, }: TermFields);
}
export interface MultiTermFields {
    address: string;
    yieldSource: YieldSource;
}
export class MultiTerm {
    address: string;
    yieldSource: YieldSource;
    constructor({ address, yieldSource, }: MultiTermFields);
}
export interface MultiPoolFields {
    address: string;
    multiTerm: MultiTerm;
}
export class MultiPool {
    address: string;
    multiTerm: MultiTerm;
    constructor({ address, multiTerm }: MultiPoolFields);
}
interface Getter<T> {
    client: ElementClient;
    get: (...args: any[]) => T | Promise<T>;
    getAll: (...args: any[]) => T[] | Promise<NonNullable<T>[]>;
}
declare class MultiPoolGetter implements Getter<MultiPool | null> {
    client: ElementClient;
    cache: LRUCache<string, any>;
    constructor(client: ElementClient);
    get(address: string): MultiPool | null;
    getAll(): MultiPool[];
}
declare class MultiTermGetter implements Getter<MultiTerm | null> {
    client: ElementClient;
    cache: LRUCache<string, any>;
    constructor(client: ElementClient);
    get(address: string): MultiTerm | null;
    getAll(): MultiTerm[];
}
declare class YieldSourceGetter implements Getter<YieldSource | null> {
    client: ElementClient;
    constructor(client: ElementClient);
    get(address: string): YieldSource | null;
    getAll(): YieldSource[];
}
export class ElementClient {
    context: CoreV2Context;
    multiPools: MultiPoolGetter;
    multiTerms: MultiTermGetter;
    yieldSources: YieldSourceGetter;
    constructor(context: CoreV2Context);
}
interface ERC4626ContractDataSourceOptions {
    address: string;
    provider: providers.BaseProvider;
}
export class ERC4626ContractDataSource implements YieldSourceDataSource {
    address: string;
    contract: ERC4626;
    cache: LRUCache<string, any>;
    constructor({ address, provider }: ERC4626ContractDataSourceOptions);
    getName(): Promise<string>;
}
interface ERC4626TermContractDataSourceOptions {
    address: string;
    provider: providers.BaseProvider;
    /**
     * A YieldSourceDataSource instance or the address of an ERC4626 vault
     */
    yieldSource: YieldSourceDataSource | string;
}
export class ERC4626TermContractDataSource implements MultiTermDataSource {
    address: string;
    contract: ERC4626Term;
    yieldSource: YieldSourceDataSource;
    cache: LRUCache<string, any>;
    constructor({ address, provider, yieldSource, }: ERC4626TermContractDataSourceOptions);
    getYieldSourceAddress(): Promise<string>;
}
interface MultiPoolContractDataSourceOptions {
    address: string;
    provider: providers.BaseProvider;
    multiTerm: MultiTermDataSource;
}
export class MultiPoolContractDataSource implements MultiPoolDataSource {
    address: string;
    contract: _Pool1;
    multiTerm: MultiTermDataSource;
    cache: LRUCache<string, any>;
    constructor({ address, provider, multiTerm, }: MultiPoolContractDataSourceOptions);
    static createERC4626MultiPool(address: string, provider: providers.BaseProvider): Promise<MultiPoolContractDataSource>;
}
export interface YieldTokenFields extends TokenFields {
    tokenId: string;
    startDate: string;
    maturity: string;
    pool: Pool;
    accruedInterest: string;
}
export class YieldToken extends Token {
    constructor(fields: YieldTokenFields);
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
