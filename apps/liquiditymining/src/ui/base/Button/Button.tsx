// See: https://tailwindui.com/components/application-ui/elements/buttons

import { MouseEventHandler, ReactElement, ReactNode } from "react";

import classNames from "classnames";
import { ButtonStyles, getButtonClass } from "src/ui/base/Button/styles";

import { Spinner } from "src/ui/base/Spinner/Spinner";
import { PropsOf } from "src/@types/helper";

export interface ButtonProps extends ButtonStyles, PropsOf<"button"> {
  children: ReactNode;
  className?: string;
  loading?: boolean;
}

export default function Button({
  disabled,
  variant,
  size,
  round,
  fill,
  loading = false,
  children,
  error,
  className,
  ...buttonProps
}: ButtonProps): ReactElement {
  const buttonClassName = getButtonClass({
    variant,
    size,
    round,
    fill,
    disabled: disabled || loading,
    error,
  });

  return (
    <button
      disabled={disabled || loading}
      type="button"
      className={classNames(buttonClassName, className)}
      {...buttonProps}
    >
      {loading ? (
        <div className="w-full justify-center">
          <Spinner />
        </div>
      ) : (
        children
      )}
    </button>
  );
}
