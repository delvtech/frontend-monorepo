import React, { ReactElement } from "react";

import { AnchorButton, Button, Classes } from "@blueprintjs/core";
import { Tooltip2 } from "@blueprintjs/popover2";
import classNames from "classnames";
import { t } from "ttag";

import tw from "efi-tailwindcss-classnames";
import { LabeledText } from "ui/base/LabeledText/LabeledText";
import styles from "ui/base/table.module.css";
import { useDarkMode } from "ui/prefs/useDarkMode/useDarkMode";

export function LiquidityPositionTableRow(): ReactElement {
  const { isDarkMode } = useDarkMode();

  const tableRowClassName = isDarkMode ? styles.tableRowDark : styles.tableRow;

  return (
    <div
      className={classNames(
        tableRowClassName,
        tw("grid", "grid-cols-5", "w-full", "gap-2", "p-4"),
      )}
    >
      {/* Pool name */}
      <div>
        <LabeledText text={t`fyETH - ETH`} label="" />
      </div>

      {/* Quantity */}
      <div className={Classes.RUNNING_TEXT}>
        <div>50.000000 fyETH</div>
        <div>4.000000 ETH</div>
      </div>

      {/* Total fees earned */}
      <div className={Classes.RUNNING_TEXT}>
        <div>0.000032 fyETH</div>
        <div>0.000011 ETH</div>
      </div>

      {/* Share of pool */}
      <div>
        <LabeledText text={t`0.51%`} label={t`62,105.23 USD`} />
      </div>

      {/* Quick Actions */}
      <div className={tw("flex", "flex-col", "h-full", "w-full", "space-y-2")}>
        <Button outlined>{t`Unstake`}</Button>
        <Tooltip2
          inheritDarkTheme={false}
          content={t`This position can be claimed after the fyEth reaches maturity.`}
        >
          <AnchorButton
            fill
            outlined
            disabled={
              /*
               * See Blueprint docs, we have to use an AnchorButton for a11y
               * when putting a tooltip on a disabled button
               */
              true
            }
          >
            {t`Claim`}
          </AnchorButton>
        </Tooltip2>
        <Button outlined>{t`Go to market`}</Button>
      </div>
    </div>
  );
}
