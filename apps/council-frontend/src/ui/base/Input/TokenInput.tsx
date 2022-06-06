import { ChangeEvent, ReactElement, useCallback } from "react";

import classNames from "classnames";
import { t } from "ttag";

interface TokenInputProps {
  className?: string;
  inputClassName?: string;
  screenReaderLabel: string;
  id: string;
  name: string;
  placeholder?: string;
  value?: string | undefined;
  error?: boolean;
  disabled?: boolean;
  showMaxButton?: boolean;
  maxValue?: string;
  onChange: (newValue: string) => void;
}

export default function TokenInput({
  className,
  inputClassName,
  screenReaderLabel,
  id,
  name,
  placeholder,
  value,
  error = false,
  disabled = false,
  showMaxButton = false,
  maxValue,
  onChange,
}: TokenInputProps): ReactElement {
  const onInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const newDepositAmount = event.target.value;
      onChange(newDepositAmount);
    },
    [onChange],
  );

  return (
    <div className={className}>
      <label htmlFor={id} className="sr-only">
        {screenReaderLabel}
      </label>
      <div
        className={classNames("relative", {
          "pointer-events-none": disabled,
          "opacity-50": disabled,
        })}
      >
        <input
          disabled={disabled}
          type="text"
          name={name}
          id={id}
          className={classNames(
            "block w-full rounded-md border-gray-300 text-black shadow-sm sm:text-sm",
            {
              "focus:border-brandDarkBlue": !error,
              "focus:border-red-500": error,
              "border-red-500": error,
              "focus:ring-brandDarkBlue": !error,
              "focus:ring-red-500": error,
            },
            inputClassName,
          )}
          placeholder={placeholder}
          value={value}
          onChange={onInputChange}
        />
        {showMaxButton && maxValue ? (
          <button
            className="bg-principalRoyalBlue absolute top-1/2 right-3 -translate-y-1/2 rounded-md px-2 py-1"
            onClick={() => onChange(maxValue)}
            disabled={disabled}
          >
            <span className="text-xs text-white">{t`MAX`}</span>
          </button>
        ) : null}
      </div>
    </div>
  );
}
