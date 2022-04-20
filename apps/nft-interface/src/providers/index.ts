import { createAlchemyWeb3 } from "@alch/alchemy-web3";
import { ExternalProvider } from "@ethersproject/providers";
import { providers } from "ethers";
import { memoize } from "lodash";
import { ChainId, getTargetChain } from "wallets/chains";

export const ALCHEMY_GOERLI_KEY = process.env
  .NEXT_PUBLIC_GOERLI_ALCHEMY_KEY as string;
export const ALCHEMY_MAINNET_KEY = process.env
  .NEXT_PUBLIC_MAINNET_ALCHEMY_KEY as string;

export const ALCHEMY_GOERLI_HTTP_URL = `https://eth-goerli.alchemyapi.io/v2/${ALCHEMY_GOERLI_KEY}`;
export const ALCHEMY_MAINNET_HTTP_URL = `https://eth-mainnet.alchemyapi.io/v2/${ALCHEMY_MAINNET_KEY}`;

export const ALCHEMY_GOERLI_WSS_URL = `wss://eth-goerli.ws.alchemyapi.io/v2/${ALCHEMY_GOERLI_KEY}`;
export const ALCHEMY_MAINNET_WSS_URL = `wss://eth-mainnet.ws.alchemyapi.io/v2/${ALCHEMY_GOERLI_KEY}`;

export const NEXT_ENV = process.env.NODE_ENV as string;
const LOCAL_RPC_HOST = "http://127.0.0.1:8545";

export const getProvider = memoize(() => {
  const chainId = getTargetChain();
  if (chainId === ChainId.GOERLI) {
    const alchemyWeb3GoerliWebSocketProvider = new providers.Web3Provider(
      createAlchemyWeb3(ALCHEMY_GOERLI_WSS_URL)
        .currentProvider as ExternalProvider,
      ChainId.GOERLI,
    );
    return alchemyWeb3GoerliWebSocketProvider;
  }

  if (chainId === ChainId.MAINNET) {
    const alchemyWeb3MainnetWebSocketProvider = new providers.Web3Provider(
      createAlchemyWeb3(ALCHEMY_MAINNET_WSS_URL)
        .currentProvider as ExternalProvider,
      ChainId.MAINNET,
    );
    return alchemyWeb3MainnetWebSocketProvider;
  }

  console.warn("Chain id not recognized. Defaulting to local host provider.");
  const localhostProvider = new providers.JsonRpcProvider(LOCAL_RPC_HOST);
  return localhostProvider;
});
