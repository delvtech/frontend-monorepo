import React from "react";

import { Button, Classes } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import { Money } from "ts-money";
import { t } from "ttag";

import tw from "efi-tailwindcss-classnames";
import { LabeledText } from "ui/base/LabeledText/LabeledText";
import { TimeLeft } from "ui/base/TimeLeft/TimeLeft";
import { useStakingAPY } from "ui/pools/hooks/useStakingAPY";
import { useDarkMode } from "ui/prefs/useDarkMode/useDarkMode";
import { IconProps } from "ui/token/TokenIcon";
import { formatPercent } from "base/formatPercent/formatPercent";
import { formatMoney } from "elf/money/formatMoney";
import classNames from "classnames";
import {
  PrincipalPoolTokenInfo,
  YieldPoolTokenInfo,
} from "@elementfi/tokenlist";

interface EarnSummaryCardListItemProps {
  onToggleExpand: () => void;
  BaseAssetIcon: React.FC<IconProps>;
  displayName: string | undefined;
  type: string | undefined;
  termLength: number;
  vaultApy: number;
  tvl: Money | undefined;
  yieldPoolInfo: YieldPoolTokenInfo | undefined;
  principalPoolInfo: PrincipalPoolTokenInfo;
  startTime: number;
  maturityTime: number;
  isExpanded: boolean;
}

export function EarnSummaryCardListItem(
  props: EarnSummaryCardListItemProps,
): JSX.Element {
  const {
    onToggleExpand,
    BaseAssetIcon,
    displayName,
    type,
    vaultApy,
    tvl,
    yieldPoolInfo,
    principalPoolInfo,
    startTime,
    maturityTime,
    isExpanded,
  } = props;

  const { isDarkMode } = useDarkMode();
  const ptStakingAPY = useStakingAPY(principalPoolInfo);

  return (
    <div className={tw("w-full", "space-y-2")}>
      {/* Vault */}
      <div className={tw("w-full", "flex", "justify-between")}>
        <LabeledText
          text={t`${displayName} ${type}`}
          iconClassName={tw("flex-shrink-0")}
          className={tw("text-left", "pl-4")}
          icon={<BaseAssetIcon height={38} width={38} />}
          label={t`Yearn Vault`}
        />

        <Button
          minimal
          small
          active={isExpanded}
          icon={isExpanded ? IconNames.MINIMIZE : IconNames.MAXIMIZE}
          style={{ height: 24, width: 24 }}
          onClick={onToggleExpand}
        ></Button>
      </div>

      <div className={tw("w-full", "flex", "justify-between")}>
        {/* Element TVL */}
        <div>
          {t`TVL:`} {tvl ? formatMoney(tvl, { wholeAmounts: true }) : null}
        </div>

        <div className={tw("flex", "flex-col", "justify-end")}>
          {/* LP APYs */}
          <div className={tw("flex", "flex-col", "justify-end", "items-end")}>
            <span>
              {t`Principal Pool APY: `}
              {formatPercent(ptStakingAPY)}
            </span>
            {yieldPoolInfo && <YieldPoolAPY yieldPoolInfo={yieldPoolInfo} />}
          </div>
          {/* Vault APY */}
          <div className={tw("flex", "justify-end")}>
            <span className={classNames(Classes.TEXT_MUTED, tw("text-sm"))}>
              {t`Vault APY: `}
              {formatPercent(vaultApy)}
            </span>
          </div>
        </div>
      </div>

      {/* Term */}
      <div className={tw("flex", "w-full", "items-start")}>
        <TimeLeft
          isDarkMode={isDarkMode}
          startTimestamp={startTime}
          maturityTimestamp={maturityTime}
        />
      </div>
    </div>
  );
}

function YieldPoolAPY(props: { yieldPoolInfo: YieldPoolTokenInfo }) {
  const { yieldPoolInfo } = props;
  const ytStakingAPY = useStakingAPY(yieldPoolInfo);
  return (
    <span>
      {t`Yield Pool APY: `}
      {formatPercent(ytStakingAPY)}
    </span>
  );
}
