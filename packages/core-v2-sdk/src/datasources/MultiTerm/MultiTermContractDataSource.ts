import { BigNumber, ethers, providers, Signer } from "ethers";
import { formatUnits, parseUnits } from "ethers/lib/utils";
import { Term, Term__factory } from "@elementfi/core-v2-typechain";
import { TransferSingleEvent } from "@elementfi/core-v2-typechain/dist/contracts/Term";
import { MintResponse } from "src/types";
import { isPT } from "src/utils/token/isPT";
import { isYT } from "src/utils/token/isYT";
import { ContractDataSource } from "src/datasources/ContractDataSource";
import { MultiTermDataSource } from "./MultiTermDataSource";

export class MultiTermContractDataSource
  extends ContractDataSource<Term>
  implements MultiTermDataSource
{
  constructor(address: string, provider: providers.Provider) {
    super(Term__factory.connect(address, provider));
  }

  getTransferEvents(
    from?: string | null,
    to?: string | null,
    fromBlock?: number,
    toBlock?: number,
  ): Promise<TransferSingleEvent[]> {
    return this.cached(
      ["TransferSingle", from, to, fromBlock, toBlock],
      async () => {
        const eventFilter = this.contract.filters.TransferSingle(
          null,
          from,
          to,
        );
        return this.contract.queryFilter(eventFilter, fromBlock, toBlock);
      },
    );
  }

  /**
   * Gets all terms that have been created from the datasource (contract).
   * @param {number} fromBlock - Optional, start block number to search from.
   * @param {number} toBlock - Optional, end block number to search to.
   * @return {Promise<string[]>} A promise of an array of unique term ids.
   */
  async getTermIds(fromBlock?: number, toBlock?: number): Promise<string[]> {
    return this.cached(["getTermIds", fromBlock, toBlock], async () => {
      const events = await this.getTransferEvents(
        // new mints result in a transfer from the zero address
        ethers.constants.AddressZero,
        null,
        fromBlock,
        toBlock,
      );

      return Array.from(
        new Set(
          events
            // filter out YTs
            .filter(({ args }) => isPT(args.id.toHexString()))
            .map(({ args }) => args.id.toHexString()),
        ),
      );
    });
  }

  /**
   * Gets all yield token that have been created from the datasource (contract).
   * @param {number} fromBlock - Optional, start block number to search from.
   * @param {number} toBlock - Optional, end block number to search to.
   * @return {Promise<string[]>} A promise of an array of unique term ids.
   */
  // TODO: How can these be fetched more efficiently and/or filtered by term?
  async getYieldTokenIds(
    fromBlock?: number,
    toBlock?: number,
  ): Promise<string[]> {
    return this.cached(["getYieldTokenIds", fromBlock, toBlock], async () => {
      const events = await this.getTransferEvents(
        // new mints result in a transfer from the zero address
        ethers.constants.AddressZero,
        null,
        fromBlock,
        toBlock,
      );

      return Array.from(
        new Set(
          events
            // filter out PTs
            .filter(({ args }) => isYT(args.id.toHexString()))
            .map(({ args }) => args.id.toHexString()),
        ),
      );
    });
  }

  getCreatedAtBlock(tokenId: string): Promise<number | null> {
    return this.cached(["getCreatedAtBlock", tokenId], async () => {
      const events = await this.getTransferEvents(
        // new mints result in a transfer from the zero address
        ethers.constants.AddressZero,
        null,
      );
      const firstTransferEvent = events.find(({ args }) => args.id.eq(tokenId));
      return firstTransferEvent?.blockNumber || null;
    });
  }

  async getYieldSource(): Promise<null> {
    // TODO: Replace with appropriate Term.sol yield source property once added
    // console.warn('Idk how to do that')
    return null;
  }

  getBaseAsset(): Promise<string> {
    return this.call("token", []);
  }

  getSymbol(tokenId: string): Promise<string> {
    return this.call("symbol", [tokenId]);
  }

  getDecimals(): Promise<number> {
    return this.call("decimals", []);
  }

  getName(tokenId: string): Promise<string> {
    return this.call("name", [tokenId]);
  }

  async getBalanceOf(tokenId: string, address: string): Promise<string> {
    const balanceBigNumber = await this.call("balanceOf", [tokenId, address]);
    const decimals = await this.getDecimals();
    return formatUnits(balanceBigNumber, decimals);
  }

  /**
   * Fetches and caches the terms unlockedSharePrice value from our datasource (contract).
   * @notice This function converts the sharePrice from a fixed point number.
   * @return {Promise<string>} The unlocked share price as a string.
   */
  async getUnlockedPricePerShare(): Promise<string> {
    const sharePriceBigNumber = await this.call("unlockedSharePrice", []);
    const decimals = await this.getDecimals();
    return formatUnits(sharePriceBigNumber, decimals);
  }

  /**
   * Gets the total supply of a certain token.
   * @param {string} tokenId - the token id (expiry)
   * @return {Promise<string>} total supply represented as a string
   */
  async getTotalSupply(tokenId: string): Promise<string> {
    const supplyBigNumber = await this.call("totalSupply", [tokenId]);
    const decimals = await this.getDecimals();
    return formatUnits(supplyBigNumber, decimals);
  }

  /**
   * Wraps the lock function in the Term contract, allows caller to mint fixed and variable positions in a term.
   * @async
   * @param {Signer} signer - Ethers signer object.
   * @param {string[]} assetIds -  The array of PT, YT and Unlocked share identifiers.
   * @param {string[]} assetAmounts - The amount of each input PT, YT and Unlocked share to use
   * @param {string} termId - The term id (expiry).
   * @param {BigNumber} amount - Amount of underlying tokens to use to mint.
   * @param {string} ptDestination - Address to receive principal tokens.
   * @param {string} ytDestination - Address to receive yield tokens.
   * @param {string} hasPreFunding- Have any funds already been sent to the contract, not commonly used for EOAs.
   * @return {Promise<MintResponse>}
   */
  async lock(
    signer: Signer,
    termId: string,
    assetIds: string[],
    assetAmounts: string[],
    amount: string,
    ptDestination: string,
    ytDestination: string,
    ytBeginDate: number,
    hasPreFunding: boolean,
  ): Promise<MintResponse> {
    if (assetAmounts.length !== assetIds.length) {
      console.error(
        "Error MultiTermDataSource.Lock(): assetIds and assetAmounts must be the same length.",
      );
    }

    const assetIdsUnique = new Set(assetIds);
    if (assetIdsUnique.size !== assetIds.length) {
      console.error(
        "Error MultiTermDataSource.Lock(): assetIds list is not unique.",
      );
    }

    const decimals = await this.getDecimals();
    const amountBigNumber = parseUnits(amount, decimals);

    const multiTerm = this.contract.connect(signer);
    const txn = await multiTerm.lock(
      assetIds,
      assetAmounts,
      amountBigNumber,
      hasPreFunding,
      ytDestination,
      ptDestination,
      ytBeginDate,
      termId,
    );
    const receipt = await txn.wait();
    // can safely assume that any successful transaction will have events and event arguments
    const events = receipt.events as ethers.Event[];
    const transferSingleEvents = events.filter((event) => {
      return (
        event.event === "TransferSingle" &&
        event.args &&
        event.args.from === ethers.constants.AddressZero
      );
    }) as TransferSingleEvent[];

    // Events are not guaranteed to be in a specific order so we check the id
    // argument of each event to infer the token type.
    const ptMintEvent = transferSingleEvents.find(({ args }) =>
      isPT(args.id.toHexString()),
    );
    const ptBigNumber = BigNumber.from(ptMintEvent?.args.value);

    const ytMintEvent = transferSingleEvents.find(({ args }) =>
      isYT(args.id.toHexString()),
    );
    const ytBigNumber = BigNumber.from(ytMintEvent?.args.value);

    return {
      principalTokens: formatUnits(ptBigNumber, decimals),
      yieldTokens: formatUnits(ytBigNumber, decimals),
    };
  }
}
