import { ERC20 } from "@elementfi/core-typechain/dist/libraries";
import { usePoolTokens } from "ui/pools/hooks/usePoolTokens/usePoolTokens";
import { PoolContract } from "elf/pools/PoolContract";
import { BigNumber } from "ethers";

export function useTokenPoolBalance(
  pool: PoolContract | undefined,
  tokenContract: ERC20 | undefined,
): BigNumber | undefined {
  const { data: [tokens, balances] = [] } = usePoolTokens(pool);
  const index =
    tokens?.findIndex((token) => token === tokenContract?.address) ?? -1;

  const poolBalance = balances?.[index];
  return poolBalance;
}
