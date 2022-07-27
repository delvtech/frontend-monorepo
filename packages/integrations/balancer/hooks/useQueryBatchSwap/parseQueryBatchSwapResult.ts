import { BigNumber } from "ethers";

import {
  mapETHSentinelToWETH,
  mapWETHToETHSentinel,
} from "@elementfi/integrations/balancer/balancer";
import { BALANCER_ETH_SENTINEL } from "@elementfi/integrations/balancer/ethSentinel";
import { sortAddresses } from "@elementfi/base";

interface ParsedQueryBatchSwapResult {
  tokenOut: BigNumber | undefined;
  tokenIn: BigNumber | undefined;
}

export function parseQueryBatchSwapResult(
  tokenInAddress: string,
  tokenOutAddress: string,
  batchSwaps: BigNumber[],
  wethAddress: string,
): ParsedQueryBatchSwapResult {
  // balancer's batchSwap requires that the assets be sorted
  let assets = sortAddresses([tokenInAddress, tokenOutAddress]);
  // ETH is a special case. Balancer uses the
  // zero address as an address sentinel for ETH, but still expects the addresses sorted as though
  // it were WETH.
  if (assets.includes(BALANCER_ETH_SENTINEL)) {
    assets = sortAddresses(
      assets.map((address) => mapETHSentinelToWETH(address, wethAddress)),
    ).map((address) => mapWETHToETHSentinel(address, wethAddress));
  }
  const tokenInIndex = assets.findIndex(
    (address) => address === tokenInAddress,
  );
  const tokenOutIndex = assets.findIndex(
    (address) => address === tokenOutAddress,
  );
  const tokenIn = batchSwaps?.[tokenInIndex];
  const tokenOut = batchSwaps?.[tokenOutIndex];

  return { tokenOut, tokenIn };
}
