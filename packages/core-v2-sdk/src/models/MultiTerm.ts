import { ElementContext } from "src/context";
import { MultiTermDataSource } from "src/datasources/MultiTerm/MultiTermDataSource";
import { MultiTermContractDataSource } from "src/datasources/MultiTerm/MultiTermContractDataSource";
import { Token } from "./Token";
import { YieldSource } from "./YieldSource";
import { Term } from "./Term";
import { BigNumber } from "bignumber.js";

/**
 * MultiTerm model class.
 * @class
 */
export class MultiTerm {
  address: string;
  context: ElementContext;
  dataSource: MultiTermDataSource;

  constructor(
    address: string,
    context: ElementContext,
    dataSource?: MultiTermDataSource,
  ) {
    this.address = address;
    this.context = context;
    this.dataSource =
      dataSource ??
      context.registerDataSource(
        { address },
        new MultiTermContractDataSource(address, context.provider),
      );
  }

  /**
   * Gets a Term by the termId from this MultiTerm.
   * @param {string} termId - the termId
   * @return {Term}
   */
  getTerm(termId: string): Term {
    return new Term(termId, this.context, this);
  }

  /**
   * Gets all the Terms from this MultiTerm. Searches by TransferSingleEvents.
   * @async
   * @param {number} fromBlock - Optional, start block number to search from.
   * @param {number} toBlock - Optional, end block number to search to.
   * @return {Promise<Term[]>}
   */
  async getTerms(fromBlock?: number, toBlock?: number): Promise<Term[]> {
    const termIds = await this.dataSource.getTermIds(
      fromBlock,
      toBlock ?? (await this.context.provider.getBlockNumber()),
    );
    return termIds.map((id) => new Term(id, this.context, this));
  }

  /**
   * Gets the yield source this MultiTerm deposits into.
   * @async
   * @function getYieldSource
   * @return {Promise<YieldSource | null>}
   */
  async getYieldSource(): Promise<YieldSource | null> {
    const address = await this.dataSource.getYieldSource();
    if (!address) {
      return null;
    }
    return new YieldSource(address, this.context);
  }

  /**
   * Gets the base asset as a Token model.
   * @async
   * @function getBaseAsset
   * @return {Promise<Token>} ERC20 token.
   */
  async getBaseAsset(): Promise<Token> {
    const address = await this.dataSource.getBaseAsset();
    return new Token(address, this.context);
  }

  /**
   * Gets the number of decimals used by this MultiTerm.
   * @async
   * @return {Promise<number>} The number of decimals.
   */
  getDecimals(): Promise<number> {
    return this.dataSource.getDecimals();
  }

  /**
   * Gets the TVL for the MultiTerm contract, the sum of all term TVLs.
   * @async
   * @return {Promise<string>} TVL represented as a string in terms of underlying.
   */
  async getTVL(): Promise<string> {
    const terms = await this.getTerms();

    let tvl: BigNumber = new BigNumber(0);
    for (const term of terms) {
      tvl = tvl.plus(await term.getTVL());
    }

    return tvl.toString();
  }

  /**
   * Gets the MultiTerm's unlockedSharePrice value
   * @async
   * @return {Promise<string>} The unlocked share price as a string.
   */
  async getUnlockedPricePerShare(): Promise<string> {
    return await this.dataSource.getUnlockedPricePerShare();
  }
}
