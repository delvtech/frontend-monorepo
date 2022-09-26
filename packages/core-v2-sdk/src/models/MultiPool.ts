import { ElementContext } from "src/context";
import { MultiPoolContractDataSource } from "src/datasources/MultiPool/MultiPoolContractDataSource";
import { MultiPoolDataSource } from "src/datasources/MultiPool/MultiPoolDataSource";
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

  async getPool(expiryTimestamp: number): Promise<Pool | null> {
    // TODO: should this validate that the pool exists?
    return new Pool(expiryTimestamp, this.context, this);
  }

  async getPools(fromBlock?: number, toBlock?: number): Promise<Pool[]> {
    const poolIds = await this.dataSource.getPoolIds(fromBlock, toBlock);
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
}
