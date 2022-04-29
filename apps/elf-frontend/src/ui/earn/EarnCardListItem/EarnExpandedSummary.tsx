import React from "react";

import { t } from "ttag";

import tw from "efi-tailwindcss-classnames";
import { LabeledText } from "ui/base/LabeledText/LabeledText";
import { useTokenYield } from "ui/pools/hooks/useTokenYield";
import { useTotalFiatLiquidity } from "ui/pools/hooks/useTotalFiatLiquidityForPool/useTotalFiatLiquidityForPool";
import { formatPercent } from "base/formatPercent/formatPercent";
import { formatMoney } from "elf/money/formatMoney";
import { PoolInfo } from "elf/pools/PoolInfo";
import classNames from "classnames";
import { Classes } from "@blueprintjs/core";
import {
  PrincipalPoolTokenInfo,
  YieldPoolTokenInfo,
} from "@elementfi/tokenlist";

interface EarnExpandedSummaryProps {
  yieldPoolInfo: YieldPoolTokenInfo | undefined;
  principalPoolInfo: PrincipalPoolTokenInfo;
  principalPrice: string | undefined;
  yieldPrice: string | undefined;
}

export function EarnExpandedSummary(
  props: EarnExpandedSummaryProps,
): JSX.Element {
  const { yieldPoolInfo, principalPoolInfo, yieldPrice, principalPrice } =
    props;

  const fixedYield = useTokenYield(principalPoolInfo, "principal");

  return (
    <div className={tw("w-full", "space-y-2")}>
      <div className={tw("w-full", "flex", "justify-between")}>
        {/* Liquidity */}
        <div className={tw("flex", "flex-col", "space-y-2")}>
          <span className={classNames(Classes.TEXT_MUTED, tw("text-sm"))}>
            {t`Pool liquidity:`}
          </span>
          <LiquiditySection
            yieldPoolInfo={yieldPoolInfo}
            principalPoolInfo={principalPoolInfo}
          />
        </div>
        {/* Price */}
        <div className={tw("flex", "flex-col", "space-y-2")}>
          <span className={classNames(Classes.TEXT_MUTED, tw("text-sm"))}>
            {t`Token price:`}
          </span>
          <LabeledText text={principalPrice} label={t`Principal token`} />
          <LabeledText text={yieldPrice} label={t`Yield token`} />
        </div>

        {/* Fixed APR */}
        <div className={tw("flex", "flex-col", "space-y-2")}>
          <span className={classNames(Classes.TEXT_MUTED, tw("text-sm"))}>
            {t`Fixed APR:`}
          </span>
          <div>{formatPercent(fixedYield)}</div>
        </div>
      </div>
    </div>
  );
}

interface LiquiditySectionProps {
  yieldPoolInfo: PoolInfo | undefined;
  principalPoolInfo: PoolInfo | undefined;
}

function LiquiditySection({
  yieldPoolInfo,
  principalPoolInfo,
}: LiquiditySectionProps) {
  return (
    <div className={tw("flex", "flex-col", "space-y-3")}>
      {principalPoolInfo && (
        <PrincipalLiquiditySection principalPoolInfo={principalPoolInfo} />
      )}
      {yieldPoolInfo && <YieldLiquiditySection yieldPoolInfo={yieldPoolInfo} />}
    </div>
  );
}

function YieldLiquiditySection(props: { yieldPoolInfo: PoolInfo }) {
  const { yieldPoolInfo } = props;
  const liquidity = useTotalFiatLiquidity(yieldPoolInfo);
  return (
    <LabeledText
      text={formatMoney(liquidity, { wholeAmounts: true })}
      label={`Yield Pool`}
    />
  );
}

function PrincipalLiquiditySection(props: { principalPoolInfo: PoolInfo }) {
  const { principalPoolInfo } = props;
  const liquidity = useTotalFiatLiquidity(principalPoolInfo);
  return (
    <LabeledText
      text={formatMoney(liquidity, { wholeAmounts: true })}
      label={`Yield Pool`}
    />
  );
}
