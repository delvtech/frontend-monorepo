import { Provider } from "@ethersproject/providers";

/**
 * Gets the current block's timestamp on-chain from the provider
 * @return {Promise<string>} Current block timestamps in seconds
 */
export async function getCurrentBlockTimestamp(
  provider: Provider,
): Promise<number> {
  const current = await provider.getBlockNumber();
  const currentBlock = await provider.getBlock(current);

  return currentBlock.timestamp;
}
