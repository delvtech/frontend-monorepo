import { ElementContext } from "src/context";
import { Term } from "./Term";
import { Token } from "./Token";

export class PrincipalToken {
  id: string;
  context: ElementContext;
  term: Term;
  maturityDate: Date;

  constructor(context: ElementContext, term: Term) {
    this.id = term.id;
    this.context = context;
    this.term = term;
    this.maturityDate = term.maturityDate;
  }

  async getBaseAsset(): Promise<Token> {
    return this.term.getBaseAsset();
  }

  async getSymbol(): Promise<string> {
    return this.term.multiTerm.dataSource.getSymbol(this.id);
  }

  async getDecimals(): Promise<number> {
    return this.term.multiTerm.getDecimals();
  }

  async getName(): Promise<string> {
    return this.term.multiTerm.dataSource.getName(this.id);
  }

  async getBalanceOf(address: string): Promise<string> {
    return this.term.multiTerm.dataSource.getBalanceOf(this.id, address);
  }
}
