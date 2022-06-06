import React, { ReactElement } from "react";

import { Card, Classes } from "@blueprintjs/core";
import Link from "next/link";
import classNames from "classnames";
import { commify, formatUnits } from "ethers/lib/utils";
import { Money } from "ts-money";
import { t } from "ttag";

import tw from "efi-tailwindcss-classnames";
import { useIsTailwindSmallScreen } from "ui/base/mediaBreakpoints";
import { usePoolTokens } from "ui/pools/hooks/usePoolTokens/usePoolTokens";
import { useCurrencyPref } from "ui/prefs/useCurrency/useCurencyPref";
import { formatPercent } from "base/formatPercent/formatPercent";
import { getCryptoAssetForToken } from "elf/crypto/getCryptoAssetForToken";
import { getCryptoSymbol } from "elf/crypto/getCryptoSymbol";
import { formatMoney } from "elf/money/formatMoney";
import { getOppositePoolInfo } from "elf/pools/getOppositePoolInfo";
import { getPoolContract } from "elf/pools/getPoolContract";
import { getPoolTokens } from "elf/pools/getPoolTokens";
import { isConvergentCurvePool } from "elf/pools/PoolContract";
import { PoolInfo } from "elf/pools/PoolInfo";
import { isYieldPool } from "elf/pools/weightedPool";

interface PoolSummaryProps {
  liquidity: Money | undefined;
  liquidityTrend?: number | undefined;
  volume: number | undefined;
  volumeTrend?: number | undefined;
  feeVolume: Money | undefined;
  feeVolumeTrend?: number | undefined;
  stakingAPY: number | undefined;
  poolInfo: PoolInfo;
}

export function PoolSummary(props: PoolSummaryProps): ReactElement {
  const { liquidity, volume, feeVolume, stakingAPY, poolInfo } = props;
  const pool = getPoolContract(poolInfo.address);

  const { data: [, balances] = [undefined, undefined] } = usePoolTokens(pool);

  const {
    baseAssetIndex,
    termAssetIndex,
    baseAssetInfo: { decimals: baseAssetDecimals, address: baseAssetAddress },
    termAssetInfo: { decimals: termAssetDecimals },
  } = getPoolTokens(poolInfo);

  const baseAsset = getCryptoAssetForToken(baseAssetAddress);
  const baseAssetSymbol = getCryptoSymbol(baseAsset);

  const baseAssetBalanceBN = balances?.[baseAssetIndex];
  const termAssetBalanceBN = balances?.[termAssetIndex];
  const baseAssetBalance = +formatUnits(
    baseAssetBalanceBN || 0,
    baseAssetDecimals,
  );
  const termAssetBalance = +formatUnits(
    termAssetBalanceBN || 0,
    termAssetDecimals,
  );
  const baseAssetBalanceLabel = commify(
    baseAssetBalance > 10
      ? baseAssetBalance.toFixed()
      : baseAssetBalance.toFixed(2),
  );
  const termAssetBalanceLabel = commify(
    termAssetBalance > 10
      ? termAssetBalance.toFixed()
      : termAssetBalance.toFixed(2),
  );

  const quantityLabel = isConvergentCurvePool(pool) ? "PT" : "YT";

  const { currency } = useCurrencyPref();
  const volumeMoney = Money.fromDecimal(volume ?? 0, currency, Math.round);
  const volumeDisplayValue = volume ? formatMoney(volumeMoney) : "$0.00";
  const oppositePoolInfo = getOppositePoolInfo(poolInfo);
  let oppositePoolType: string | undefined;
  if (oppositePoolInfo) {
    oppositePoolType = isYieldPool(oppositePoolInfo) ? t`Yield` : t`Principal`;
  }
  const isSmallScreen = useIsTailwindSmallScreen();
  return (
    <div>
      <div className={tw("mb-2", "flex", "justify-between")}>
        <span>{t`Pool Summary`}</span>
        {isSmallScreen && oppositePoolInfo && (
          <Link href={`/pools/${oppositePoolInfo.address}`}>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a className={tw("text-center")}>
              {t`Go to ${oppositePoolType} Pool`}
            </a>
          </Link>
        )}
      </div>
      <Card className={tw("lg:h-200", "grid", "grid-cols-2", "gap-4")}>
        {/* First Column*/}
        <div
          className={tw(
            "flex",
            "flex-col",
            "h-full",
            "space-y-4",
            "justify-between",
            "lg:truncate",
          )}
        >
          <div className={tw("flex", "space-x-4", "justify-between")}>
            <div className={tw("flex", "flex-col")}>
              <span
                className={classNames(Classes.TEXT_MUTED)}
              >{t`Total Liquidity`}</span>
              <div className={classNames("h5", tw("space-x-4"))}>
                {liquidity ? formatMoney(liquidity) : "$0.00"}
              </div>
            </div>
          </div>
          <div className={tw("flex", "space-x-4", "justify-between")}>
            <div className={tw("flex", "flex-col")}>
              <span
                className={classNames(Classes.TEXT_MUTED, tw("text-sm"))}
              >{t`Volume (7d)`}</span>
              <div className={classNames("h5", tw("space-x-4"))}>
                {volumeDisplayValue}
              </div>
            </div>
          </div>
          {/* Quantity Base (7d)*/}
          <div className={tw("flex", "space-x-4", "justify-between")}>
            <div className={tw("flex", "flex-col")}>
              <span
                className={classNames(
                  Classes.TEXT_MUTED,
                  tw("text-sm", "lg:truncate"),
                )}
              >{t`Quantity ${baseAssetSymbol}`}</span>
              <div className={classNames("h5", tw("space-x-4"))}>
                {baseAssetBalance ? baseAssetBalanceLabel : "0.00"}
              </div>
            </div>
          </div>
        </div>
        {/* Second column */}
        <div
          className={tw(
            "flex",
            "flex-col",
            "h-full",
            "justify-between",
            "overflow-hidden",
          )}
        >
          {/* LP APY (7d) */}
          <div className={tw("flex", "space-x-4", "justify-between")}>
            <div className={tw("flex", "flex-col")}>
              <span
                className={classNames(Classes.TEXT_MUTED, tw("text-sm"))}
              >{t`LP APY (7d)`}</span>
              <div className={classNames("h5", tw("space-x-4"))}>
                {formatPercent(stakingAPY || 0)}
              </div>
            </div>
          </div>
          {/* Fees (7d)*/}
          <div className={tw("flex", "space-x-4", "justify-between")}>
            <div className={tw("flex", "flex-col")}>
              <span
                className={classNames(Classes.TEXT_MUTED, tw("text-sm"))}
              >{t`Fees (7d)`}</span>
              <div className={classNames("h5", tw("space-x-4"))}>
                {feeVolume ? formatMoney(feeVolume) : "$0.00"}
              </div>
            </div>
          </div>
          {/* Quantity Term (7d)*/}
          <div className={tw("flex", "space-x-4", "justify-between")}>
            <div className={tw("flex", "flex-col")}>
              <span
                className={classNames(
                  Classes.TEXT_MUTED,
                  tw("text-sm", "lg:truncate"),
                )}
              >{t`Quantity (${quantityLabel})`}</span>
              <div className={classNames("h5", tw("space-x-4"))}>
                {termAssetBalance ? termAssetBalanceLabel : "0.00"}
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
