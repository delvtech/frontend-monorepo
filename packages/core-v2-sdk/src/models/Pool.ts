import { ElementContext } from "src/context";
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

  // TODO:
  async getBaseAssetReserves(): Promise<string> {
    return "0";
  }

  async shareAsset(): Promise<Token | null> {
    const yieldSource = await this.getYieldSource();
    if (!yieldSource) {
      return null;
    }
    return new Token(yieldSource.address, this.context);
  }
}