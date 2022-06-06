import React, { ReactElement } from "react";

import { Button, Card, Intent } from "@blueprintjs/core";
import { Money } from "ts-money";
import { t } from "ttag";

import tw from "efi-tailwindcss-classnames";
import { LabeledText } from "ui/base/LabeledText/LabeledText";
import styles from "ui/earn/grid.module.css";
import { useTotalFiatLiquidity } from "ui/pools/hooks/useTotalFiatLiquidityForPool/useTotalFiatLiquidityForPool";
import { IconProps } from "ui/token/TokenIcon";
import { formatPercent } from "base/formatPercent/formatPercent";
import { formatMoney } from "elf/money/formatMoney";
import { PoolInfo } from "elf/pools/PoolInfo";
import { useTokenYield } from "ui/pools/hooks/useTokenYield";
import { useStakingAPY } from "ui/pools/hooks/useStakingAPY";
import { TimeLeft } from "ui/base/TimeLeft/TimeLeft";
import { useDarkMode } from "ui/prefs/useDarkMode/useDarkMode";
import {
  PrincipalPoolTokenInfo,
  YieldPoolTokenInfo,
} from "@elementfi/core-tokenlist";
import { yieldPoolContractsByAddress } from "elf/pools/weightedPool";
import { usePoolSpotPrice } from "ui/pools/hooks/usePoolSpotPrice/usePoolSpotPrice";

interface EarnSummaryCardProps {
  onToggleExpand: () => void;
  BaseAssetIcon: React.FC<IconProps>;
  displayName: string | undefined;
  type: string | undefined;
  termLength: number;
  vaultApy: number;
  tvl: Money | undefined;
  yieldPoolInfo: YieldPoolTokenInfo | undefined;
  principalPoolInfo: PrincipalPoolTokenInfo;
  principalPrice: string | undefined;
  startTime: number;
  maturityTime: number;
  isExpanded: boolean;
}

export function EarnSummaryCard(props: EarnSummaryCardProps): JSX.Element {
  const {
    onToggleExpand,
    BaseAssetIcon,
    displayName,
    type,
    vaultApy,
    tvl,
    yieldPoolInfo,
    principalPoolInfo,
    principalPrice,
    startTime,
    maturityTime,
    isExpanded,
  } = props;

  const { isDarkMode } = useDarkMode();
  const fixedYield = useTokenYield(principalPoolInfo, "principal");
  const ptStakingAPY = useStakingAPY(principalPoolInfo);

  return (
    <Card onClick={onToggleExpand} className={tw("w-full", "flex", "p-5")}>
      <div className={styles.earnGrid}>
        {/* Vault */}
        <div>
          <LabeledText
            text={t`${displayName} ${type}`}
            iconClassName={tw("flex-shrink-0")}
            className={tw("text-left", "pl-4")}
            icon={<BaseAssetIcon height={38} width={38} />}
            label={t`Yearn Vault`}
          />
        </div>

        {/* Element TVL */}
        <div>{tvl ? formatMoney(tvl, { wholeAmounts: true }) : null}</div>

        {/* Vault APY */}
        <div className={tw("flex", "justify-center", "font-bold")}>
          {formatPercent(vaultApy)}
        </div>

        {/* LP APYs */}
        <div className={tw("flex", "flex-col", "space-y-3", "font-bold")}>
          <LabeledText
            text={formatPercent(ptStakingAPY)}
            label={t`Principal`}
          />
          {yieldPoolInfo && (
            <YieldPoolStakingAPY yieldPoolInfo={yieldPoolInfo} />
          )}
        </div>
        {/* Liquidity */}
        <div className={tw("flex", "flex-col")}>
          <LiquiditySection
            yieldPoolInfo={yieldPoolInfo}
            principalPoolInfo={principalPoolInfo}
          />
        </div>
        {/* Price */}
        <div className={tw("flex", "flex-col", "space-y-3")}>
          <LabeledText text={t`${principalPrice}`} label={t`Principal token`} />
          {yieldPoolInfo && <YieldTokenPrice yieldPoolInfo={yieldPoolInfo} />}
        </div>

        {/* Fixed APR */}
        <div>{formatPercent(fixedYield)}</div>

        {/* Term */}
        <div className={tw("flex", "w-full", "items-start")}>
          <TimeLeft
            isDarkMode={isDarkMode}
            startTimestamp={startTime}
            maturityTimestamp={maturityTime}
          />
        </div>
        <div>
          <Button
            intent={Intent.PRIMARY}
            minimal
            large
            fill
            active={isExpanded}
            onClick={onToggleExpand}
          >
            {isExpanded ? t`Hide` : t`Show`}
          </Button>
        </div>
      </div>
    </Card>
  );
}

interface TokenPriceProps {
  yieldPoolInfo: YieldPoolTokenInfo;
}
function YieldTokenPrice({ yieldPoolInfo }: TokenPriceProps) {
  const yieldTokenAddress = yieldPoolInfo.extensions.interestToken;
  const yieldPoolContract = yieldPoolContractsByAddress[yieldPoolInfo.address];
  const yieldPrice = usePoolSpotPrice(
    yieldPoolContract,
    yieldTokenAddress,
  )?.toFixed(4);
  return <LabeledText text={t`${yieldPrice}`} label={t`Yield token`} />;
}

interface YieldPoolStakingAPYProps {
  yieldPoolInfo: YieldPoolTokenInfo;
}
function YieldPoolStakingAPY({ yieldPoolInfo }: YieldPoolStakingAPYProps) {
  const ytStakingAPY = useStakingAPY(yieldPoolInfo);
  return <LabeledText text={formatPercent(ytStakingAPY)} label={t`Yield`} />;
}

interface LiquiditySectionProps {
  yieldPoolInfo: PoolInfo | undefined;
  principalPoolInfo: PoolInfo;
}

function LiquiditySection({
  yieldPoolInfo,
  principalPoolInfo,
}: LiquiditySectionProps) {
  return (
    <div className={tw("flex", "flex-col", "space-y-3")}>
      <PoolLiquidity label={t`Principal Pool`} poolInfo={principalPoolInfo} />
      {yieldPoolInfo && (
        <PoolLiquidity label={t`Yield Pool`} poolInfo={yieldPoolInfo} />
      )}
    </div>
  );
}

interface PoolLiquidityProps {
  poolInfo: PoolInfo;
  label: string;
}
function PoolLiquidity({
  poolInfo,
  label,
}: PoolLiquidityProps): ReactElement | null {
  const poolLiquidity = useTotalFiatLiquidity(poolInfo);
  if (!poolLiquidity) {
    return null;
  }
  return (
    <LabeledText
      text={formatMoney(poolLiquidity, { wholeAmounts: true })}
      label={label}
    />
  );
}
