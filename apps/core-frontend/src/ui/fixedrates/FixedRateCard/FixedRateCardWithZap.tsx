import { Button, Card, Elevation, Intent, Tag } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import {
  AssetProxyTokenInfo,
  PrincipalTokenInfo,
} from "@elementfi/core-tokenlist";
import { convertEpochSecondsToDate } from "base/convertEpochSecondsToDate/convertEpochSecondsToDate";
import { formatAbbreviatedDate } from "base/dates/dates";
import { formatPercent } from "base/formatPercent/formatPercent";
import classNames from "classnames";
import tw from "efi-tailwindcss-classnames";
import { getCryptoAssetForToken } from "elf/crypto/getCryptoAssetForToken";
import { getCryptoSymbol } from "elf/crypto/getCryptoSymbol";
import { getCurvePoolTokensForPrincipalToken } from "elf/curve/tokens";
import { getPoolInfoForPrincipalToken } from "elf/pools/ccpool";
import { getIsMature } from "elf/tranche/getIsMature";
import { useRouter } from "next/router";
import { ReactElement, ReactNode, useCallback } from "react";
import { getTokenInfo } from "tokenlists/tokenlists";
import { t } from "ttag";
import { Navigation } from "ui/app/navigation/navigation";
import { LabeledText } from "ui/base/LabeledText/LabeledText";
import { useIsTailwindLargeScreen } from "ui/base/mediaBreakpoints";
import { findAssetIcon, findAssetIconByAddress } from "ui/crypto/CryptoIcon";
import styles from "ui/fixedrates/grid.module.css";
import { usePrincipalTokenYield } from "ui/pools/hooks/usePrincipalTokenYield";

interface FixedRateCardProps {
  principalToken: PrincipalTokenInfo;
  bannerText?: ReactNode;
}

export function FixedRateCardWithZap(
  props: FixedRateCardProps,
): ReactElement | null {
  const {
    bannerText,
    principalToken: {
      address,
      extensions: { unlockTimestamp, underlying, position },
    },
  } = props;

  const { push: navigate } = useRouter();
  const onCardClick = useCallback(() => {
    navigate(`/${Navigation.FIXED_RATES}/${address}`);
  }, [address, navigate]);

  const { name: positionName } = getTokenInfo<AssetProxyTokenInfo>(position);
  const principalPool = getPoolInfoForPrincipalToken(address);
  const fixedRate = usePrincipalTokenYield(principalPool);
  const baseAsset = getCryptoAssetForToken(underlying);
  const baseAssetSymbol = getCryptoSymbol(baseAsset);
  const BaseAssetIcon = findAssetIcon(baseAsset);
  const unlockDate = convertEpochSecondsToDate(unlockTimestamp);
  const formattedUnlockDate = formatAbbreviatedDate(unlockDate);
  const isRedeemable = getIsMature(unlockTimestamp);

  const curvePoolTokens = getCurvePoolTokensForPrincipalToken(
    props.principalToken,
  );
  const isLargeScreen = useIsTailwindLargeScreen();

  return (
    <Card
      interactive
      elevation={Elevation.TWO}
      onClick={onCardClick}
      className={classNames(
        tw(
          "w-full",
          "max-w-sm",
          "lg:min-w-full",
          "lg:max-w-xl",
          "flex",
          "flex-col",
          "space-y-4",
          "lg:space-y-0",
          "items-center",
        ),
      )}
    >
      <div
        className={classNames(
          { [styles.fixedRatesZapGrid]: isLargeScreen },
          tw(
            "w-full",
            "max-w-sm",
            "lg:min-w-full",
            "lg:max-w-xl",
            "flex",
            "flex-col",
            "space-y-4",
            "lg:space-y-0",
            "items-center",
          ),
        )}
      >
        <div>
          <LabeledText
            className={tw("text-left", "pl-2")}
            icon={
              BaseAssetIcon ? <BaseAssetIcon height={36} width={36} /> : null
            }
            iconClassName={tw("flex-shrink-0")}
            label={t`${positionName}`}
            labelClassName={tw("text-xs")}
            textClassName={tw("text-base")}
            text={t`${baseAssetSymbol}`}
          />
        </div>
        <div
          className={classNames(
            tw("grid", "grid-cols-3", "content-center", "gap-2"),
          )}
        >
          {curvePoolTokens.map(({ address }) =>
            findAssetIconByAddress(address)({ height: 20, width: 20 }),
          )}
        </div>

        <span>
          <Tag
            large
            fill
            intent={isRedeemable ? Intent.SUCCESS : Intent.PRIMARY}
          >
            {formattedUnlockDate}
          </Tag>
        </span>
        <span className={tw("text-base")}>
          {t`${isLargeScreen ? "" : t`Fixed APR: `} ${formatPercent(
            fixedRate,
          )}`}
        </span>
        <div className={tw("text-right")}>
          <Button minimal rightIcon={IconNames.CARET_RIGHT} onClick={() => {}}>
            {!isLargeScreen ? t`Continue` : null}
          </Button>
        </div>
      </div>
      {bannerText ? (
        <div className="w-full">
          <Tag large className="mt-8" minimal fill multiline>
            {bannerText}
          </Tag>
        </div>
      ) : null}
    </Card>
  );
}
