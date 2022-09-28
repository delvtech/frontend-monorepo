import { ElementContext } from "src/context";
import { MultiPoolContractDataSource } from "src/datasources/MultiPool/MultiPoolContractDataSource";
import { MultiPoolDataSource } from "src/datasources/MultiPool/MultiPoolDataSource";
import { PoolParameters, PoolReserves } from "src/types";
import { MultiTerm } from "./MultiTerm";
import { Pool } from "./Pool";
import { Token } from "./Token";
import { YieldSource } from "./YieldSource";

export class MultiPool {
  address: string;
  context: ElementContext;
  dataSource: MultiPoolDataSource;

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

  async getPool(poolId: number): Promise<Pool | null> {
    // TODO: should this validate that the pool exists?
    return new Pool(poolId, this.context, this);
  }

  async getPools(fromBlock?: number, toBlock?: number): Promise<Pool[]> {
    const poolIds = await this.dataSource.getPoolIds(
      fromBlock,
      toBlock ?? (await this.context.provider.getBlockNumber()),
    );
    return poolIds.map((id) => new Pool(id, this.context, this));
  }

  async getMultiTerm(): Promise<MultiTerm> {
    const address = await this.dataSource.getMultiTerm();
    return new MultiTerm(address, this.context);
  }

  async getYieldSource(): Promise<YieldSource | null> {
    const multiTerm = await this.getMultiTerm();
    return multiTerm.getYieldSource();
  }

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
