import { ERC20 } from "@elementfi/core-typechain/dist/libraries";
import { PrincipalTokenInfo } from "@elementfi/core-tokenlist";
import { useSmartContractReadCall } from "ui/contracts/useSmartContractReadCall/useSmartContractReadCall";
import { useAccumulatedInterestForTranche } from "ui/pools/hooks/useAccumulatedInterestForTranche";
import { usePoolTokens } from "ui/pools/hooks/usePoolTokens/usePoolTokens";
import { useCurrencyPref } from "ui/prefs/useCurrency/useCurencyPref";
import { useTokenPrice } from "ui/token/hooks/useTokenPrice";
import { getPoolInfoForPrincipalToken } from "elf/pools/ccpool";
import { getPoolContract } from "elf/pools/getPoolContract";
import { getPoolTokens } from "elf/pools/getPoolTokens";
import { PoolInfo } from "elf/pools/PoolInfo";
import { getPoolInfoForYieldToken } from "elf/pools/weightedPool";
import { trancheContractsByAddress } from "elf/tranche/tranches";
import { formatUnits } from "ethers/lib/utils";
import { useMemo } from "react";
import { Money } from "ts-money";
import { BigNumber } from "ethers";

export function useTotalValueLockedForTranche(
  trancheInfo: PrincipalTokenInfo,
  baseAssetContract: ERC20,
): Money | undefined {
  const { address, decimals } = trancheInfo;
  const tranche = trancheContractsByAddress[address];
  const poolInfo = getPoolInfoForPrincipalToken(address);
  const yieldPoolInfo = getPoolInfoForYieldToken(
    trancheInfo.extensions.interestToken,
  );

  // get all components of TVL: base asset in tranche, base asset in pool, accumulated interest for tranche
  const { data: baseAssetLockedBN } = useSmartContractReadCall(
    tranche,
    "valueSupplied",
  );
  const accumulatedInterestBN = useAccumulatedInterestForTranche(poolInfo);
  const baseReservesInPrincipalPoolBN = useBaseAssetReservesInPool(poolInfo);
  const baseReservesInYieldPoolBN = useBaseAssetReservesInPool(yieldPoolInfo);

  const { currency } = useCurrencyPref();
  const { data: baseAssetPrice } = useTokenPrice(baseAssetContract, currency);

  // convert to numbers
  const baseAssetLocked = +formatUnits(baseAssetLockedBN || 0, decimals);
  const accumulatedInterest = +formatUnits(
    accumulatedInterestBN || 0,
    decimals,
  );
  const baseReservesInPrincipalPool = +formatUnits(
    baseReservesInPrincipalPoolBN || 0,
    decimals,
  );
  const baseReservesInYieldPool = +formatUnits(
    baseReservesInYieldPoolBN || 0,
    decimals,
  );

  // get total, convert to fiat
  const totalFiatValueLocked = useMemo(() => {
    const tvl =
      baseAssetLocked +
      accumulatedInterest +
      baseReservesInPrincipalPool +
      baseReservesInYieldPool;
    return baseAssetPrice?.multiply(tvl, Math.round);
  }, [
    accumulatedInterest,
    baseAssetLocked,
    baseAssetPrice,
    baseReservesInPrincipalPool,
    baseReservesInYieldPool,
  ]);

  if (
    !baseAssetLockedBN ||
    !accumulatedInterestBN ||
    !baseReservesInPrincipalPoolBN
  ) {
    return undefined;
  }

  return totalFiatValueLocked;
}
function useBaseAssetReservesInPool(
  poolInfo: PoolInfo | undefined,
): BigNumber | undefined {
  const pool = poolInfo && getPoolContract(poolInfo.address);
  const { data: [, balances] = [undefined, undefined] } = usePoolTokens(pool);

  if (!poolInfo) {
    return;
  }

  const { baseAssetIndex } = getPoolTokens(poolInfo);
  return balances?.[baseAssetIndex];
}
