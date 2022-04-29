import { ReactElement, useCallback } from "react";

import { Button, Card, Elevation, Intent, Tag } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import { useRouter } from "next/router";
import classNames from "classnames";
import { t } from "ttag";

import tw from "efi-tailwindcss-classnames";
import { Navigation } from "ui/app/navigation/navigation";
import { LabeledText } from "ui/base/LabeledText/LabeledText";
import { useIsTailwindLargeScreen } from "ui/base/mediaBreakpoints";
import { findAssetIcon } from "ui/crypto/CryptoIcon";
import styles from "ui/fixedrates/grid.module.css";
import { convertEpochSecondsToDate } from "base/convertEpochSecondsToDate/convertEpochSecondsToDate";
import { formatAbbreviatedDate } from "base/dates/dates";
import { formatPercent } from "base/formatPercent/formatPercent";
import { getCryptoAssetForToken } from "elf/crypto/getCryptoAssetForToken";
import { getCryptoSymbol } from "elf/crypto/getCryptoSymbol";
import { getPoolInfoForPrincipalToken } from "elf/pools/ccpool";
import { getTokenInfo } from "tokenlists/tokenlists";
import { getIsMature } from "elf/tranche/getIsMature";
import { usePrincipalTokenYield } from "ui/pools/hooks/usePrincipalTokenYield";
import { AssetProxyTokenInfo, PrincipalTokenInfo } from "@elementfi/tokenlist";

interface FixedRateCardProps {
  principalToken: PrincipalTokenInfo;
}

export function FixedRateCard(props: FixedRateCardProps): ReactElement | null {
  const {
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

  const isLargeScreen = useIsTailwindLargeScreen();

  return (
    <Card
      interactive
      elevation={Elevation.TWO}
      className={classNames(
        { [styles.fixedRatesGrid]: isLargeScreen },
        tw(
          "w-full",
          "max-w-sm",
          "lg:min-w-full",
          "lg:max-w-xl",
          "flex",
          "flex-col",
          "space-y-4",
          "lg:space-y-0",
        ),
      )}
      onClick={onCardClick}
    >
      <LabeledText
        className={tw("text-left", "pl-2")}
        icon={BaseAssetIcon ? <BaseAssetIcon height={36} width={36} /> : null}
        iconClassName={tw("flex-shrink-0")}
        label={t`via ${positionName}`}
        labelClassName={tw("text-xs")}
        textClassName={tw("text-base")}
        text={t`${baseAssetSymbol} Principal Token`}
      />
      <span>
        <Tag large fill intent={isRedeemable ? Intent.SUCCESS : Intent.PRIMARY}>
          {formattedUnlockDate}
        </Tag>
      </span>
      <span className={tw("text-base")}>
        {t`${isLargeScreen ? "" : t`Fixed APR: `} ${formatPercent(fixedRate)} ${
          isLargeScreen ? t`APR` : ""
        }`}
      </span>
      <div className={tw("text-right")}>
        <Button minimal rightIcon={IconNames.CARET_RIGHT} onClick={() => {}}>
          {!isLargeScreen ? t`Continue` : null}
        </Button>
      </div>
    </Card>
  );
}
