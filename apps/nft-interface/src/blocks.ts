import { memoize } from "lodash";
import { ChainId, getTargetChain } from "wallets/chains";

export const getBlockFrom = memoize(() => {
  const chain = getTargetChain();

  if (chain === ChainId.MAINNET) {
    return 14534060;
  }

  if (chain === ChainId.GOERLI) {
    return 6500000;
  }

  return 0;
});
