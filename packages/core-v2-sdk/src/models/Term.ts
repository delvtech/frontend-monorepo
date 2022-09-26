import { ElementClient } from "src/client";
import { MultiTerm } from "./MultiTerm";
import { PrincipalToken } from "./PrincipalToken";
import { Token } from "./Token";
import { YieldSource } from "./YieldSource";
import { YieldToken } from "./YieldToken";

export class Term {
  id: number;
  client: ElementClient;
  multiTerm: MultiTerm;
  principalToken: PrincipalToken;

  constructor(id: number, client: ElementClient, multiTerm: MultiTerm) {
    this.id = id;
    this.client = client;
    this.multiTerm = multiTerm;
    this.principalToken = new PrincipalToken(id, client, this);
  }

  get maturity(): number {
    return this.id;
  }

  getYieldSource(): Promise<YieldSource | null> {
    return this.multiTerm.getYieldSource();
  }

  getBaseAsset(): Promise<Token> {
    return this.multiTerm.getBaseAsset();
  }

  // TODO:
  async tvl(atBlock: number): Promise<string> {
    return "0";
  }

  createdAtBlock(): Promise<number | null> {
    return this.multiTerm.dataSource.getCreatedAtBlock(this.id);
  }

  // TODO: How do I get the token ID with a start and end date?
  getYieldToken(startTimeStamp: number): YieldToken {
    return new YieldToken(this.id, this.client, this);
  }
}
