import { mainnetAddressList } from "@elementfi/council-tokenlist";

// TODO: This shouldn't be hardcoded
export function getFromBlockNumber(chainId: number): number {
  switch (chainId) {
    case mainnetAddressList.chainId:
      return 14496292;
    default:
      return 0;
  }
}
