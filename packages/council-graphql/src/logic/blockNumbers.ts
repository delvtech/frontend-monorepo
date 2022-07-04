import { Provider } from "@ethersproject/providers";
import { mainnetAddressList } from "@elementfi/council-tokenlist";

export function getFromBlock(chainId: number) {
  switch (chainId) {
    case mainnetAddressList.chainId:
      return 14496292;
    default:
      return 0;
  }
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
