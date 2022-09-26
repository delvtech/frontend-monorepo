import { ElementClient } from "src/client";
import { Term } from "./Term";
import { Token } from "./Token";

export class PrincipalToken {
  id: number;
  client: ElementClient;
  term: Term;

  constructor(id: number, client: ElementClient, term: Term) {
    this.id = id;
    this.client = client;
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
    return this.term.multiTerm.getDecimals();
  }

  async getName(): Promise<string> {
    return this.term.multiTerm.dataSource.getName(this.id);
  }

  async getBalanceOf(address: string): Promise<string> {
    return this.term.multiTerm.dataSource.getBalanceOf(this.id, address);
  }
}
