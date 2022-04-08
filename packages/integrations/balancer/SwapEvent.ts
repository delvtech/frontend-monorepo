import { BigNumber } from "ethers";

// args returned from a balancer 'Swap' event
export type SwapEvent = [
  poolId: string,
  tokenIn: string,
  tokenOut: string,
  amountIn: BigNumber,
  amountOut: BigNumber,
];

export type SwapEventWithTimeStamp = [
  poolId: string,
  tokenIn: string,
  tokenOut: string,
  amountIn: BigNumber,
  amountOut: BigNumber,
  timeStampMs: number,
];
