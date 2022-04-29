import React, { ReactElement } from "react";

import { Classes, Colors, Icon } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import classNames from "classnames";
import { t } from "ttag";

import tw from "efi-tailwindcss-classnames";
import { LabeledText } from "ui/base/LabeledText/LabeledText";
import { useGasPrice } from "ui/ethereum/hooks/useGasPrice";

export function GasPriceWidget(): ReactElement {
  const { data: gasPrice, isLoading } = useGasPrice();

  const text = isLoading ? t`loading` : t`${gasPrice?.fast?.toFixed(0)} gwei`;

  return (
    <LabeledText
      large
      text={text}
      textClassName={classNames({ [Classes.SKELETON]: isLoading })}
      label={t`gas price`}
      icon={
        <Icon
          icon={IconNames.OIL_FIELD}
          iconSize={48}
          color={Colors.GRAY1}
          className={tw("pr-4")}
        />
      }
    />
  );
}
