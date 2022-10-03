import { BigNumber, ethers, providers, Signer } from "ethers";
import { Term, Term__factory } from "@elementfi/core-v2-typechain";
import { TransferSingleEvent } from "@elementfi/core-v2-typechain/dist/contracts/Term";
import { MultiTermDataSource } from "./MultiTermDataSource";
import { ContractDataSource } from "src/datasources/ContractDataSource";
import { fromBn } from "evm-bn";
import { isYT } from "src/utils/token/isYT";
import { isPT } from "src/utils/token/isPT";
import { MintResponse } from "src/types";

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
   * @return {Promise<number[]>} A promise of an array of unique term ids.
   */
  async getTermIds(fromBlock?: number, toBlock?: number): Promise<number[]> {
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
            .filter((event) => isPT(event.args.id))
            .map((event) => event.args.id.toNumber()),
        ),
      );
    });
  }

  getCreatedAtBlock(termId: number): Promise<number | null> {
    return this.cached(["getCreatedAtBlock", termId], async () => {
      const events = await this.getTransferEvents(
        // new mints result in a transfer from the zero address
        ethers.constants.AddressZero,
        null,
      );
      const firstTransferEvent = events.find(({ args }) => args.id.eq(termId));
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

  getSymbol(termId: number): Promise<string> {
    return this.call("symbol", [termId]);
  }

  getDecimals(): Promise<number> {
    return this.call("decimals", []);
  }

  getName(termId: number): Promise<string> {
    return this.call("name", [termId]);
  }

  async getBalanceOf(termId: number, address: string): Promise<string> {
    const balanceBigNumber = await this.call("balanceOf", [termId, address]);
    return balanceBigNumber.toString();
  }

  /**
   * Fetches and caches the terms unlockedSharePrice value from our datasource (contract).
   * @notice This function converts the sharePrice from a fixed point number.
   * @param {number} termId - the term id (expiry)
   * @return {Promise<string>} The unlocked share price as a string.
   */
  async getUnlockedPricePerShare(): Promise<string> {
    const sharePriceBN = await this.call("unlockedSharePrice", []);
    return fromBn(sharePriceBN, await this.getDecimals());
  }

  /**
   * Gets the total supply of a certain term.
   * @param {number} termId - the term id (expiry)
   * @return {Promise<string>} total supply represented as a string
   */
  async getTotalSupply(termId: number): Promise<string> {
    const supply = await this.call("totalSupply", [termId]);
    return fromBn(supply, await this.getDecimals());
  }

  async mint(
    signer: Signer,
    termId: number,
    amount: string,
    ptDestination: string,
    ytDestination: string,
    ytBeginDate: number,
    hasPrefunding = false,
  ): Promise<MintResponse> {
    const amountBn = BigNumber.from(amount);
    if (amountBn.lte(0)) {
      throw new Error("Underlying amount has to be greater than zero.");
    }
    const multiTerm = this.contract.connect(signer);
    const txn = await multiTerm.lock(
      [],
      [],
      amountBn,
      hasPrefunding,
      ytDestination,
      ptDestination,
      ytBeginDate,
      termId,
    );
    // console.log(txn.data);

    const receipt = await txn.wait();

    const events = receipt.events!;
    const transferSingleLogs = events.filter((event) => {
      return (
        event.event === "TransferSingle" &&
        event.args?.from === ethers.constants.AddressZero
      );
    });

    console.log(transferSingleLogs);

    // maybe can just check index but not verified events will be ordered
    const ytMintEvent = transferSingleLogs.find((log) => isYT(log.args!.id))!;
    const ptMintEvent = transferSingleLogs.find((log) => isPT(log.args!.id))!;

    console.log(ytMintEvent, ptMintEvent);

    return {
      principalTokens: BigNumber.from(ptMintEvent.args!.value).toString(),
      yieldTokens: BigNumber.from(ytMintEvent.args!.value).toString(),
    };
  }
}
