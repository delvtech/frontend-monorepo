import { ReactElement } from "react";

import { Intent, Tag } from "@blueprintjs/core";
import classNames from "classnames";
import { Currencies, Money } from "ts-money";
import { t } from "ttag";

import tw from "efi-tailwindcss-classnames";
import { useNowMs } from "ui/base/hooks/useNowMs/useNowMs";
import { usePrincipalTokenYield } from "ui/pools/hooks/usePrincipalTokenYield";
import { useTotalFiatLiquidity } from "ui/pools/hooks/useTotalFiatLiquidityForPool/useTotalFiatLiquidityForPool";
import { convertEpochSecondsToDate } from "base/convertEpochSecondsToDate/convertEpochSecondsToDate";
import { formatAbbreviatedDate } from "base/dates/dates";
import { formatPercent } from "base/formatPercent/formatPercent";
import { ONE_DAY_IN_MILLISECONDS } from "base/time";
import { getPoolInfoForPrincipalToken } from "elf/pools/ccpool";
import { PrincipalTokenInfo } from "@elementfi/tokenlist";

interface PrincipalTokenTermButtonLabel2Props {
  className?: string;
  principalTokenInfo: PrincipalTokenInfo;
}

/**
 * A Principal token centric display label for a tranche. This label emphasizes
 * principal token metrics rather than the underlying vault's metrics.
 */
export function PrincipalTokenTermButtonLabel2({
  principalTokenInfo,
  className,
}: PrincipalTokenTermButtonLabel2Props): ReactElement {
  const nowMs = useNowMs();
  const principalTokenPool = getPoolInfoForPrincipalToken(
    principalTokenInfo.address,
  );

  const {
    extensions: { unlockTimestamp },
  } = principalTokenInfo;

  const unlockDate = convertEpochSecondsToDate(unlockTimestamp);
  const fixedYield = usePrincipalTokenYield(principalTokenPool);

  const formattedTrancheAPY = fixedYield ? formatPercent(fixedYield) : "-";

  const formattedDate = unlockDate
    ? formatAbbreviatedDate(unlockDate)
    : t`Loading unlock date...`;

  const isPool24HoursOld =
    nowMs - principalTokenPool.extensions.createdAtTimestamp * 1000 >
    ONE_DAY_IN_MILLISECONDS;

  const fiatLiquidity = useTotalFiatLiquidity(principalTokenPool);
  const has200kLiquidity = !!fiatLiquidity?.greaterThan(
    Money.fromDecimal(200000, Currencies.USD),
  );
  let apyLabel = t`✨ NEW ✨`;
  if (isPool24HoursOld || (!isPool24HoursOld && has200kLiquidity)) {
    apyLabel = t`${formattedTrancheAPY}`;
  }

  return (
    <div
      className={classNames(
        tw("flex", "h-full", "w-full", "justify-between", "items-center"),
        className,
      )}
    >
      <div className={tw("flex", "flex-col", "space-y-1")}>
        <span className={tw("text-xs")}>{t`Fixed APR`}</span>
        <span className={tw("text-lg", "font-bold")}>{apyLabel}</span>
      </div>
      <div className={tw("flex", "flex-col", "space-y-2")}>
        <Tag large intent={Intent.PRIMARY} fill className={tw("text-center")}>
          <div>{t`Term ends`}</div>
          {formattedDate}
        </Tag>
      </div>
    </div>
  );
}
