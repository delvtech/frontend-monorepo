import React, { ChangeEvent, ReactElement, useCallback } from "react";

import { Callout, Divider, InputGroup } from "@blueprintjs/core";
import classNames from "classnames";
import { t } from "ttag";

import tw from "efi-tailwindcss-classnames";
import { useDarkMode } from "ui/prefs/useDarkMode/useDarkMode";
import { ANY_NUMBER_REGEX } from "base/numbers";

import styles from "./styles.module.css";

interface SwapDetailsFormProps {
  assetInSymbol: string | undefined;
  assetOutSymbol: string | undefined;
  amountIn: string | undefined;
  amountInLabel?: string;
  amountOut?: string;
  amountOutLabel?: string;
  heading?: string;

  /**
   * If provided, this will make the input interactive, otherwise it will be
   * disabled and read-only
   */
  onAmountInChange?: (amoutOut: string | undefined) => void;
  /**
   * If provided, this will make the input interactive, otherwise it will be
   * disabled and read-only
   */
  onAmountOutChange?: (amoutOut: string | undefined) => void;
  children?: ReactElement;
}
export function SwapDetailsForm({
  amountIn,
  amountInLabel = t`From`,
  amountOut,
  amountOutLabel = t`To`,
  assetInSymbol,
  assetOutSymbol,
  heading = t`Trade Confirmation`,
  onAmountInChange: onAmountInChangeFromProps,
  onAmountOutChange: onAmountOutChangeFromProps,
  children,
}: SwapDetailsFormProps): ReactElement {
  const { isDarkMode } = useDarkMode();
  const onAmountInChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (!event.target.value.match(ANY_NUMBER_REGEX)) {
        return;
      }
      onAmountInChangeFromProps?.(event.target.value);
    },
    [onAmountInChangeFromProps],
  );
  const onAmountOutChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (!event.target.value.match(ANY_NUMBER_REGEX)) {
        return;
      }
      onAmountOutChangeFromProps?.(event.target.value);
    },
    [onAmountOutChangeFromProps],
  );

  return (
    <Callout className={tw("flex", "flex-col", "p-8", "space-y-6")}>
      <span className={classNames("h4", tw("text-center"))}>{heading}</span>
      <div className={tw("flex", "flex-col", "space-y-4", "items-center")}>
        <div
          className={tw(
            "grid",
            "grid-cols-6",
            "place-items-stretch",
            "w-full",
            "items-center",
            "gap-2",
          )}
        >
          <span className={tw("text-sm", "font-semibold")}>
            {amountInLabel}
          </span>
          <InputGroup
            large
            fill
            placeholder="0.00"
            disabled={!onAmountInChangeFromProps}
            onChange={onAmountInChange}
            className={classNames(tw("col-span-5"), styles.inputWithIcon, {
              [styles.inputColor]: !isDarkMode,
              [styles.inputColorDark]: isDarkMode,
            })}
            value={amountIn}
            rightElement={
              <div className={tw("flex", "items-center", "px-3")}>
                {assetInSymbol}
              </div>
            }
          />
        </div>
        {amountOut === undefined ? null : (
          <div
            className={tw(
              "grid",
              "grid-cols-6",
              "place-items-stretch",
              "w-full",
              "items-center",
              "gap-2",
            )}
          >
            <span className={tw("text-sm", "font-semibold")}>
              {amountOutLabel}
            </span>
            <InputGroup
              large
              fill
              disabled={!onAmountOutChangeFromProps}
              onChange={onAmountOutChange}
              className={classNames(tw("col-span-5"), styles.inputWithIcon, {
                [styles.inputColor]: !isDarkMode,
                [styles.inputColorDark]: isDarkMode,
              })}
              value={amountOut}
              placeholder="0.00"
              rightElement={
                <div className={tw("flex", "items-center", "px-3")}>
                  {assetOutSymbol}
                </div>
              }
            />
          </div>
        )}
      </div>
      <Divider />
      {children}
    </Callout>
  );
}
