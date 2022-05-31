import { parseEther, parseUnits } from "ethers/lib/utils";

import { BPool } from "src/types/BPool";
import { ERC20 } from "src/types/ERC20";

interface PoolOptions {
  /**
   *  Swap fee in decimal percent, i.e. "0.01" for a 1% fee.  Defaults to 0.3%.
   */
  swapFee: string;

  /**
   * Initial balance to seed pool with, in the tokens, nominal amount.  i.e. "1" for 1 ether.
   * Defaults to "1".
   */
  baseAssetBalance: string;
  /**
   *  1 - 50 denormalized weight value for the token to be kept at.  Sum of all values must be lte to 50.
   */
  baseAssetWeight: string;

  /**
   * Initial balance to seed pool with, in the tokens, nominal amount.  i.e. "1" for 1 ether.
   */
  yieldAssetBalance: string;

  /**
   *  1 - 50 denormalized weight value for the token to be kept at.  Sum of all values must be lte to 50.
   */
  yieldAssetWeight: string;
}

const defaultPoolOptions: PoolOptions = {
  swapFee: "0.003",
  baseAssetBalance: "10000",
  baseAssetWeight: "1",
  yieldAssetBalance: "10000",
  yieldAssetWeight: "1",
};

/**
 * Sets up a balancer pool.  It is the responsibility of the caller to make sure the contract's
 * signer has the necessary token balances and has approved the pool to transfer funds.
 * @param bPoolContract
 * @param baseAssetContract
 * @param yieldAssetContract
 * @param poolOptions
 */
export async function setupBalancerPool<B extends ERC20, Y extends ERC20>(
  bPoolContract: BPool,
  baseAssetContract: B,
  yieldAssetContract: Y,
  poolOptions: Partial<PoolOptions> = {},
): Promise<BPool> {
  const options = {
    ...defaultPoolOptions,
    ...poolOptions,
  };

  const isFinalized = await bPoolContract.isFinalized();
  if (isFinalized) {
    throw new Error("Cannot setup balancer pool, contract already finalized");
  }
  await bPoolContract.setSwapFee(parseEther(options.swapFee));
  const baseAssetDecimals = await baseAssetContract.decimals();
  await bPoolContract.bind(
    baseAssetContract.address,
    parseUnits(options.baseAssetBalance, baseAssetDecimals.toString()),
    parseEther(options.baseAssetWeight),
  );

  await bPoolContract.bind(
    yieldAssetContract.address,
    parseUnits(options.yieldAssetBalance, baseAssetDecimals.toString()),
    parseEther(options.yieldAssetWeight),
  );

  // DON'T call this. Let the consumer call this so they can verify or change settings if needs be.
  // This is especially useful for testing.
  // await bPoolContract.finalize();

  return bPoolContract;
}
