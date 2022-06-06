import React, { ReactElement } from "react";

import { Callout, Divider, InputGroup } from "@blueprintjs/core";
import classNames from "classnames";
import { t } from "ttag";

import tw from "efi-tailwindcss-classnames";
import { useDarkMode } from "ui/prefs/useDarkMode/useDarkMode";

import styles from "./styles.module.css";

interface StakeConfirmationFormProps {
  heading?: string;
  /**
   * If set this will override the symbol lookup for assetTwo. This is useful
   * when don't want to show a long principal or yield token symbol in the
   * input
   */
  assetOneSymbol?: string | undefined;
  /**
   * If set this will override the symbol lookup for assetTwo. This is useful
   * when don't want to show a long principal or yield token symbol in the
   * input
   */
  assetTwoSymbol?: string | undefined;
  assetOneValueLabel?: string | undefined;
  assetTwoValueLabel?: string | undefined;
  children?: ReactElement;
}

export function StakeConfirmationForm({
  heading = t`Add Liquidity`,
  assetOneSymbol,
  assetTwoSymbol,
  assetOneValueLabel,
  assetTwoValueLabel,
  children,
}: StakeConfirmationFormProps): ReactElement {
  const { isDarkMode } = useDarkMode();
  return (
    <Callout className={tw("flex", "flex-col", "p-8", "space-y-6")}>
      <span className={classNames("h4", tw("text-center"))}>{heading}</span>
      <div className={tw("flex", "flex-col", "space-y-4", "items-center")}>
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
