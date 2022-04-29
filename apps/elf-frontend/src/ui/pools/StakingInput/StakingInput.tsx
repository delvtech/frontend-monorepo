import React, { CSSProperties, ReactElement, useCallback } from "react";

import { Button, Classes, InputGroup, Intent } from "@blueprintjs/core";
import classNames from "classnames";
import { BigNumber } from "ethers";
import { formatUnits } from "ethers/lib/utils";
import { t } from "ttag";

import tw from "efi-tailwindcss-classnames";
import { validateInput } from "ui/base/hooks/useNumericInput/useNumericInput";
import { IconProps } from "ui/token/TokenIcon";
import { CryptoSymbol } from "elf/crypto/CryptoSymbol";
import { clipStringValueToDecimals } from "base/math/fixedPoint";
import { calculateLPOutGivenIn } from "elf/pools/calculateLPOutGivenIn";

import styles from "./StakingInput.module.css";

const stakingInputStyle: CSSProperties = {
  height: "96px",
  width: "100%",
  fontSize: 26,
  paddingRight: 64,
  textAlign: "right",
};
interface StakingInputProps {
  cryptoSymbol: CryptoSymbol;
  cryptoDecimals: number | undefined;
  cryptoAssetIcon: React.FC<IconProps> | undefined;
  cryptoBalanceOf: BigNumber | undefined;
  cryptoDisplayBalance: string | number;
  disabled: boolean;
  onPreviewUpdate: (otherNeeded: string, lpOut: string | undefined) => void;
  onChange: (inputValue: string) => void;
  labelTopLeft: string | undefined;
  value: string | undefined;
  validValue: boolean;
  tokenPoolReserves: string | undefined;
  otherTokenPoolReserves: string | undefined;
  totalSupply: string | undefined;
}

export function StakingInput(props: StakingInputProps): ReactElement {
  const {
    cryptoSymbol,
    cryptoDecimals,
    cryptoAssetIcon: CryptoAssetIcon,
    cryptoBalanceOf,
    cryptoDisplayBalance,
    disabled,
    onChange: onChangeFromProps,
    onPreviewUpdate,
    labelTopLeft,
    value = "",
    validValue,
    tokenPoolReserves,
    otherTokenPoolReserves,
    totalSupply,
  } = props;

  const onChange = useOnInputChange(
    onChangeFromProps,
    onPreviewUpdate,
    cryptoDecimals,
    tokenPoolReserves,
    otherTokenPoolReserves,
    totalSupply,
  );

  const setMaxValue = useSetMaxValue(
    cryptoBalanceOf,
    tokenPoolReserves,
    otherTokenPoolReserves,
    totalSupply,
    cryptoDecimals,
    onChangeFromProps,
    onPreviewUpdate,
  );
  return (
    <div className={tw("flex", "flex-col", "space-y-2", "overflow-hidden")}>
      <InputGroup
        disabled={disabled}
        onChange={onChange}
        placeholder={"0.00"}
        value={value}
        style={stakingInputStyle}
        className={classNames(styles.stakingInput, tw("text-right"))}
        large
        intent={validValue ? Intent.NONE : Intent.DANGER}
        rightElement={
          <div
            className={tw(
              "h-full",
              "flex",
              "flex-col",
              "items-center",
              "justify-center",
              "relative",
            )}
          >
            <Button disabled={disabled} onClick={setMaxValue} large>
              {t`MAX`}
            </Button>
          </div>
        }
        leftElement={
          <div
            className={tw(
              "h-full",
              "flex",
              "flex-col",
              "items-center",
              "justify-center",
              "relative",
            )}
          >
            <div
              className={tw(
                "absolute",
                "top-0",
                "left-0",
                "flex",
                "w-auto",
                "p-1",
                "space-x-2",
              )}
            >
              <span
                className={classNames(
                  Classes.TEXT_MUTED,
                  tw("text-xs", "whitespace-no-wrap"),
                )}
              >
                {labelTopLeft}
              </span>
              <span
                className={classNames(
                  Classes.TEXT_MUTED,
                  tw("text-xs", "whitespace-no-wrap", "md:hidden"),
                )}
              >
                {cryptoSymbol}
              </span>
            </div>
            <div className={tw("flex", "text-2xl", "pr-4")}>
              {CryptoAssetIcon ? (
                <div className={tw("flex", "items-center", "pl-2")}>
                  <CryptoAssetIcon height={24} width={24} />
                </div>
              ) : null}
              <span className={tw("pl-2", "hidden", "md:inline")}>
                {cryptoSymbol}
              </span>
            </div>
            <div
              className={tw(
                "absolute",
                "bottom-0",
                "left-0",
                "flex",
                "w-auto",
                "p-1",
                "space-x-2",
              )}
            >
              <span
                className={classNames(
                  tw("text-xs", "whitespace-no-wrap", {
                    "text-danger": !validValue,
                  }),
                  { [Classes.TEXT_MUTED]: validValue },
                )}
              >
                {t`Balance: ${cryptoDisplayBalance} ${cryptoSymbol}`}
              </span>
            </div>
          </div>
        }
      />
    </div>
  );
}

function useOnInputChange(
  onChangeFromProps: (inputValue: string) => void,
  onPreviewUpdate: (otherNeeded: string, lpOut: string | undefined) => void,
  cryptoDecimals: number | undefined,
  tokenPoolReserves: string | undefined,
  otherTokenPoolReserves: string | undefined,
  totalSupply: string | undefined,
) {
  return useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const userInputValue = event.target.value;

      // allow user to clear input
      if (userInputValue === undefined || userInputValue === "") {
        onChangeFromProps("");
        onPreviewUpdate("", undefined);
        return;
      }

      // try to get safe value by handling edge cases and clipping decimals
      const safeValue = clipStringValueToDecimals(
        userInputValue,
        cryptoDecimals || 18,
      );

      // if value is not undefiend, then check if it is valid.  if not, we want to ignore the user's
      // input
      if (!validateInput(safeValue) || safeValue === undefined) {
        return;
      }

      // valid value so ok to set
      onChangeFromProps(safeValue);

      // values may be undefined while loading, prevent calling calcLPOutGivenInFixed
      if (
        !tokenPoolReserves ||
        !otherTokenPoolReserves ||
        !totalSupply ||
        !cryptoDecimals
      ) {
        return;
      }

      const { otherNeeded, lpOut } = calculateLPOutGivenIn(
        safeValue,
        tokenPoolReserves,
        otherTokenPoolReserves,
        totalSupply,
        cryptoDecimals,
      );

      onPreviewUpdate(otherNeeded, lpOut);
    },
    [
      cryptoDecimals,
      onChangeFromProps,
      tokenPoolReserves,
      otherTokenPoolReserves,
      totalSupply,
      onPreviewUpdate,
    ],
  );
}

function useSetMaxValue(
  tokenBalanceOf: BigNumber | undefined,
  tokenPoolReserves: string | undefined,
  otherTokenPoolReserves: string | undefined,
  totalSupply: string | undefined,
  tokenDecimals: number | undefined,
  onChange: (value: string) => void,
  onPreviewUpdate: (value: string, lpOut: string | undefined) => void,
) {
  return useCallback(() => {
    if (tokenBalanceOf) {
      const maxValue = formatUnits(tokenBalanceOf, tokenDecimals);
      // fix this to pass lpOut
      onChange(maxValue);

      // values may be undefined while loading, prevent calling calcLPOutGivenInFixed
      if (
        !tokenPoolReserves ||
        !otherTokenPoolReserves ||
        !totalSupply ||
        !tokenDecimals
      ) {
        return;
      }
      const { otherNeeded, lpOut } = calculateLPOutGivenIn(
        maxValue,
        tokenPoolReserves,
        otherTokenPoolReserves,
        totalSupply,
        tokenDecimals,
      );
      onPreviewUpdate(otherNeeded, lpOut);
    }
  }, [
    tokenBalanceOf,
    tokenDecimals,
    onChange,
    tokenPoolReserves,
    otherTokenPoolReserves,
    totalSupply,
    onPreviewUpdate,
  ]);
}
