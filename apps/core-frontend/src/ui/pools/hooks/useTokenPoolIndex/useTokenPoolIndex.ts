import { ERC20 } from "@elementfi/core-typechain/dist/libraries";
import { usePoolTokens } from "ui/pools/hooks/usePoolTokens/usePoolTokens";
import { PoolContract } from "elf/pools/PoolContract";

export function useTokenPoolIndex(
  pool: PoolContract | undefined,
  tokenContract: ERC20 | undefined,
): number | undefined {
  const { data: [tokens] = [] } = usePoolTokens(pool);
  const index = tokens?.findIndex((token) => token === tokenContract?.address);

  return index;
}
