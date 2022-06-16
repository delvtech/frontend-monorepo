import { MockProvider } from "ethereum-waffle";

export async function mineBlocks(
  numBlocks: number,
  provider: MockProvider,
): Promise<void> {
  for (let index = 0; index < numBlocks; index++) {
    await provider.send("evm_mine", []);
  }
}
