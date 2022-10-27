import { ElementContext } from "src/context";
import { Pool } from "./Pool";
import { Token } from "./Token";

export class LPToken {
  id: string;
  context: ElementContext;
  pool: Pool;
  maturityDate: Date;

  constructor(context: ElementContext, pool: Pool) {
    this.id = pool.id;
    this.context = context;
    this.pool = pool;
    this.maturityDate = pool.maturityDate;
  }

  async getBaseAsset(): Promise<Token> {
    return this.pool.getBaseAsset();
  }

  async getSymbol(): Promise<string> {
    return this.pool.multiPool.dataSource.getSymbol(this.id);
  }

  async getDecimals(): Promise<number> {
    return this.pool.multiPool.getDecimals();
  }

  async getName(): Promise<string> {
    return this.pool.multiPool.dataSource.getName(this.id);
  }

  async getBalanceOf(address: string): Promise<string> {
    return this.pool.multiPool.dataSource.getBalanceOf(this.id, address);
  }
}
