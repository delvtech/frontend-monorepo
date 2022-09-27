import { ElementContext } from "src/context";
import { PoolParameters, PoolReserves } from "src/types";
import { getCurrentBlockTimestamp } from "src/utils/ethereum/getCurrentBlockNumber";
import { MultiPool } from "./MultiPool";
import { Token } from "./Token";
import { YieldSource } from "./YieldSource";

export class Pool {
  id: number;
  context: ElementContext;
  multiPool: MultiPool;
  maturityDate: Date;

  constructor(id: number, context: ElementContext, multiPool: MultiPool) {
    this.id = id;
    this.context = context;
    this.multiPool = multiPool;
    this.maturityDate = new Date(id + 1000);
  }

  getYieldSource(): Promise<YieldSource | null> {
    return this.multiPool.getYieldSource();
  }

  getBaseAsset(): Promise<Token> {
    return this.multiPool.getBaseAsset();
  }

  /**
   * Gets the bond and shares reserves for the pol.
   * @return {Promise<PoolReserves>}
   */
  async getReserves(): Promise<PoolReserves> {
    return await this.multiPool.getPoolReserves(this.id);
  }

  /**
   * Gets the bond reserves total from the pool.
   * @return {Promise<string>} Bond reserves as a string.
   */
  async getBondReserves(): Promise<string> {
    const { bonds } = await this.getReserves();
    return bonds;
  }

  /**
   * Gets the share reserves total from the pool.
   * @return {Promise<string>} Share reserves as a string.
   */
  async getShareReserves(): Promise<string> {
    const { shares } = await this.getReserves();
    return shares;
  }

  async shareAsset(): Promise<Token | null> {
    const yieldSource = await this.getYieldSource();
    if (!yieldSource) {
      return null;
    }
    return new Token(yieldSource.address, this.context);
  }

  /**
   * Gets the pool parameters, timeStretch and mu (initial price per share).
   * @return {Promise<PoolParameters>}
   */
  async getParameters(): Promise<PoolParameters> {
    return await this.multiPool.getPoolParameters(this.id);
  }

  /**
   * Gets principle token spot price from the pool, disregarding slippage.
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

    console.log("pool parameters ", parameters);
    console.log("term price per share ", pricePerShare);
    console.log("bond reserves ", bonds);
    console.log("share reserves ", shares);
    console.log("t", tParam);

    console.log(((shares + totalSupply) * pricePerShare) / (bonds * mu));
    console.log(
      ((pricePerShare * (shares + totalSupply)) / (bonds * mu)) ** tParam,
    );

    const denom =
      (((shares + totalSupply) * pricePerShare) / (bonds * mu)) ** tParam;
    return (1 / denom).toString();
  }
}
