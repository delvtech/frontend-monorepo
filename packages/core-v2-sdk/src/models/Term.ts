import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { Wallet } from "ethers";
import { ElementContext } from "src/context";
import { MintResponse } from "src/types";
import { getCurrentBlockTimestamp } from "src/utils/ethereum/getCurrentBlockNumber";
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

  /**
   * Convenience method that mints fixed and variable positions in a term using underlying tokens.
   * This function assumes the token receiver is the signer address and the destination for both token positions are the same.
   * @async
   * @param {Signer} signer - Ethers signer object.
   * @param {string} amount - Amount of underlying tokens to use to mint.
   * @return {Promise<MintResponse>}
   */
  async mint(
    signer: SignerWithAddress | Wallet,
    amount: string,
  ): Promise<MintResponse> {
    return await this.multiTerm.dataSource.lock(
      signer,
      this.id,
      [],
      [],
      amount,
      signer.address,
      signer.address,
      (await getCurrentBlockTimestamp(this.context.provider)) + 100,
      false,
    );
  }
}
