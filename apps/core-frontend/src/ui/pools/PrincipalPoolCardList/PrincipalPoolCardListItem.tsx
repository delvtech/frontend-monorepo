import { Fragment, ReactElement, useCallback } from "react";

import {
  Card,
  Classes,
  Elevation,
  Intent,
  ProgressBar,
} from "@blueprintjs/core";
import { useRouter } from "next/router";
import classNames from "classnames";
import { t } from "ttag";

import tw from "efi-tailwindcss-classnames";
import { findAssetIcon } from "ui/crypto/CryptoIcon";
import { GoToPoolButtonOld } from "ui/pools/GoToPoolButton/GoToPoolButtonOld";
import { useFeeVolumeFiatForPool } from "ui/pools/hooks/useFeeVolumeForPool/useFeeVolumeForPool";
import { usePoolSpotPrice } from "ui/pools/hooks/usePoolSpotPrice/usePoolSpotPrice";
import { PoolAction } from "ui/pools/hooks/usePoolViewPoolActionsPref/usePoolViewPoolActionsPref";
import { useStakingAPY } from "ui/pools/hooks/useStakingAPY";
import { useTokenYield } from "ui/pools/hooks/useTokenYield";
import { useTotalFiatLiquidity } from "ui/pools/hooks/useTotalFiatLiquidityForPool/useTotalFiatLiquidityForPool";
import { useYearnVault } from "ui/yearn/useYearnVault";
import { getYearnVaultAPY } from "integrations/yearn/fetchYearnVaults";
import { formatPercent } from "base/formatPercent/formatPercent";
import { ONE_WEEK_IN_SECONDS } from "base/time";
import { getCryptoAssetForToken } from "elf/crypto/getCryptoAssetForToken";
import { getCryptoSymbol } from "elf/crypto/getCryptoSymbol";
import { formatMoney } from "elf/money/formatMoney";
import { principalPoolContractsByAddress } from "elf/pools/ccpool";
import { getPrincipalTokenInfoForPool } from "elf/pools/getPrincipalTokenInfoForPool";
import { formatPrincipalTokenShortSymbol } from "elf/tranche/format";
import { getVaultTokenInfoForTranche } from "elf/tranche/tranches";
import { TermTag } from "ui/tranche/TermTag";
import { format } from "date-fns";
import { calculateProgress } from "base/calculateProgress/calculateProgress";
import { useNowMs } from "ui/base/hooks/useNowMs/useNowMs";
import { PrincipalPoolTokenInfo } from "@elementfi/core-tokenlist";

interface PrincipalPoolCardListItemProps {
  principalPoolTokenInfo: PrincipalPoolTokenInfo;
}
export function PrincipalPoolCardListItem(
  props: PrincipalPoolCardListItemProps,
): ReactElement {
  const {
    principalPoolTokenInfo,
    principalPoolTokenInfo: {
      address: poolAddress,
      extensions: { underlying },
    },
  } = props;

  const { push: navigate } = useRouter();
  const nowMs = useNowMs();
  const goToTrade = useCallback(() => {
    navigate(`/pools/${poolAddress}`);
  }, [poolAddress, navigate]);

  // Base asset
  const baseAsset = getCryptoAssetForToken(underlying);
  const baseAssetSymbol = getCryptoSymbol(baseAsset);
  const BaseAssetIcon = findAssetIcon(baseAsset);

  // Principal Token
  const principalTokenInfo = getPrincipalTokenInfoForPool(
    principalPoolTokenInfo,
  );
  const {
    address: principalTokenAddress,
    extensions: { unlockTimestamp, createdAtTimestamp },
  } = principalTokenInfo;
  const principalTokenShortSymbol =
    formatPrincipalTokenShortSymbol(principalTokenInfo);

  // Vault
  const { symbol: vaultSymbol, address: vaultAddress } =
    getVaultTokenInfoForTranche(principalTokenAddress);
  const { data: vaultInfo } = useYearnVault(vaultSymbol, vaultAddress);
  const { apy } = vaultInfo || {};
  const vaultApy = apy ? getYearnVaultAPY(apy) : 0;

  // Pool
  const liquidity = useTotalFiatLiquidity(principalPoolTokenInfo);
  const fees = useFeeVolumeFiatForPool(principalPoolTokenInfo);
  const poolContract = principalPoolContractsByAddress[poolAddress];
  const fixedYield = useTokenYield(principalPoolTokenInfo, "principal");
  const principalPrice =
    usePoolSpotPrice(poolContract, principalTokenAddress) ?? 0;
  const stakingYield = useStakingAPY(
    principalPoolTokenInfo,
    ONE_WEEK_IN_SECONDS,
  );

  const dataToLoad = [liquidity, fees, fixedYield, stakingYield];
  const allDataLoaded = dataToLoad.every((data) => data !== undefined);
  if (!allDataLoaded) {
    return (
      <Fragment>
        <Card
          elevation={Elevation.TWO}
          interactive
          className={classNames(Classes.SKELETON, tw("h-24", "w-full"))}
        ></Card>
      </Fragment>
    );
  }

  return (
    <Card
      elevation={Elevation.TWO}
      interactive
      onClick={goToTrade}
      className={classNames(
        tw("max-w-md", "w-full", "flex", "flex-col", "p-4", "space-y-2"),
      )}
    >
      {/* Logo */}
      <div className={tw("flex", "w-full", "justify-between")}>
        <div className={tw("flex", "items-center", "space-x-2")}>
          <BaseAssetIcon height={38} width={38} />
          <span>{`${baseAssetSymbol} – ${principalTokenShortSymbol}`}</span>
        </div>

        {/* Action Buttons */}
        <div className={tw("space-y-1")}>
          <GoToPoolButtonOld
            fill
            small
            outlined
            poolAddress={poolAddress}
            poolAction={PoolAction.BUY}
            label={t`Trade`}
            className={tw("text-xs")}
          />
          <GoToPoolButtonOld
            fill
            small
            outlined
            poolAddress={poolAddress}
            poolAction={PoolAction.ADD_LIQUIDITY}
            className={tw("text-xs")}
            label={t`LP`}
          />
        </div>
      </div>

      <div className={tw("flex", "w-full", "justify-between", "items-end")}>
        <div className={tw("flex", "flex-col", "space-y-2")}>
          {/* Pool Liquidity */}
          <span>{t`Liquidity: ${formatMoney(liquidity, {
            wholeAmounts: true,
          })}`}</span>
          <div className={tw("flex", "items-center", "space-x-2")}>
            <TermTag
              createdAtTimestamp={createdAtTimestamp}
              unlockTimestamp={unlockTimestamp}
            />
            <span>{format(unlockTimestamp * 1000, "MMM d, y")}</span>
          </div>
        </div>

        <div className={tw("flex", "flex-col")}>
          {/* Principal Price */}
          <span
            className={tw("text-right")}
          >{t`Price: ${principalPrice?.toFixed(4)}`}</span>

          {/* Fixed APY */}
          <span className={tw("text-right")}>{t`Fixed APR: ${formatPercent(
            fixedYield,
          )}`}</span>

          {/* Vault APY */}
          <span className={classNames(Classes.TEXT_MUTED, tw("text-right"))}>
            {t`Vault APY: ${formatPercent(vaultApy)}`}
          </span>
        </div>
      </div>

      {/* LP APY
       * TODO: We'll likely have to add this back in somewhere, leaving it here for now
       */}
      {/* <div>{formatPercent(stakingYield)}</div> */}

      {/* Term */}
      <div>
        <ProgressBar
          intent={
            nowMs > unlockTimestamp * 1000 ? Intent.SUCCESS : Intent.PRIMARY
          }
          animate={false}
          stripes={false}
          value={calculateProgress(
            createdAtTimestamp * 1000,
            unlockTimestamp * 1000,
          )}
        />
      </div>
    </Card>
  );
}
