import { formatUnits } from "ethers/lib/utils";
import { Money } from "ts-money";

import { fetchAccumulatedInterestForTranche } from "elf/tranche/fetchAccumulatedInterestForTranche";
import { getPoolInfoForPrincipalToken } from "elf/pools/ccpool";
import { fetchBaseAssetReservesInPool } from "elf/pools/fetchBaseAssetReservesInPool";
import { getPoolInfoForYieldToken } from "elf/pools/weightedPool";
import { trancheContractsByAddress } from "elf/tranche/tranches";
import { PrincipalTokenInfo } from "@elementfi/tokenlist";

export async function fetchTotalValueLockedForTerm(
  trancheInfo: PrincipalTokenInfo,
  baseAssetPrice: Money,
): Promise<Money> {
  const { address, decimals } = trancheInfo;
  const tranche = trancheContractsByAddress[address];
  const poolInfo = getPoolInfoForPrincipalToken(address);
  const yieldPoolInfo = getPoolInfoForYieldToken(
    trancheInfo.extensions.interestToken,
  );

  // get all components of TVL: base asset in tranche, base asset in pool, accumulated interest for
  // tranche
  const baseAssetLockedBNPromise = tranche.valueSupplied();
  const accumulatedInterestBNPromise =
    fetchAccumulatedInterestForTranche(poolInfo);
  const baseReservesInPrincipalPoolBNPromise =
    fetchBaseAssetReservesInPool(poolInfo);
  const promises = [
    baseAssetLockedBNPromise,
    accumulatedInterestBNPromise,
    baseReservesInPrincipalPoolBNPromise,
  ];
  // yield pools exist for v1 terms, so include them where necessary
  if (yieldPoolInfo) {
    promises.push(fetchBaseAssetReservesInPool(yieldPoolInfo));
  }

  const [
    baseAssetLockedBN,
    accumulatedInterestBN,
    baseReservesInPrincipalPoolBN,
    baseReservesInYieldPoolBN,
  ] = await Promise.all(promises);

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
  const totalFiatValueLocked = baseAssetPrice.multiply(
    baseAssetLocked +
      accumulatedInterest +
      baseReservesInPrincipalPool +
      baseReservesInYieldPool,
    Math.round,
  );

  return totalFiatValueLocked;
}
