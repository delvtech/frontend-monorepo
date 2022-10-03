import { providers } from "ethers";
import { getCurrentBlockTimestamp } from "src/utils/ethereum/getCurrentBlockNumber";

/**
 * Gets the time remaining in seconds until the end. If negative, returns zero.
 * @async
 * @param {number} end - the end timestamp (seconds)
 * @param {providers.Provider} provider - ethers provider
 * @return {Promise<number>} time remaining in seconds
 */
export async function getSecondsUntilTimestamp(
  end: number,
  provider: providers.Provider,
): Promise<number> {
  const currentBlockTimestamp = await getCurrentBlockTimestamp(provider);
  const secondsRemaining = end - currentBlockTimestamp;
  return secondsRemaining < 0 ? 0 : secondsRemaining;
}
