import { providers } from "ethers";
import { Pool, Pool__factory } from "@elementfi/core-v2-typechain";
import { ContractDataSource } from "src/datasources/ContractDataSource";
import { MultiPoolDataSource } from "./MultiPoolDataSource";
import { PoolParameters, PoolReserves } from "src/types";
import { fromBn } from "evm-bn";
export class MultiPoolContractDataSource
  extends ContractDataSource<Pool>
  implements MultiPoolDataSource
{
  constructor(address: string, provider: providers.BaseProvider) {
    super(Pool__factory.connect(address, provider));
  }

  getPoolIds(fromBlock?: number, toBlock?: number): Promise<number[]> {
    return this.cached(["getPoolIds", fromBlock, toBlock], async () => {
      const eventFilter = this.contract.filters.PoolRegistered();
      const events = await this.contract.queryFilter(
        eventFilter,
        fromBlock,
        toBlock,
      );
      return events.map((event) => event.args.poolId.toNumber());
    });
  }

  getMultiTerm(): Promise<string> {
    return this.call("term", []);
  }

  /**
   * Fetches and caches the pool reserves from our datasource (contract).
   * @notice This function returns reserves as string representation of a fixed point number.
   * @param {number} tokenId - the pool id (expiry)
   * @return {Promise<PoolReserves>}
   */
  async getPoolReserves(tokenId: number): Promise<PoolReserves> {
    const [sharesBigNumber, bondsBigNumber] = await this.call("reserves", [
      tokenId,
    ]);
    return {
      shares: sharesBigNumber.toString(),
      bonds: bondsBigNumber.toString(),
    };
  }

  /**
   * Fetches and caches the pool parameters from our datasource (contract).
   * @notice This function also handles converting the pool parameters from a fixed point number.
   * @param {number} tokenId - the pool id (expiry)
   * @return {Promise<PoolParameters>}
   */
  async getPoolParameters(tokenId: number): Promise<PoolParameters> {
    const [timeStretch, muBN] = await this.call("parameters", [tokenId]);

    return {
      // mu is represented as a 18 decimal fixed point number, we have to convert to a decimal
      mu: fromBn(muBN, 18),
      // timeStretch is represented as a 3 decimal fixed point number, we have to convert to a decimal
      timeStretch: (timeStretch / 1e3).toString(),
    };
  }
}
