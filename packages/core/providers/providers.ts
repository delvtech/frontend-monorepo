// TODO: Remove this file, packages should not have default providers!

import { ExternalProvider, Provider } from "@ethersproject/providers";
import { providers } from "ethers";
import { createAlchemyWeb3 } from "@alch/alchemy-web3";

import { AddressesJson } from "@elementfi/core/addresses/addresses";
import { ChainId } from "@elementfi/base/ethereum/ethereum";

const LOCAL_RPC_HOST = "http://127.0.0.1:8545";

export const ALCHEMY_GOERLI_HTTP_URL = process.env
  .NEXT_PUBLIC_GOERLI_URI as string;
export const ALCHEMY_MAINNET_HTTP_URL = process.env
  .NEXT_PUBLIC_MAINNET_URI as string;

// eslint-disable-next-line no-var
export var defaultProvider = getProvider();

// Default rpc host to local, but check the chain id in the addresses.json for
// final say
function getProvider() {
  // always use localhostProvider for tests
  if (process.env.NODE_ENV === "test") {
    const localhostProvider = new providers.JsonRpcProvider(LOCAL_RPC_HOST);
    return localhostProvider;
  }

  // otherwise, if a chain id is provided, we'll use the corresponding alchemy provider.  right now
  // this is only goerli.
  if (AddressesJson.chainId === ChainId.GOERLI) {
    const web3Goerli = createAlchemyWeb3(ALCHEMY_GOERLI_HTTP_URL);
    const alchemyWeb3GoerliProvider = new providers.Web3Provider(
      web3Goerli.currentProvider as ExternalProvider,
      ChainId.GOERLI,
    );
    return alchemyWeb3GoerliProvider as Provider;
  }

  if (AddressesJson.chainId === ChainId.MAINNET) {
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
