import { addressesJson } from "src/addresses";
import { ChainId } from "@elementfi/base";

import {
  mainnetDelegates,
  goerliDelegates,
  testnetDelegates,
} from "@elementfi/council-delegates";

export const delegates = getDelegates();

function getDelegates() {
  if (addressesJson.chainId === ChainId.GOERLI) {
    return goerliDelegates;
  }

  if (addressesJson.chainId === ChainId.MAINNET) {
    return mainnetDelegates;
  }

  if (addressesJson.chainId === ChainId.LOCAL) {
    return testnetDelegates;
  }

  // Should never happen, but for type safety we default to hardhat testnet delegates
  return testnetDelegates;
}
