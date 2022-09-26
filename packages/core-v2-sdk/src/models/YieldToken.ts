import { ElementContext } from "src/context";
import { Term } from "./Term";
import { Token } from "./Token";

export class YieldToken {
  id: number;
  context: ElementContext;
  term: Term;

  constructor(id: number, context: ElementContext, term: Term) {
    this.id = id;
    this.context = context;
    this.term = term;
  }

  get maturity(): number {
    return this.id;
  }

  async getBaseAsset(): Promise<Token> {
    return this.term.getBaseAsset();
  }

  async getSymbol(): Promise<string> {
    return this.term.multiTerm.dataSource.getSymbol(this.id);
  }

  async getDecimals(): Promise<number> {
    return this.term.multiTerm.dataSource.getDecimals();
  }

  async getName(): Promise<string> {
    return this.term.multiTerm.dataSource.getName(this.id);
  }

  async getBalanceOf(address: string): Promise<string> {
    return this.term.multiTerm.dataSource.getBalanceOf(this.id, address);
  }

  // TODO:
  async getAccruedInterest(): Promise<string> {
    return "0";
  }
}
