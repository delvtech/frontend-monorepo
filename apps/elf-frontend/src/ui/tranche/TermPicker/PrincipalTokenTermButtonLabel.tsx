import { Intent, Tag } from "@blueprintjs/core";
import { Tranche } from "@elementfi/core-typechain/dist/v1";
import {
  AssetProxyTokenInfo,
  PrincipalTokenInfo,
} from "@elementfi/core-tokenlist";
import classNames from "classnames";
import tw from "efi-tailwindcss-classnames";
import { useNowMs } from "ui/base/hooks/useNowMs/useNowMs";
import { LabeledText } from "ui/base/LabeledText/LabeledText";
import { useIsTailwindLargeScreen } from "ui/base/mediaBreakpoints";
import { useTokenYield } from "ui/pools/hooks/useTokenYield";
import { useTotalFiatLiquidity } from "ui/pools/hooks/useTotalFiatLiquidityForPool/useTotalFiatLiquidityForPool";
import { convertEpochSecondsToDate } from "base/convertEpochSecondsToDate/convertEpochSecondsToDate";
import { formatAbbreviatedDate } from "base/dates/dates";
import { formatPercent } from "base/formatPercent/formatPercent";
import { ONE_DAY_IN_MILLISECONDS } from "base/time";
import { CryptoAsset } from "elf/crypto/CryptoAsset";
import { getCryptoSymbol } from "elf/crypto/getCryptoSymbol";
import { getPoolInfoForPrincipalToken } from "elf/pools/ccpool";
import { getTokenInfo } from "tokenlists/tokenlists";
import { Fragment, ReactElement } from "react";
import { Currencies, Money } from "ts-money";
import { t } from "ttag";

interface PrincipalTokenTermButtonLabelProps {
  tranche: Tranche;
  baseAsset: CryptoAsset;
  className?: string;
}

/**
 * A Principal token centric display label for a tranche. This label emphasizes
 * principal token metrics rather than the underlying vault's metrics.
 */
export function PrincipalTokenTermButtonLabel({
  baseAsset,
  tranche,
  className,
}: PrincipalTokenTermButtonLabelProps): ReactElement {
  const isLargeScreen = useIsTailwindLargeScreen();
  const nowMs = useNowMs();
  const trancheInfo = getTokenInfo<PrincipalTokenInfo>(tranche.address);
  const poolInfo = getPoolInfoForPrincipalToken(trancheInfo.address);

  const {
    extensions: { unlockTimestamp },
  } = trancheInfo;

  const {
    extensions: { position },
  } = getTokenInfo<PrincipalTokenInfo>(tranche.address);
  const { name: positionName } = getTokenInfo<AssetProxyTokenInfo>(position);

  const unlockDate = convertEpochSecondsToDate(unlockTimestamp);
  const fixedYield = useTokenYield(poolInfo, "principal");

  const formattedTrancheAPY = fixedYield ? formatPercent(fixedYield) : "-";

  const formattedDate = unlockDate
    ? formatAbbreviatedDate(unlockDate)
    : t`Loading unlock date...`;

  const baseAssetSymbol = getCryptoSymbol(baseAsset);

  const isPool24HoursOld =
    nowMs - poolInfo.extensions.createdAtTimestamp * 1000 >
    ONE_DAY_IN_MILLISECONDS;

  const fiatLiquidity = useTotalFiatLiquidity(poolInfo);
  const has200kLiquidity = !!fiatLiquidity?.greaterThan(
    Money.fromDecimal(200000, Currencies.USD),
  );
  let apyLabel = t`✨ NEW ✨`;
  if (isPool24HoursOld || (!isPool24HoursOld && has200kLiquidity)) {
    apyLabel = t`${formattedTrancheAPY} APR`;
  }

  return (
    <div
      className={classNames(
        tw("flex", "h-full", "space-x-4", "w-full"),
        className,
      )}
    >
      <LabeledText
        large={isLargeScreen}
        icon={
          isLargeScreen ? (
            <div
              className={tw(
                "flex",
                "flex-col",
                "items-center",
                "justify-center",
                "mr-4",
              )}
            >
              <span className={tw("text-lg", "text-center")}>{apyLabel}</span>
              <Tag
                large
                intent={Intent.PRIMARY}
                fill
                className={tw("text-center")}
              >
                {formattedDate}
              </Tag>
            </div>
          ) : null
        }
        className={tw("w-full", "text-left")}
        text={
          isLargeScreen ? (
            `${baseAssetSymbol} Principal Token`
          ) : (
            <Fragment>
              <div className={tw("flex", "w-full", "mb-2")}>
                <span className={tw("flex-1")}>{apyLabel}</span>
                <Tag intent={Intent.PRIMARY} className={tw("text-center")}>
                  {formattedDate}
                </Tag>
              </div>
              <span>{`${baseAssetSymbol} Principal Token`}</span>
            </Fragment>
          )
        }
        label={t`via ${positionName}`}
      />
    </div>
  );
}
