import { createAlchemyWeb3 } from "@alch/alchemy-web3";
import { ExternalProvider } from "@ethersproject/providers";
import { providers } from "ethers";
import { memoize } from "lodash";
import { ChainId, getTargetChain } from "wallets/chains";

export const ALCHEMY_GOERLI_HTTP_URL = process.env
  .NEXT_PUBLIC_GOERLI_URI as string;

const isBrowser = typeof window !== "undefined";
export const ALCHEMY_MAINNET_HTTP_URL = (
  isBrowser
    ? process.env.NEXT_PUBLIC_MAINNET_URI
    : process.env.NEXT_PUBLIC_SERVER_MAINNET_URI
) as string;

export const NEXT_ENV = process.env.NODE_ENV as string;
const LOCAL_RPC_HOST = "http://127.0.0.1:8545";

export const getProvider = memoize(() => {
  const chainId = getTargetChain();
  if (chainId === ChainId.GOERLI) {
    const alchemyWeb3GoerliProvider = new providers.Web3Provider(
      createAlchemyWeb3(ALCHEMY_GOERLI_HTTP_URL)
        .currentProvider as ExternalProvider,
      ChainId.GOERLI,
    );
    return alchemyWeb3GoerliProvider;
  }

  if (chainId === ChainId.MAINNET) {
    const alchemyWeb3MainnetProvider = new providers.Web3Provider(
      createAlchemyWeb3(ALCHEMY_MAINNET_HTTP_URL)
        .currentProvider as ExternalProvider,
      ChainId.MAINNET,
    );
    return alchemyWeb3MainnetProvider;
  }

  console.warn("Chain id not recognized. Defaulting to local host provider.");
  const localhostProvider = new providers.JsonRpcProvider(LOCAL_RPC_HOST);
  return localhostProvider;
});
