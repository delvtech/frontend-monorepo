import { Provider } from "@ethersproject/providers";

// The result is cached for 12 seconds to ensure the block number is the same
// throughout a single execution context.
export const getLatestBlockNumber = (function () {
  let savedResult: number | undefined;
  const TIME_TO_LIVE = 12000; // 12 seconds

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
