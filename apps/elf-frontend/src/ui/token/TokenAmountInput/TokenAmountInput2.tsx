import { CSSProperties, ReactElement, useCallback } from "react";

import { FormGroup, InputGroup, Intent, Tag } from "@blueprintjs/core";
import classNames from "classnames";
import { BigNumber } from "ethers";
import { formatUnits } from "ethers/lib/utils";
import { t } from "ttag";

import tw from "efi-tailwindcss-classnames";
import { validateInput } from "ui/base/hooks/useNumericInput/useNumericInput";
import { useDarkMode } from "ui/prefs/useDarkMode/useDarkMode";
import styles from "ui/token/TokenAmountInput/TokenAmountInput.module.css";
import { clipStringValueToDecimals } from "base/math/fixedPoint";

interface TokenAmountInput2Props {
  formGroupClassName?: string;
  /**
   * Useful to make large inputs or other custom looking inputs
   */
  inputGroupStyle?: CSSProperties;
  intent?: Intent;
  leftIcon?: ReactElement;
  onValueChange: (value: string) => void;
  placeholder?: string;
  showMaxButton: boolean;
  value: string;
  maxAmount: BigNumber | undefined;
  tokenDecimals: number | undefined;
}

export function TokenAmountInput2(props: TokenAmountInput2Props): ReactElement {
  const {
    formGroupClassName,
    inputGroupStyle,
    value,
    showMaxButton,
    intent,
    placeholder,
    onValueChange: onChangeFromProps,
    leftIcon,
    tokenDecimals,
    maxAmount,
  } = props;
  const { isDarkMode } = useDarkMode();

  const onChange = useOnInputChange(onChangeFromProps, tokenDecimals);

  const setMaxValue = useSetMaxValue(
    maxAmount, // the max value
    tokenDecimals,
    onChangeFromProps,
  );

  const maxButtonElement = showMaxButton ? (
    <div className={tw("pl-3", "mr-3")}>
      <Tag large minimal interactive onClick={setMaxValue}>{t`MAX`}</Tag>
    </div>
  ) : undefined;

  return (
    <FormGroup className={classNames(tw("w-full", "mb-0"), formGroupClassName)}>
      <InputGroup
        placeholder={placeholder}
        intent={intent}
        style={inputGroupStyle}
        className={classNames(tw("w-full"), styles.investmentAmount, {
          [styles.investmentAmountLightMode]: !isDarkMode,
        })}
        value={value || ""}
        leftElement={leftIcon}
        rightElement={maxButtonElement}
        onChange={onChange}
      />
    </FormGroup>
  );
}

function useOnInputChange(
  onChange: (value: string) => void,
  cryptoDecimals: number | undefined,
) {
  return useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const userInputValue = event.target.value;
      // checks for valid values before reporting to parent
      validateAndSetValue(userInputValue, onChange, cryptoDecimals);
    },
    [onChange, cryptoDecimals],
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
      onChange(maxValue);
    }
  }, [tokenBalanceOf, tokenDecimals, onChange]);
}

function validateAndSetValue(
  value: string,
  onChange: (value: string) => void,
  cryptoDecimals: number | undefined,
) {
  // allow user to clear input
  if (value === "" || value === undefined) {
    onChange("");
    return;
  }

  // get safe value by handling edge cases and clipping decimals
  const safeValue = clipStringValueToDecimals(value, cryptoDecimals || 18);

  // if value is not undefiend, then check if its invalid.  if so, we want to ignore the user's input
  if (!validateInput(safeValue) || safeValue === undefined) {
    return;
  }

  // since this is a controlled component, we let the parent know what to update the value to
  onChange(safeValue);
}
