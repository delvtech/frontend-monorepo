import { ReactElement, useCallback } from "react";

import { Card, Classes, Elevation } from "@blueprintjs/core";
import { useRouter } from "next/router";
import classNames from "classnames";
import { YieldTokenInfo } from "@elementfi/tokenlist";
import { t } from "ttag";

import tw from "efi-tailwindcss-classnames";
import { LabeledText } from "ui/base/LabeledText/LabeledText";
import { findAssetIcon } from "ui/crypto/CryptoIcon";
import { GoToPoolButtonOld } from "ui/pools/GoToPoolButton/GoToPoolButtonOld";
import styles from "ui/pools/YieldPoolTable/grid.module.css";
import { useFeeVolumeForPool } from "ui/pools/hooks/useFeeVolumeForPool/useFeeVolumeForPool";
import { useYearnVault } from "ui/yearn/useYearnVault";
import { getYearnVaultAPY } from "integrations/yearn/fetchYearnVaults";
import { formatPercent } from "base/formatPercent/formatPercent";
import { ONE_WEEK_IN_SECONDS } from "base/time";
import { getCryptoAssetForToken } from "elf/crypto/getCryptoAssetForToken";
import { getCryptoSymbol } from "elf/crypto/getCryptoSymbol";
import { formatMoney } from "elf/money/formatMoney";
import { getPoolTokens } from "elf/pools/getPoolTokens";
import { getPrincipalTokenInfoForPool } from "elf/pools/getPrincipalTokenInfoForPool";
import { yieldPoolContractsByAddress } from "elf/pools/weightedPool";
import { getVaultTokenInfoForTranche } from "elf/tranche/tranches";
import { getTokenInfo } from "tokenlists/tokenlists";
import { formatYieldTokenShortSymbol } from "elf/interestToken/formatYieldTokenShortSymbol";
import { TimeLeft } from "ui/base/TimeLeft/TimeLeft";
import { usePoolSpotPrice } from "ui/pools/hooks/usePoolSpotPrice/usePoolSpotPrice";
import { PoolAction } from "ui/pools/hooks/usePoolViewPoolActionsPref/usePoolViewPoolActionsPref";
import { useStakingAPY } from "ui/pools/hooks/useStakingAPY";
import { useTotalFiatLiquidity } from "ui/pools/hooks/useTotalFiatLiquidityForPool/useTotalFiatLiquidityForPool";
import { useDarkMode } from "ui/prefs/useDarkMode/useDarkMode";
import { YieldPoolTokenInfo } from "@elementfi/tokenlist";

interface YieldPoolTableRowProps {
  yieldPoolInfo: YieldPoolTokenInfo;
}

export function YieldPoolTableRow(
  props: YieldPoolTableRowProps,
): ReactElement | null {
  const {
    yieldPoolInfo,
    yieldPoolInfo: { address: poolAddress },
  } = props;
  const { isDarkMode } = useDarkMode();
  const poolContract = yieldPoolContractsByAddress[poolAddress];
  const principalTokenInfo = getPrincipalTokenInfoForPool(yieldPoolInfo);
  const {
    address: principalTokenAddress,
    extensions: { unlockTimestamp, createdAtTimestamp, interestToken },
  } = principalTokenInfo;
  const yieldTokenInfo = getTokenInfo<YieldTokenInfo>(interestToken);

  const liquidity = useTotalFiatLiquidity(yieldPoolInfo);
  const fees = useFeeVolumeForPool(yieldPoolInfo);
  const { baseAssetContract } = getPoolTokens(yieldPoolInfo);
  const baseAsset = getCryptoAssetForToken(baseAssetContract.address);
  const baseAssetSymbol = getCryptoSymbol(baseAsset);
  const BaseAssetIcon = findAssetIcon(baseAsset);
  const { symbol: vaultSymbol, address: vaultAddress } =
    getVaultTokenInfoForTranche(principalTokenAddress);
  const yieldTokenShortSymbol = formatYieldTokenShortSymbol(yieldTokenInfo);

  const stakingYield = useStakingAPY(yieldPoolInfo, ONE_WEEK_IN_SECONDS);

  const yieldPrice = usePoolSpotPrice(poolContract, yieldPoolInfo.address);
  const { data: vaultInfo } = useYearnVault(vaultSymbol, vaultAddress);
  const { apy } = vaultInfo || {};
  const vaultApy = apy ? getYearnVaultAPY(apy) : 0;

  const { push: navigate } = useRouter();
  const goToTrade = useCallback(() => {
    navigate(`/pools/${poolAddress}`);
  }, [poolAddress, navigate]);

  const dataToLoad = [liquidity, fees, stakingYield];
  // TODO: this is a big hammer for loading state.  we should use a more granular technique when we can.
  const allDataLoaded = dataToLoad.every(
    (data): data is typeof data => data !== undefined,
  );

  if (!allDataLoaded) {
    return (
      <Card
        elevation={Elevation.TWO}
        interactive
        className={classNames(Classes.SKELETON, tw("h-24", "w-full"))}
      ></Card>
    );
  }

  return (
    <Card
      elevation={Elevation.TWO}
      interactive
      onClick={goToTrade}
      style={{ height: 128 }}
      className={classNames(tw("w-full"))}
    >
      <div className={classNames(tw("grid"), styles.yieldPoolGridColumns)}>
        {/* Logo */}
        <div>
          <LabeledText
            className={tw("text-left", "pl-4")}
            label={<br />}
            iconClassName={tw("flex-shrink-0")}
            icon={<BaseAssetIcon height={38} width={38} />}
            text={`${baseAssetSymbol} - ${yieldTokenShortSymbol}`}
          />
        </div>

        {/* Pool Liquidity */}
        <div>{formatMoney(liquidity, { wholeAmounts: true })}</div>

        {/* LP APY */}
        <div>{formatPercent(stakingYield)}</div>

        {/* Vault APY */}
        <div className={tw("flex", "justify-center", "font-bold")}>
          {formatPercent(vaultApy)}
        </div>

        {/* Yield Price */}
        <div>
          <LabeledText text={yieldPrice?.toFixed(4)} label={baseAssetSymbol} />
        </div>

        {/* Status */}
        <div>
          <TimeLeft
            isDarkMode={isDarkMode}
            startTimestamp={createdAtTimestamp * 1000}
            maturityTimestamp={unlockTimestamp * 1000}
          />
        </div>

        {/* Action Buttons */}
        <div>
          <GoToPoolButtonOld
            fill
            poolAddress={poolAddress}
            poolAction={PoolAction.BUY}
            label={t`Trade`}
          />
          <GoToPoolButtonOld
            fill
            poolAddress={poolAddress}
            poolAction={PoolAction.ADD_LIQUIDITY}
            label={t`LP`}
          />
        </div>
      </div>
    </Card>
  );
}
