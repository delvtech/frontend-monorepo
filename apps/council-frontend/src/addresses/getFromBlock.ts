import { ChainId } from "@elementfi/base";
import { addressesJson } from ".";

const MAINNET_DEPLOY_BLOCK = 14496292;
const GOERLI_DEPLOY_BLOCK = 0;
const LOCAL_DEPLOY_BLOCK = 0;

/**
 * Returns the most optimal from block when querying for events by current targeted chain
 * @returns {number} the optimal from block number by chain
 */
export function getFromBlock(): number {
  const chainId = addressesJson.chainId;

  if (chainId === ChainId.MAINNET) {
    return MAINNET_DEPLOY_BLOCK;
  }

  if (chainId === ChainId.GOERLI) {
    return GOERLI_DEPLOY_BLOCK;
  }

  // defaulting to local
  return LOCAL_DEPLOY_BLOCK;
}
