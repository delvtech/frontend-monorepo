import { ElementContext } from "src/context";
import { MultiPoolContractDataSource } from "src/datasources/MultiPool/MultiPoolContractDataSource";
import { MultiPoolDataSource } from "src/datasources/MultiPool/MultiPoolDataSource";
import { PoolParameters, PoolReserves } from "src/types";
import { MultiTerm } from "./MultiTerm";
import { Pool } from "./Pool";
import { Token } from "./Token";
import { YieldSource } from "./YieldSource";

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
  constructor(
    address: string,
    context: ElementContext,
    dataSource?: MultiPoolDataSource,
  ) {
    this.address = address;
    this.context = context;
    this.dataSource =
      dataSource ??
      context.registerDataSource(
        { address },
        new MultiPoolContractDataSource(address, context.provider),
      );
  }

  /**
   * Gets a Pool by the poolId from this MultiPool.
   * @param {number} poolId - the poolId
   * @return {Pool}
   */
  getPool(poolId: number): Pool {
    return new Pool(poolId, this.context, this);
  }

  /**
   * Gets all the Pools from this MultiPool. Searches by PoolRegisteredEvents.
   * @async
   * @param {number} fromBlock - Optional, start block number to search from.
   * @param {number} toBlock - Optional, end block number to search to.
   * @return {Promise<Pool[]>}
   */
  async getPools(fromBlock?: number, toBlock?: number): Promise<Pool[]> {
    const poolIds = await this.dataSource.getPoolIds(
      fromBlock,
      toBlock ?? (await this.context.provider.getBlockNumber()),
    );
    return poolIds.map((id) => new Pool(id, this.context, this));
  }

  /**
   * Gets the associated MultiTerm model.
   * @async
   * @return {Promise<MultiTerm>}
   */
  async getMultiTerm(): Promise<MultiTerm> {
    const address = await this.dataSource.getMultiTerm();
    return new MultiTerm(address, this.context);
  }

  /**
   * Gets the yield source the associated MultiTerm contract deposits into.
   * @async
   * @function getYieldSource
   * @return {Promise<YieldSource | null>}
   */
  async getYieldSource(): Promise<YieldSource | null> {
    const multiTerm = await this.getMultiTerm();
    return multiTerm.getYieldSource();
  }

  /**
   * Gets the base asset from the associated MultiTerm contract.
   * @async
   * @function getBaseAsset
   * @return {Promise<Token>} ERC20 token.
   */
  async getBaseAsset(): Promise<Token> {
    const multiTerm = await this.getMultiTerm();
    return multiTerm.getBaseAsset();
  }

  /**
   * Gets the number of decimals used by this Multi Pool
   */
  getDecimals(): Promise<number> {
    return this.dataSource.getDecimals();
  }

  /**
   * Gets the pool reserves
   * @async
   * @param {number} poolId - the pool id
   * @return {Promise<PoolReserves>} pool reserves.
   */
  async getPoolReserves(poolId: number): Promise<PoolReserves> {
    return await this.dataSource.getPoolReserves(poolId);
  }

  /**
   * Gets the pool parameters
   * @param {number} poolId - the pool id
   * @return {Promise<PoolParameters>} pool parameters.
   */
  async getPoolParameters(poolId: number): Promise<PoolParameters> {
    return await this.dataSource.getPoolParameters(poolId);
  }
}
