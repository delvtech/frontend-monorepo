import { ElementContext } from "src/context";
import { decodeTokenId } from "src/utils/token/decodeTokenId";
import { encodeTokenId } from "src/utils/token/encodeTokenId";
import { Term } from "./Term";
import { Token } from "./Token";

export class YieldToken {
  id: string;
  context: ElementContext;
  term: Term;
  maturityDate: Date;

  constructor(startTime: number, context: ElementContext, term: Term) {
    const { maturity } = decodeTokenId(term.id);
    this.id = encodeTokenId(maturity, startTime, true);
    this.context = context;
    this.term = term;
    this.maturityDate = new Date(+term.id * 1000);
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
