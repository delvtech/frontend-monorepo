import { ElementContext } from "src/context";
import { PoolParameters, PoolReserves } from "src/types";
import { getCurrentBlockTimestamp } from "src/utils/ethereum/getCurrentBlockNumber";
import { LPToken } from "./LPToken";
import { MultiPool } from "./MultiPool";
import { Token } from "./Token";
import { YieldSource } from "./YieldSource";

/**
 * Pool model class.
 */
export class Pool {
  id: number;
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
  constructor(id: number, context: ElementContext, multiPool: MultiPool) {
    this.id = id;
    this.context = context;
    this.multiPool = multiPool;
    this.lpToken = new LPToken(id, context, this);
    this.maturityDate = new Date(id * 1000);
  }

  /**
   * @async
   * Gets yield source for this pool.
   * @return {Promise<YieldSource | null>}
   */
  getYieldSource(): Promise<YieldSource | null> {
    return this.multiPool.getYieldSource();
  }

  /**
   * @async
   * Gets the base asset for this pool.
   * @return {Promise<Token>}
   */
  getBaseAsset(): Promise<Token> {
    return this.multiPool.getBaseAsset();
  }

  /**
   * @async
   * Gets the bond and shares reserves for the pool.
   * @return {Promise<PoolReserves>}
   */
  async getReserves(): Promise<PoolReserves> {
    return await this.multiPool.getPoolReserves(this.id);
  }

  /**
   * @async
   * Gets the bond reserves total from the pool.
   * @return {Promise<string>} Bond reserves as a string.
   */
  async getBondReserves(): Promise<string> {
    const { bonds } = await this.getReserves();
    return bonds;
  }

  /**
   * @async
   * Gets the share reserves total from the pool.
   * @return {Promise<string>} Share reserves as a string.
   */
  async getShareReserves(): Promise<string> {
    const { shares } = await this.getReserves();
    return shares;
  }

  /**
   * Gets the share asset of this pool.
   * @async
   * @return {Promise<Token | null>}
   */
  async getShareAsset(): Promise<Token | null> {
    const yieldSource = await this.getYieldSource();
    if (!yieldSource) {
      return null;
    }
    return new Token(yieldSource.address, this.context);
  }

  /**
   * @async
   * Gets the pool parameters, timeStretch and mu (initial price per share).
   * @return {Promise<PoolParameters>}
   */
  async getParameters(): Promise<PoolParameters> {
    return await this.multiPool.getPoolParameters(this.id);
  }

  /**
   * Gets principal token spot price from the pool, disregarding slippage, denominated in the base asset.
   * @see {@link https://github.com/element-fi/analysis/blob/83ca31c690caa168274ef5d8cd807d040d9b9f59/scripts/PricingModels2.py#L500} for formula source.
   * @return {Promise<string>} Principle token spot price.
   */
  async getSpotPrice(): Promise<string> {
    // fetch reserves
    const reserves = await this.getReserves();

    // cast to number
    const bonds = +reserves.bonds;
    const shares = +reserves.shares;

    const totalSupply = bonds + shares;

    // calculate seconds until expiry
    const currentBlockTimestamp = await getCurrentBlockTimestamp(
      this.context.provider,
    );
    const secondsUntilExpiry = this.id - currentBlockTimestamp;
    const daysUntilExpiry = secondsUntilExpiry / 86400;

    // pool parameters
    const parameters = await this.getParameters();
    const mu = +parameters.mu;
    const timeStretch = +parameters.timeStretch;

    // price per share
    const term = await this.multiPool.getMultiTerm();
    const pricePerShare = +(await term.getUnlockedPricePerShare());
    const tParam = daysUntilExpiry / (365 * timeStretch);

    const denom =
      (((bonds + totalSupply) * pricePerShare) / (shares * mu)) ** tParam;
    return (1 / denom).toString();
  }

  /**
   * Gets the TVL for this pool, denominated in the base asset.
   * @async
   * @return {Promise<string>} tvl represented as a string.
   */
  async getTVL(): Promise<string> {
    // bond price in terms of underlying
    const bondPrice = await this.getSpotPrice();
    const sharePrice = await (
      await this.multiPool.getMultiTerm()
    ).getUnlockedPricePerShare();
    const { bonds, shares } = await this.getReserves();
    const tvl = +bondPrice * +bonds + +shares * +sharePrice;
    return tvl.toString();
  }
}
