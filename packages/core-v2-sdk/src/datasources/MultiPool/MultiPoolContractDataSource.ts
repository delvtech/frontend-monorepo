import { BigNumber, providers, Signer } from "ethers";
import { formatUnits } from "ethers/lib/utils";
import { Pool, Pool__factory } from "@elementfi/core-v2-typechain";
import { PoolParameters, PoolReserves } from "src/types";
import { ContractDataSource } from "src/datasources/ContractDataSource";
import { MultiPoolDataSource } from "./MultiPoolDataSource";

export class MultiPoolContractDataSource
  extends ContractDataSource<Pool>
  implements MultiPoolDataSource
{
  constructor(address: string, provider: providers.Provider) {
    super(Pool__factory.connect(address, provider));
  }

  getPoolIds(fromBlock?: number, toBlock?: number): Promise<string[]> {
    return this.cached(["getPoolIds", fromBlock, toBlock], async () => {
      const eventFilter = this.contract.filters.PoolRegistered();
      const events = await this.contract.queryFilter(
        eventFilter,
        fromBlock,
        toBlock,
      );
      return events.map((event) => event.args.poolId.toHexString());
    });
  }

  getMultiTerm(): Promise<string> {
    return this.call("term", []);
  }

  /**
   * Fetches and caches the pool reserves from our datasource (contract).
   * @notice This function returns reserves as string representation of a fixed point number.
   * @param {string} poolId - the pool id (expiry)
   * @return {Promise<PoolReserves>}
   */
  async getPoolReserves(poolId: string): Promise<PoolReserves> {
    const [sharesBigNumber, bondsBigNumber] = await this.call("reserves", [
      poolId,
    ]);
    const decimals = await this.getDecimals();
    return {
      shares: formatUnits(sharesBigNumber, decimals),
      bonds: formatUnits(bondsBigNumber, decimals),
    };
  }

  /**
   * Fetches and caches the pool parameters from our datasource (contract).
   * @notice This function also handles converting the pool parameters from a fixed point number.
   * @param {string} poolId - the pool id (expiry)
   * @return {Promise<PoolParameters>}
   */
  async getPoolParameters(poolId: string): Promise<PoolParameters> {
    const [timeStretch, muBigNumber] = await this.call("parameters", [poolId]);

    return {
      // mu is represented as a 18 decimal fixed point number, we have to convert to a decimal
      mu: formatUnits(muBigNumber, 18),
      // timeStretch is represented as a 3 decimal fixed point number, we have to convert to a decimal
      timeStretch: (timeStretch / 1e3).toString(),
    };
  }

  /**
   * Fetches the base asset address from our datasource (contract).
   */
  getBaseAsset(): Promise<string> {
    return this.call("token", []);
  }

  /**
   * Fetches the symbol for a given poolId from our datasource (contract).
   */
  getSymbol(poolId: string): Promise<string> {
    return this.call("symbol", [poolId]);
  }

  /**
   * Fetches the number of decimals used by tokens in our datasource (contract).
   */
  getDecimals(): Promise<number> {
    return this.call("decimals", []);
  }

  /**
   * Fetches the name for a given poolId from our datasource (contract).
   */
  getName(poolId: string): Promise<string> {
    return this.call("name", [poolId]);
  }

  /**
   * Fetches an address's balance of a given poolId from our datasource (contract).
   */
  async getBalanceOf(poolId: string, address: string): Promise<string> {
    const balanceBigNumber = await this.call("balanceOf", [poolId, address]);
    const decimals = await this.getDecimals();
    return formatUnits(balanceBigNumber, decimals);
  }

  /**
   * Wraps the depositUnderlying function in the Pool contract, allows caller to create an LP position for a pool using the base asset.
   * @param {Signer} signer - Ethers signer object, used to sign and publish the transaction.
   * @param {BigNumber} amount - Amount of underlying tokens to create LP position.
   * @param {string} poolId - Address to receive principal tokens.
   * @param {string} destination - Address to receive LP tokens.
   * @param {BigNumber} minOutput- Minimum amount of LP tokens caller should receive. Contract throws an error if not met.
   * @return {Promise<string>} Amount of LP tokens created and sent to destination address.
   */
  async depositUnderlying(
    signer: Signer,
    amount: BigNumber,
    poolId: string,
    destination: string,
    minOutput: BigNumber,
  ): Promise<string> {
    const multiPool = this.contract.connect(signer);
    const transaction = await multiPool.depositUnderlying(
      amount,
      poolId,
      destination,
      minOutput,
    );

    const receipt = await transaction.wait();

    console.log(receipt.events);
    return "";
  }
}
