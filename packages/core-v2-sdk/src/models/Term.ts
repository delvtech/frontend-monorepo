import { ElementContext } from "src/context";
import { MultiTerm } from "./MultiTerm";
import { PrincipalToken } from "./PrincipalToken";
import { Token } from "./Token";
import { YieldSource } from "./YieldSource";
import { YieldToken } from "./YieldToken";

export class Term {
  id: number;
  context: ElementContext;
  multiTerm: MultiTerm;
  principalToken: PrincipalToken;

  constructor(id: number, context: ElementContext, multiTerm: MultiTerm) {
    this.id = id;
    this.context = context;
    this.multiTerm = multiTerm;
    this.principalToken = new PrincipalToken(id, context, this);
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
    return new YieldToken(this.id, this.context, this);
  }
}
