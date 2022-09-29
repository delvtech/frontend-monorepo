import { getDefaultProvider, providers } from "ethers";
import { MockProvider } from "ethereum-waffle";
import { ChainId } from "@elementfi/base";

const { CHAIN_ID, PROVIDER_URI, NODE_ENV } = process.env;

export function getProvider(chainId = Number(CHAIN_ID)): providers.Provider {
  if (chainId === ChainId.LOCAL) {
    getLocalhostProvider();
  }
  return getDefaultProvider(PROVIDER_URI || chainId);
}

function getLocalhostProvider() {
  if (NODE_ENV === "test") {
    return new MockProvider();
  }
  return new providers.JsonRpcProvider("http://127.0.0.1:8545");
}
