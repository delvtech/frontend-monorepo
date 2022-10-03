import { ElementContext } from "src/context";
import { MintParameters, MintResponse } from "src/types";
import { MultiTerm } from "./MultiTerm";
import { PrincipalToken } from "./PrincipalToken";
import { Token } from "./Token";
import { YieldSource } from "./YieldSource";
import { YieldToken } from "./YieldToken";

export class Term {
  id: number;
  guid: string;
  context: ElementContext;
  multiTerm: MultiTerm;
  principalToken: PrincipalToken;
  maturityDate: Date;

  constructor(id: number, context: ElementContext, multiTerm: MultiTerm) {
    this.id = id;
    this.guid = `${multiTerm.address}${id}`;
    this.context = context;
    this.multiTerm = multiTerm;
    this.principalToken = new PrincipalToken(id, context, this);
    this.maturityDate = new Date(id * 1000);
  }

  getYieldSource(): Promise<YieldSource | null> {
    return this.multiTerm.getYieldSource();
  }

  getBaseAsset(): Promise<Token> {
    return this.multiTerm.getBaseAsset();
  }

  /**
   * Gets the TVL of this term, in terms of the underlying token
   * @todo Does not account for accrued interest, need access to _underlying(ShareState.locked)
   * @param {number} termId - the term id (expiry)
   * @return {Promise<string>} total supply represented as a string as a decimal number
   */
  getTVL(): Promise<string> {
    const balance = this.multiTerm.dataSource.getTotalSupply(this.id);
    return balance;
  }

  getCreatedAtBlock(): Promise<number | null> {
    return this.multiTerm.dataSource.getCreatedAtBlock(this.id);
  }

  // TODO: How do I get the token ID with a start and end date?
  getYieldToken(startTimeStamp: number): YieldToken {
    return new YieldToken(this.id, this.context, this);
  }

  async mint(parameters: MintParameters): Promise<MintResponse> {
    const {
      signer,
      amount,
      ptDestination,
      ytBeginDate,
      hasPrefunding,
      ytDestination,
    } = {
      ...parameters,
    };
    return await this.multiTerm.dataSource.mint(
      signer,
      this.id,
      amount,
      ptDestination,
      ytDestination,
      ytBeginDate,
      false,
    );
  }
}
