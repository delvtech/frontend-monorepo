import { createAlchemyWeb3 } from "@alch/alchemy-web3";
import { ExternalProvider, Provider } from "@ethersproject/providers";
import type { MockProvider } from "ethereum-waffle";
import { providers } from "ethers";

import { addressesJson } from "src/elf-council-addresses";
import { ChainId } from "src/ethereum";

const isBrowser = typeof window !== "undefined";

const LOCAL_RPC_HOST = "http://127.0.0.1:8545";
const ALCHEMY_MAINNET_URI = (
  isBrowser
    ? process.env.NEXT_PUBLIC_MAINNET_URI
    : process.env.NEXT_PUBLIC_SERVER_MAINNET_URI
) as string;

export const ALCHEMY_GOERLI_HTTP_URL = process.env
  .NEXT_PUBLIC_GOERLI_URI as string;
export const ALCHEMY_MAINNET_HTTP_URL = ALCHEMY_MAINNET_URI;

const { chainId } = addressesJson;

// vercel can't create a production build with ethereum-waffle as a dependency.  ethereum-waffle
// expects to run in a node environment and vercel builds for a broweser environment, so things like
// 'fs' are not available to ethereum-waffle.  only import it if we are testing.
let mockProvider: MockProvider | undefined;
if (process.env.NODE_ENV === "test") {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { MockProvider } = require("ethereum-waffle");
  mockProvider = new MockProvider();
}
// safe to cast since this should only ever be used in 'test' environment anyway.
export const testProvider = mockProvider as MockProvider;

const provider = getProvider();
export const defaultProvider = provider;

// Default rpc host to local, but check the chain id in the addresses.json for
// final say
function getProvider() {
  if (process.env.NODE_ENV === "test") {
    return testProvider;
  }

  if (process.env.NEXT_PUBLIC_CHAIN_NAME === "mainnet-fork") {
    const localhostProvider = new providers.JsonRpcProvider(LOCAL_RPC_HOST);
    return localhostProvider;
  }
  // otherwise, if a chain id is provided, we'll use the corresponding alchemy provider.  right now
  // this is only goerli.
  if (chainId === ChainId.GOERLI) {
    const web3Goerli = createAlchemyWeb3(ALCHEMY_GOERLI_HTTP_URL);
    const alchemyWeb3GoerliProvider = new providers.Web3Provider(
      web3Goerli.currentProvider as ExternalProvider,
      ChainId.GOERLI,
    );
    return alchemyWeb3GoerliProvider as Provider;
  }

  if (chainId === ChainId.MAINNET) {
    const web3Mainnet = createAlchemyWeb3(ALCHEMY_MAINNET_HTTP_URL);

    const alchemyWeb3MainnetProvider = new providers.Web3Provider(
      web3Mainnet.currentProvider as ExternalProvider,
      ChainId.MAINNET,
    );

    return alchemyWeb3MainnetProvider as Provider;
  }

  // default to localhost
  const localhostProvider = new providers.JsonRpcProvider(LOCAL_RPC_HOST);
  return localhostProvider;
}
