import { BigNumberish, BytesLike } from "ethers";

import { SwapKind } from "@elementfi/integrations/balancer/SwapKind";

/**
 * This is taken from the IPoolSwapStructs.sol, which uses this interface for SwapIn and
 * SwapOut operations.
 */
export interface PoolSwapRequest {
  kind: SwapKind;
  tokenIn: string;
  tokenOut: string;
  amount: BigNumberish;
  poolId: BytesLike;
  lastChangeBlock: BigNumberish;
  from: string;
  to: string;
  userData: BytesLike;
}
