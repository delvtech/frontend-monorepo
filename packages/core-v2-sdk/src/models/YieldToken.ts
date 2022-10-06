import { ElementContext } from "src/context";
import { Term } from "./Term";
import { Token } from "./Token";

export class YieldToken {
  id: string;
  context: ElementContext;
  term: Term;
  maturityDate: Date;

  constructor(startTime: number, context: ElementContext, term: Term) {
    const startTimeBits = (startTime / 1000).toString(16).padStart(31, "0");
    const expiryBits = term.id.replace(/^0x/, "").padStart(32, "0");
    this.id = `0x8${startTimeBits}${expiryBits}`;
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
