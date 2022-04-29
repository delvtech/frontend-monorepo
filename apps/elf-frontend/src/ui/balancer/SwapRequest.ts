import { BigNumberish, BytesLike } from "ethers";

/**
 * This is taken from the IVault.sol, which uses this interface for SwapIn and
 * SwapOut operations.
 */

export interface BatchSwapStep {
  poolId: BytesLike;
  assetInIndex: BigNumberish;
  assetOutIndex: BigNumberish;
  amount: BigNumberish;
  userData: BytesLike;
}
