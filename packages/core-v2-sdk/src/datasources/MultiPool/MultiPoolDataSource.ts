import { BigNumber, Signer } from "ethers";
import { PoolParameters, PoolReserves } from "src/types";

export interface MultiPoolDataSource {
  address: string;

  /* -------------------------------------------------------------------------- */
  /*                                Reads                                       */
  /* -------------------------------------------------------------------------- */
  getPoolIds: (fromBlock?: number, toBlock?: number) => Promise<string[]>;
  getMultiTerm: () => Promise<string>;
  getPoolReserves: (poolId: string) => Promise<PoolReserves>;
  getPoolParameters: (poolId: string) => Promise<PoolParameters>;
  getBaseAsset: () => Promise<string>;
  getSymbol: (poolId: string) => Promise<string>;
  getDecimals: () => Promise<number>;
  getName: (poolId: number) => Promise<string>;
  getBalanceOf: (poolId: number, address: string) => Promise<string>;

  /* -------------------------------------------------------------------------- */
  /*                                Writes                                      */
  /* -------------------------------------------------------------------------- */
  depositUnderlying: (
    signer: Signer,
    amount: BigNumber,
    poolId: number,
    destination: string,
    minOutput: BigNumber,
  ) => Promise<string>;
}
