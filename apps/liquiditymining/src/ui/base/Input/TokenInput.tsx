import { ChangeEvent, ReactElement, useCallback } from "react";

import classNames from "classnames";
import { t } from "ttag";
import { PropsOf } from "src/@types/helper";

interface TokenInputProps extends Omit<PropsOf<"input">, "onChange"> {
  screenReaderLabel: string;
  error?: boolean;
  maxValue?: string;
  onChange: (newValue: string) => void;
}

export default function TokenInput({
  className,
  screenReaderLabel,
  error = false,
  maxValue,
  onChange,
  id,
  disabled,
  ...inputProps
}: TokenInputProps): ReactElement {
  const onInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const newDepositAmount = event.target.value;
      onChange(newDepositAmount);
    },
    [onChange],
  );

  return (
    <div
      className={classNames(
        "flex h-12 items-center gap-2 rounded-md border border-gray-300 bg-white py-2 px-3 text-black focus-within:ring",
        {
          "pr-2": maxValue,
          "focus-within:ring-brandDarkBlue": !error,
          "border-red-500 focus-within:ring-red-500": error,
        },
        className,
      )}
    >
      <label htmlFor={id} className="sr-only">
        {screenReaderLabel}
      </label>
      <input
        className="h-full w-full flex-1 focus:border-none focus:outline-none"
        id={id}
        onChange={onInputChange}
        disabled={disabled}
        {...inputProps}
      />
      {maxValue ? (
        <button
          className="h-full shrink-0 rounded-md bg-hackerSky px-4 text-xs text-principalRoyalBlue hover:bg-hackerSky-dark"
          onClick={() => onChange(maxValue)}
          disabled={disabled}
        >
          {t`MAX`}
        </button>
      ) : null}
    </div>
  );
}
