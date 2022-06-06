import React, { CSSProperties, ReactElement, useCallback } from "react";

import { Button, Classes, InputGroup, Intent } from "@blueprintjs/core";
import classNames from "classnames";
import { BigNumber } from "ethers";
import { formatUnits } from "ethers/lib/utils";
import { t } from "ttag";

import tw from "efi-tailwindcss-classnames";
import { validateInput } from "ui/base/hooks/useNumericInput/useNumericInput";
import { TokenIcon } from "ui/token/TokenIcon";
import { clipStringValueToDecimals } from "base/math/fixedPoint";

import styles from "./UnstakeInput.module.css";

const stakingInputStyle: CSSProperties = {
  height: "96px",
  width: "100%",
  fontSize: 26,
  paddingRight: 64,
  textAlign: "right",
};

interface UnstakeInputProps {
  cryptoSymbol: string;
  cryptoDecimals: number;
  cryptoAssetIcon: TokenIcon;
  cryptoBalanceOf: BigNumber | undefined;
  cryptoDisplayBalance: string;
  disabled: boolean;
  onChange: (inputValue: string) => void;
  label: string;
  value: string;
  validValue: boolean;
}

export function UnstakeInput(props: UnstakeInputProps): ReactElement {
  const {
    cryptoSymbol,
    cryptoDecimals,
    cryptoAssetIcon: CryptoAssetIcon,
    cryptoBalanceOf,
    cryptoDisplayBalance,
    disabled,
    onChange: onChangeFromProps,
    label,
    value = "",
    validValue,
  } = props;

  const onChange = useOnInputChange(onChangeFromProps, cryptoDecimals);

  const setMaxValue = useSetMaxValue(
    cryptoBalanceOf,
    cryptoDecimals,
    onChangeFromProps,
  );
  return (
    <div className={tw("flex", "flex-col", "space-y-2", "w-full")}>
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
                {cryptoSymbol}
              </span>
            </div>
            <div className={tw("flex", "text-2xl", "pr-4")}>
              {CryptoAssetIcon ? (
                <div className={tw("flex", "items-center", "px-2")}>
                  <CryptoAssetIcon height={24} width={24} />
                </div>
              ) : null}
              <span>{label}</span>
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
                {t`Balance: ${cryptoDisplayBalance}`}
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
  cryptoDecimals: number | undefined,
) {
  return useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const userInputValue = event.target.value;

      // allow user to clear input
      if (userInputValue === undefined || userInputValue === "") {
        onChangeFromProps("");
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
      if (!cryptoDecimals) {
        return;
      }
    },
    [cryptoDecimals, onChangeFromProps],
  );
}

function useSetMaxValue(
  tokenBalanceOf: BigNumber | undefined,
  tokenDecimals: number | undefined,
  onChange: (value: string) => void,
) {
  return useCallback(() => {
    if (tokenBalanceOf) {
      const maxValue = formatUnits(tokenBalanceOf, tokenDecimals);
      // fix this to pass lpOut
      onChange(maxValue);

      // values may be undefined while loading, prevent calling calcLPOutGivenInFixed
      if (!tokenDecimals) {
        return;
      }
    }
  }, [tokenBalanceOf, tokenDecimals, onChange]);
}
