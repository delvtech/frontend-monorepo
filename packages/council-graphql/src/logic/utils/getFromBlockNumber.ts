import { mainnetAddressList } from "@elementfi/council-tokenlist";

export function getFromBlockNumber(chainId: number) {
  switch (chainId) {
    case mainnetAddressList.chainId:
      return 14496292;
    default:
      return 0;
  }
}
