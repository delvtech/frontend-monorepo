import { ethers, providers } from "ethers";
import { Term, Term__factory } from "@elementfi/core-v2-typechain";
import { TransferSingleEvent } from "@elementfi/core-v2-typechain/dist/contracts/Term";
import { MultiTermDataSource } from "./MultiTermDataSource";
import { ContractDataSource } from "src/datasources/ContractDataSource";
import { fromBn } from "evm-bn";

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

  async getTermIds(fromBlock?: number, toBlock?: number): Promise<number[]> {
    return this.cached(["getTermIds", fromBlock, toBlock], async () => {
      // TODO: Filter out yield token addresses
      const events = await this.getTransferEvents(
        // new mints result in a transfer from the zero address
        ethers.constants.AddressZero,
        null,
        fromBlock,
        toBlock,
      );
      return Array.from(
        new Set(events.map((event) => event.args.id.toNumber())),
      );
    });
  }

  getCreatedAtBlock(tokenId: number): Promise<number | null> {
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

  getSymbol(tokenId: number): Promise<string> {
    return this.call("symbol", [tokenId]);
  }

  getDecimals(): Promise<number> {
    return this.call("decimals", []);
  }

  getName(tokenId: number): Promise<string> {
    return this.call("name", [tokenId]);
  }

  async getBalanceOf(tokenId: number, address: string): Promise<string> {
    const balanceBigNumber = await this.call("balanceOf", [tokenId, address]);
    return balanceBigNumber.toString();
  }

  /**
   * Fetches and caches the terms unlockedSharePrice value from our datasource (contract).
   * @notice This function converts the sharePrice from a fixed point number.
   * @param {number} tokenId - the term id (expiry)
   * @return {Promise<string>} The unlocked share price as a string.
   */
  async getUnlockedPricePerShare(): Promise<string> {
    const sharePriceBN = await this.call("unlockedSharePrice", []);
    return fromBn(sharePriceBN, await this.getDecimals());
  }
}
