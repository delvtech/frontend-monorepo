import { BALANCER_ETH_SENTINEL } from "integrations/balancer/ethSentinel";

export function mapETHSentinelToWETH(
  possiblyEthSentinel: string,
  wethAddress: string
): string {
  if (possiblyEthSentinel === BALANCER_ETH_SENTINEL) {
    return wethAddress;
  }

  return possiblyEthSentinel;
}

export function mapWETHToETHSentinel(
  possiblyWeth: string,
  wethAddress: string
): string {
  if (possiblyWeth === wethAddress) {
    return BALANCER_ETH_SENTINEL;
  }

  return possiblyWeth;
}
