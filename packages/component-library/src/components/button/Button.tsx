import classNames from "classnames";
import { ReactElement } from "react";
import { Variant } from "src/components/variants";

interface ButtonProps {
  children: string | ReactElement;
  variant?: Extract<
    Variant,
    /* only some variants are supported */
    "accent" | "info" | "success" | "warning" | "error"
  >;

  size?: "normal" | "small";
  outline?: boolean;
  onClick: () => any;
}

export function Button({
  children,
  variant = "accent",
  size = "normal",
  outline,
  onClick,
}: ButtonProps): ReactElement {
  return (
    <button
      className={classNames("daisy-btn", {
        "daisy-btn-sm": size === "small",
        "daisy-btn-outline": outline,
        "daisy-btn-accent": variant === "accent",
        "daisy-btn-info": variant === "info",
        "daisy-btn-warning": variant === "warning",
        "daisy-btn-success": variant === "success",
        "daisy-btn-error": variant === "error",
      })}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
