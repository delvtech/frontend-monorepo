import { useNowMs } from "ui/base/hooks/useNowMs/useNowMs";
import { usePoolSpotPrice } from "ui/pools/hooks/usePoolSpotPrice/usePoolSpotPrice";
import { useYearnVault } from "ui/yearn/useYearnVault";
import { getYearnVaultAPY } from "integrations/yearn/fetchYearnVaults";
import { ONE_YEAR_IN_SECONDS } from "base/time";
import { getPoolContract } from "elf/pools/getPoolContract";
import { getPoolTokens } from "elf/pools/getPoolTokens";
import { getPrincipalTokenInfoForPool } from "elf/pools/getPrincipalTokenInfoForPool";
import { PoolInfo } from "elf/pools/PoolInfo";
import { TermAssetType } from "elf/tranche/TermAssetType";
import { getVaultTokenInfoForTranche } from "elf/tranche/tranches";

/**
 * Returns the APY for either a principal token or a yield token
 * @param baseAssetContract
 * @param pool
 * @param termAssetType
 * @returns
 */
export function useTokenYield(
  poolInfo: PoolInfo,
  termAssetType: TermAssetType,
): number {
  const nowMs = useNowMs();
  const pool = getPoolContract(poolInfo.address);
  const { termAssetInfo } = getPoolTokens(poolInfo);
  // get fixed yield
  const principalPrice = usePoolSpotPrice(pool, termAssetInfo.address);
  const {
    address: trancheAddress,
    extensions: { unlockTimestamp },
  } = getPrincipalTokenInfoForPool(poolInfo);

  let fixedAPY = 0;
  if (principalPrice) {
    const timeLeftInSeconds = unlockTimestamp - Math.round(nowMs / 1000);

    // principalPrice is the price in terms of the base asset.  Since we know the principal will be
    // equal to base at term, (1 - principalPrice) gives us the the fixed interest for the rest of
    // the term.  so we take that number and scale up to a year for APY:
    //
    // fixed apy = fixed interest * one_year / term_length
    if (timeLeftInSeconds > 0) {
      fixedAPY =
        (((1 - principalPrice) / principalPrice) * ONE_YEAR_IN_SECONDS) /
        timeLeftInSeconds;
    } else {
      fixedAPY = 0;
    }
  }

  // the yield token apy is the same as the underlying vault, so we pull from there.
  const { symbol: vaultSymbol, address: vaultAddress } =
    getVaultTokenInfoForTranche(trancheAddress);
  const { data: vaultInfo } = useYearnVault(vaultSymbol, vaultAddress);

  const variableAPY = vaultInfo?.apy ? getYearnVaultAPY(vaultInfo?.apy) : 0;

  const tokenYield = termAssetType === "principal" ? fixedAPY : variableAPY;
  return tokenYield;
}
