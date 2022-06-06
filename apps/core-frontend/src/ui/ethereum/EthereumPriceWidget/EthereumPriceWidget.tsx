import React, { ReactElement } from "react";

import { Classes, Colors, Icon } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import classNames from "classnames";
import { Currencies } from "ts-money";
import { t } from "ttag";

import { LabeledText } from "ui/base/LabeledText/LabeledText";
import { useEthPrice } from "ui/ethereum/hooks/useEthPrice";
import { useCurrencyPref } from "ui/prefs/useCurrency/useCurencyPref";

export function EthereumPriceWidget(): ReactElement {
  const { currency } = useCurrencyPref();
  const { isLoading, data: ethPrice } = useEthPrice(currency);

  const icon =
    currency.code === Currencies.USD.code ? IconNames.DOLLAR : IconNames.EURO;
  const text = isLoading ? t`loading` : t`${ethPrice} ${currency.code}`;

  return (
    <LabeledText
      large
      text={text}
      textClassName={classNames({ [Classes.SKELETON]: isLoading })}
      label={t`ETH price`}
      icon={<Icon icon={icon} iconSize={48} color={Colors.GRAY1} />}
    />
  );
}
