import React, { ReactElement } from "react";

import { Card, Classes } from "@blueprintjs/core";
import classNames from "classnames";
import { Money } from "ts-money";
import { t } from "ttag";

import tw from "efi-tailwindcss-classnames";
import { TimeLeft } from "ui/base/TimeLeft/TimeLeft";
import { useDarkMode } from "ui/prefs/useDarkMode/useDarkMode";
import { useYearnVault } from "ui/yearn/useYearnVault";
import { getYearnVaultAPY } from "integrations/yearn/fetchYearnVaults";
import { formatAbbreviatedDate } from "base/dates/dates";
import { formatPercent } from "base/formatPercent/formatPercent";
import { formatMoney } from "elf/money/formatMoney";
import { getPoolTokens } from "elf/pools/getPoolTokens";
import { PoolInfo } from "elf/pools/PoolInfo";
import {
  getVaultTokenInfoForTranche,
  isPrincipalToken,
} from "elf/tranche/tranches";
import { getPrincipalTokenForYieldToken } from "elf/tranche/yieldTokens";

interface TermSummaryProps {
  poolInfo: PoolInfo;
  totalValueLocked: Money | undefined;
  maturityTimeMs: number | undefined;
  startTimeMs: number | undefined;
}

export function TermSummary(props: TermSummaryProps): ReactElement {
  const {
    poolInfo,
    totalValueLocked,
    maturityTimeMs = 0,
    startTimeMs = 0,
  } = props;
  const { termAssetInfo } = getPoolTokens(poolInfo);
  const { address: trancheAddress } = isPrincipalToken(termAssetInfo)
    ? termAssetInfo
    : getPrincipalTokenForYieldToken(termAssetInfo.address);
  const { isDarkMode } = useDarkMode();

  const { symbol: vaultSymbol, address: vaultAddress } =
    getVaultTokenInfoForTranche(trancheAddress);
  const { data: vaultInfo } = useYearnVault(vaultSymbol, vaultAddress);

  const { display_name: displayName, type, apy } = vaultInfo || {};
  const vaultApy = apy ? getYearnVaultAPY(apy) : 0;
  // Hack to show a NEW label in case yearn isn't showing an apy for a vault
  // yet. This was introduced when the bb-a-usd term was added, since it was
  // released around the same time they launched the vault.
  let vaultApyLabel = formatPercent(vaultApy);
  if (vaultApy === 0) {
    vaultApyLabel = t`✨ NEW ✨`;
  }

  const startDateLabel = startTimeMs
    ? formatAbbreviatedDate(new Date(startTimeMs))
    : "";

  return (
    <div>
      <div className="mb-2">{t`Term Summary`}</div>
      <Card className={tw("lg:h-200", "grid", "grid-cols-2", "gap-4")}>
        {/* First Column*/}
        <div
          className={tw(
            "flex",
            "flex-col",
            "h-full",
            "space-y-4",
            "justify-between",
          )}
        >
          {/* Total Value Locked */}
          <div className={tw("flex", "flex-col")}>
            <span
              className={classNames(
                Classes.TEXT_MUTED,
                tw("text-sm", "lg:truncate"),
              )}
            >{t`Total Value Locked`}</span>
            <div className={classNames("h5", tw("space-x-4", "lg:truncate"))}>
              {totalValueLocked ? formatMoney(totalValueLocked) : "$0.00"}
            </div>
          </div>

          {/* Underlying Vault */}
          {poolInfo && (
            <div className={tw("flex", "flex-col")}>
              <span
                className={classNames(
                  Classes.TEXT_MUTED,
                  tw("text-sm", "lg:truncate"),
                )}
              >{t`Underlying Vault`}</span>
              <div className={classNames("h5", tw("space-x-4", "lg:truncate"))}>
                {t`Yearn ${displayName} ${type}`}
              </div>
            </div>
          )}

          {/* Underlying Vault */}
          {poolInfo && (
            <div className={tw("flex", "flex-col")}>
              <span
                className={classNames(
                  Classes.TEXT_MUTED,
                  tw("text-sm", "lg:truncate"),
                )}
              >{t`Vault APY`}</span>
              <div className={classNames("h5", tw("space-x-4", "lg:truncate"))}>
                {vaultApyLabel}
              </div>
            </div>
          )}
        </div>

        <div
          className={tw(
            "flex",
            "flex-col",
            "justify-between",
            "overflow-hidden",
            "truncate",
            "xl:ml-4",
          )}
        >
          {/* Start Date */}
          <div className={tw("flex", "flex-col", "justify-end")}>
            <span className={classNames(Classes.TEXT_MUTED, tw("text-sm"))}>
              {t`Start Date`}
            </span>
            <div className={classNames("h5", tw("space-x-4"))}>
              {startDateLabel}
            </div>
          </div>

          {/* Status */}
          <div>
            <span className={classNames(Classes.TEXT_MUTED, tw("text-sm"))}>
              {t`Status`}
            </span>
            <div style={{ maxWidth: "150px" }} className={tw("mt-1")}>
              <TimeLeft
                isDarkMode={isDarkMode}
                startTimestamp={startTimeMs}
                maturityTimestamp={maturityTimeMs}
              />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
