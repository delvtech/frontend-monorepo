import { ElementClient } from "src/client";
import { MultiPool } from "./MultiPool";
import { Token } from "./Token";
import { YieldSource } from "./YieldSource";

export class Pool {
  id: number;
  client: ElementClient;
  multiPool: MultiPool;

  constructor(id: number, client: ElementClient, multiPool: MultiPool) {
    this.id = id;
    this.client = client;
    this.multiPool = multiPool;
  }

  get maturity(): number {
    return this.id;
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
    return new Token(yieldSource.address, this.client);
  }
}
