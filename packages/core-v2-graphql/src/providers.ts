import { providers } from "ethers";
import { MockProvider } from "ethereum-waffle";
import { ChainId } from "@elementfi/base";
import { getAddressList } from "./addressLists";

const envAddressList = getAddressList();

export function getProvider(
  chainId = envAddressList.chainId,
): providers.Provider {
  switch (chainId) {
    case ChainId.MAINNET:
      return providers.getDefaultProvider(process.env.MAINNET_URI);
    case ChainId.GOERLI:
      return providers.getDefaultProvider(process.env.GOERLI_URI);
    case ChainId.LOCAL:
    default:
      return getLocalhostProvider();
  }
}

function getLocalhostProvider() {
  if (process.env.NODE_ENV === "test") {
    return new MockProvider();
  }
  return new providers.JsonRpcProvider("http://127.0.0.1:8545");
}
