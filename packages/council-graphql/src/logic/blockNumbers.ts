import {
  goerliAddressList,
  mainnetAddressList,
} from "@elementfi/council-tokenlist";
import { Provider } from "@ethersproject/providers";
import { LOCALHOST_CHAIN_ID } from "./contants";

const fromBlockNumbersByChainId = {
  [LOCALHOST_CHAIN_ID]: 0,
  [goerliAddressList.chainId]: 0,
  [mainnetAddressList.chainId]: 14496292,
};

export function getFromBlock(chainId: number) {
  return fromBlockNumbersByChainId[
    chainId as keyof typeof fromBlockNumbersByChainId
  ];
}

// The result is cached for 10 seconds to ensure the block number is the same
// throughout a single execution context.
export const getLatestBlock = (function () {
  let savedResult: number | undefined;
  const TIME_TO_LIVE = 10000; // 10 seconds

  return async function (provider: Provider) {
    if (!savedResult) {
      savedResult = await provider.getBlockNumber();
      setTimeout(() => {
        savedResult = undefined;
      }, TIME_TO_LIVE);
    }
    return savedResult;
  };
})();
