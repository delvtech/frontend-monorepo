import { ReactElement, ReactNode } from "react";

import { Classes } from "@blueprintjs/core";
import classNames from "classnames";

import tw from "efi-tailwindcss-classnames";

interface LabeledTextProps {
  /**
   * The main text the user needs to see
   */
  text: ReactNode;

  icon?: ReactNode;
  /**
   * A label to render alongside the text that's more subtle
   */
  label: ReactNode;

  /**
   * Whether to apply muted text color to the label. This is useful when
   * rendering on top of backgrounds that with low contrast like Callouts.
   */
  muted?: boolean;

  large?: boolean;

  subLabel?: ReactNode;

  /**
   * Louder styling for the text
   */
  bold?: boolean;

  className?: string;

  containerItemsCenter?: boolean;

  iconClassName?: string;
  textClassName?: string;
  labelClassName?: string;
  containerClassName?: string;
}

export function LabeledText({
  text,
  label,
  subLabel,
  bold = false,
  muted = true,
  className,
  textClassName,
  labelClassName,
  iconClassName,
  containerClassName,
  containerItemsCenter = true,
  icon,
  large = false,
}: LabeledTextProps): ReactElement {
  return (
    <div
      className={classNames(
        tw("flex", { "items-center": containerItemsCenter }, "w-full"),
        containerClassName,
      )}
    >
      {icon && <div className={iconClassName}>{icon}</div>}
      <div className={classNames(tw("flex", "flex-col"), className)}>
        <span
          className={classNames(
            tw({ "font-semibold": bold, "text-lg": large }),
            textClassName,
          )}
        >
          {text}
        </span>
        <span
          className={classNames(
            { [Classes.TEXT_MUTED]: muted },
            labelClassName ? labelClassName : tw("text-sm"),
          )}
        >
          {label}
        </span>
        {!!subLabel && (
          <span className={classNames(Classes.TEXT_MUTED, tw("text-sm"))}>
            {subLabel}
          </span>
        )}
      </div>
    </div>
  );
}
