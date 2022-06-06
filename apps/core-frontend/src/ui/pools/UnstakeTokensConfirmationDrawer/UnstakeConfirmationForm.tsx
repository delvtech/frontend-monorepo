import React, { ReactElement } from "react";

import { Callout, Divider, InputGroup } from "@blueprintjs/core";
import classNames from "classnames";
import { t } from "ttag";

import tw from "efi-tailwindcss-classnames";
import { useDarkMode } from "ui/prefs/useDarkMode/useDarkMode";
import { ElementIcon } from "ui/token/TokenIcon";

import styles from "./styles.module.css";

interface UnstakeConfirmationFormProps {
  heading?: string;
  amountIn: string;
  /**
   * If set this will override the symbol lookup for assetTwo. This is useful
   * when don't want to show a long principal or yield token symbol in the
   * input
   */
  assetOneSymbol: string;
  /**
   * If set this will override the symbol lookup for assetTwo. This is useful
   * when don't want to show a long principal or yield token symbol in the
   * input
   */
  assetTwoSymbol: string;
  assetOneValueLabel: string;
  assetTwoValueLabel: string;
  children?: ReactElement;
}

export function UnstakeConfirmationForm({
  heading = t`Remove liquidity`,
  amountIn,
  assetOneSymbol,
  assetTwoSymbol,
  assetOneValueLabel,
  assetTwoValueLabel,
  children,
}: UnstakeConfirmationFormProps): ReactElement {
  const { isDarkMode } = useDarkMode();
  return (
    <Callout className={tw("flex", "flex-col", "p-8", "space-y-6")}>
      <span className={classNames("h4", tw("text-center"))}>{heading}</span>
      <div className={tw("flex", "flex-col", "space-y-4", "items-center")}>
        <span className={tw("w-full")}>{t`Remove liquidity`}</span>
        <InputGroup
          large
          fill
          placeholder="0.00"
          disabled
          className={classNames(tw("col-span-6"), styles.inputWithIcon, {
            [styles.inputColor]: !isDarkMode,
            [styles.inputColorDark]: isDarkMode,
          })}
          leftElement={
            <div className={tw("flex", "items-center", "px-2")}>
              <ElementIcon height={18} width={18} />
            </div>
          }
          value={amountIn}
          rightElement={
            <div className={tw("flex", "items-center", "px-3")}>
              {t`LP Tokens`}
            </div>
          }
        />
        <span className={tw("w-full")}>{t`for`}</span>
        <InputGroup
          large
          fill
          placeholder="0.00"
          disabled
          className={classNames(tw("col-span-6"), styles.inputWithIcon, {
            [styles.inputColor]: !isDarkMode,
            [styles.inputColorDark]: isDarkMode,
          })}
          value={assetOneValueLabel}
          rightElement={
            <div className={tw("flex", "items-center", "px-3")}>
              {assetOneSymbol}
            </div>
          }
        />
        <InputGroup
          large
          fill
          disabled
          className={classNames(tw("col-span-6"), styles.inputWithIcon, {
            [styles.inputColor]: !isDarkMode,
            [styles.inputColorDark]: isDarkMode,
          })}
          value={assetTwoValueLabel}
          placeholder="0.00"
          rightElement={
            <div className={tw("flex", "items-center", "px-3")}>
              {assetTwoSymbol}
            </div>
          }
        />
      </div>
      <Divider />
      {children}
    </Callout>
  );
}
