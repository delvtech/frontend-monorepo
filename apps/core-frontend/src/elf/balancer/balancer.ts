import ContractAddresses from "addresses/addresses";
import { BALANCER_ETH_SENTINEL } from "integrations/balancer/ethSentinel";

export function mapETHSentinalToWETH(address: string): string {
  if (address === BALANCER_ETH_SENTINEL) {
    return ContractAddresses.wethAddress;
  }

  return address;
}

export function mapWETHToETHSentinal(address: string): string {
  if (address === ContractAddresses.wethAddress) {
    return BALANCER_ETH_SENTINEL;
  }

  return address;
}
