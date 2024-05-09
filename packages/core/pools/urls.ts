import { ChainId, assertNever } from "@elementfi/base";

export function getPoolURL(chainId: ChainId, poolAddress: string): string {
  switch (chainId) {
    case ChainId.GOERLI:
      return `https://testnet.website.com/pools/${poolAddress}`;
    case ChainId.MAINNET:
      return `https://app.website.com/pools/${poolAddress}`;
    case ChainId.LOCAL:
      return `localhost:3000/pools/${poolAddress}`;
    default:
      assertNever(chainId);
      return "";
  }
}
