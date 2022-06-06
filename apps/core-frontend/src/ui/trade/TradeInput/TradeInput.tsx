import React, { CSSProperties, ReactElement, useCallback } from "react";

import { Button, Classes, InputGroup, Intent } from "@blueprintjs/core";
import classNames from "classnames";
import { BigNumber } from "ethers";
import { formatUnits } from "ethers/lib/utils";
import { t } from "ttag";

import tw from "efi-tailwindcss-classnames";
import { SwapKind } from "integrations/balancer/SwapKind";
import { validateInput } from "ui/base/hooks/useNumericInput/useNumericInput";
import { IconProps } from "ui/token/TokenIcon";
import { clipStringValueToDecimals } from "base/math/fixedPoint";
import { PoolContract } from "elf/pools/PoolContract";

import styles from "./TradeInput.module.css";

const tradeInputStyle: CSSProperties = {
  height: "96px",
  width: "100%",
  fontSize: 26,
  paddingRight: 64,
  textAlign: "right",
};

interface TradeInputProps {
  cryptoIcon: React.FC<IconProps> | undefined;
  cryptoSymbol: string | undefined;
  cryptoDecimals: number | undefined;
  cryptoBalanceOf: BigNumber | undefined;
  cryptoDisplayBalance: string | number;
  previewCryptoAddress: string | undefined;
  previewCryptoPoolIndex: number | undefined;

  labelTopLeft: string;
  disabled: boolean;
  onChange: (value: string, swapKind: SwapKind) => void;
  value: string | undefined;
  validValue: boolean;
  swapKind: SwapKind;
  pool: PoolContract | undefined;
}

export function TradeInput(props: TradeInputProps): ReactElement {
  const {
    cryptoSymbol,
    cryptoIcon: CryptoIcon,
    cryptoDecimals,
    cryptoBalanceOf,
    cryptoDisplayBalance,
    labelTopLeft,
    disabled,
    onChange: onChangeFromProps,
    value = "",
    validValue,
    swapKind,
  } = props;
  // handles user input changes.  call onChangeFromProps to tell the parent the value changed.  also
  // updates the internal value.  if the user clears the inputs, we also call onPreviewUpdate to
  // clear the preview.

  const onChange = useOnInputChange(
    onChangeFromProps,
    cryptoDecimals,
    swapKind,
  );
  // TODO: disable setting max value if the user balance >  pool balance.  better yet, disable max
  // value if the trade would cause too much slippage.

  // sets the max value for the input
  const setMaxValue = useSetMaxValue(
    cryptoBalanceOf, // the max value
    cryptoDecimals,
    swapKind,
    onChangeFromProps,
  );

  return (
    <div className={tw("flex", "flex-col", "space-y-2", "overflow-hidden")}>
      <InputGroup
        disabled={disabled}
        onChange={onChange}
        placeholder={"0.00"}
        value={value}
        style={tradeInputStyle}
        className={classNames(styles.depositInput, tw("text-right"))}
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
                  tw("text-xs", "whitespace-no-wrap", "lg:hidden"),
                )}
              >
                {cryptoSymbol}
              </span>
            </div>
            <div className={tw("flex", "text-2xl", "pr-4")}>
              {CryptoIcon ? (
                <div className={tw("flex", "items-center", "pl-2")}>
                  <CryptoIcon height={24} width={24} />
                </div>
              ) : null}
              <span className={tw("hidden", "lg:inline", "pl-2")}>
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
                {t`Balance:`} {`${cryptoDisplayBalance} ${cryptoSymbol}`}
              </span>
            </div>
          </div>
        }
      />
    </div>
  );
}
function useOnInputChange(
  onChange: (value: string, swapKind: SwapKind) => void,
  cryptoDecimals: number | undefined,
  swapKind: SwapKind,
) {
  return useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const userInputValue = event.target.value;
      // checks for valid values before reporting to parent
      validateAndSetValue(userInputValue, onChange, cryptoDecimals, swapKind);
    },
    [onChange, cryptoDecimals, swapKind],
  );
}

function useSetMaxValue(
  tokenBalanceOf: BigNumber | undefined,
  tokenDecimals: number | undefined,
  swapKind: SwapKind,
  onChange: (value: string, swapKind: SwapKind) => void,
) {
  return useCallback(() => {
    if (tokenBalanceOf) {
      const maxValue = formatUnits(tokenBalanceOf, tokenDecimals);
      onChange(maxValue, swapKind);
    }
  }, [tokenBalanceOf, tokenDecimals, onChange, swapKind]);
}

function validateAndSetValue(
  value: string,
  onChange: (value: string, swapKind: SwapKind) => void,
  cryptoDecimals: number | undefined,
  swapKind: SwapKind,
) {
  // allow user to clear input
  if (value === "" || value === undefined) {
    onChange("", swapKind);
    return;
  }

  // get safe value by handling edge cases and clipping decimals
  const safeValue = clipStringValueToDecimals(value, cryptoDecimals || 18);

  // if value is not undefiend, then check if its invalid.  if so, we want to ignore the user's input
  if (!validateInput(safeValue) || safeValue === undefined) {
    return;
  }

  // since this is a controlled component, we let the parent know what to update the value to
  onChange(safeValue, swapKind);
}
