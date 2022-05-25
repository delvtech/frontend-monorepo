import { YieldPoolTokenInfo } from "@elementfi/core-tokenlist";
import { useNowMs } from "ui/base/hooks/useNowMs/useNowMs";
import { yieldPools } from "elf/pools/weightedPool";

export function useOpenYieldPools(): YieldPoolTokenInfo[] {
  const nowMs = useNowMs();
  return yieldPools.filter(
    (yieldPool) => yieldPool.extensions.expiration * 1000 > nowMs,
  );
}
