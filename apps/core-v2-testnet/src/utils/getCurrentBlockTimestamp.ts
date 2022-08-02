import { Provider } from "@ethersproject/providers";

// Gets the current unix seconds timestamp at the current block
export async function getCurrentBlockTimestamp(
  provider: Provider,
): Promise<number> {
  const current = await provider.getBlockNumber();
  const currentBlock = await provider.getBlock(current);

  return currentBlock.timestamp;
}
