import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { Signer, Wallet } from "ethers";
import { ElementContext } from "src/context";
import { MintResponse } from "src/types";
import { getCurrentBlockTimestamp } from "src/utils/ethereum/getCurrentBlockNumber";
import { MultiTerm } from "./MultiTerm";
import { PrincipalToken } from "./PrincipalToken";
import { Token } from "./Token";
import { YieldSource } from "./YieldSource";
import { YieldToken } from "./YieldToken";

export class Term {
  id: string;
  guid: string;
  context: ElementContext;
  multiTerm: MultiTerm;
  principalToken: PrincipalToken;
  maturityDate: Date;

  constructor(id: string, context: ElementContext, multiTerm: MultiTerm) {
    this.id = id;
    this.guid = `${multiTerm.address}${id}`;
    this.context = context;
    this.multiTerm = multiTerm;
    this.principalToken = new PrincipalToken(context, this);
    this.maturityDate = new Date(+id * 1000);
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

  getYieldToken(startTime: number): YieldToken {
    return new YieldToken(startTime, this.context, this);
  }

  /**
   * Convenience method that mints fixed and variable positions in a term using underlying tokens.
   * This function assumes the token receiver is the signer address and the destination for both token positions are the same.
   * @async
   * @param {Signer} signer - Ethers signer object.
   * @param {string} amount - Amount of underlying tokens to use to mint.
   * @return {Promise<MintResponse>}
   */
  async mint(signer: Signer, amount: string): Promise<MintResponse> {
    const signerAddress = await signer.getAddress();
    return await this.multiTerm.dataSource.lock(
      signer,
      this.id,
      [],
      [],
      amount,
      signerAddress,
      signerAddress,
      (await getCurrentBlockTimestamp(this.context.provider)) + 100,
      false,
    );
  }
}
