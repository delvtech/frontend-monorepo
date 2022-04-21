import { memoize } from "lodash";
import { ChainId, getTargetChain } from "wallets/chains";
import devAddressList from "./dev.addresses.json";
import goerliAddressList from "./goerli.addresses.json";
import mainnetAddressList from "./mainnet.addresses.json";

export const getAddresses = memoize(() => {
  const chainId = getTargetChain();

  if (chainId === ChainId.MAINNET) {
    return mainnetAddressList;
  }

  if (chainId === ChainId.GOERLI) {
    return goerliAddressList;
  }

  console.warn(
    "Chain id not recognized. Defaulting to local host address list.",
  );
  return devAddressList;
});
