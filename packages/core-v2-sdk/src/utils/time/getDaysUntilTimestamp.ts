import { providers } from "ethers";
import { getSecondsUntilTimestamp } from "src/utils/time/getSecondsUntilTimestamp";

/**
 * Gets the time remaining in days until the end. If negative, returns zero.
 * @async
 * @param {number} end - the end timestamp (seconds)
 * @param {providers.Provider} provider - ethers provider
 * @return {Promise<number>} time remaining in days, unrounded.
 */
export async function getDaysUntilTimestamp(
  end: number,
  provider: providers.Provider,
): Promise<number> {
  const seconds = await getSecondsUntilTimestamp(end, provider);
  return seconds / 86400;
}
