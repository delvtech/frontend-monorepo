import React, { ReactElement } from "react";

import { Alignment, Classes, Icon, Position, Tooltip } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import classNames from "classnames";

import tw from "efi-tailwindcss-classnames";
import styles from "ui/base/FormGroupLabel/FormGroupLabel.module.css";

interface FormGroupLabelProps {
  label: string;
  tooltipContent?: string | JSX.Element;
  large?: boolean;
  fill?: boolean;
  alignIndicator?: Alignment;
}

export function FormGroupLabel({
  label,
  tooltipContent,
  large,
  fill,
  alignIndicator = Alignment.LEFT,
}: FormGroupLabelProps): ReactElement {
  return (
    <div
      className={classNames(
        tw(
          "flex",
          {
            "justify-between": fill,
            "space-x-2": !fill,
          },
          "items-center",
        ),
        Classes.TEXT_MUTED,
      )}
    >
      {tooltipContent && alignIndicator === Alignment.LEFT && (
        <Tooltip
          className={styles.tooltip}
          inheritDarkTheme={false}
          position={Position.TOP}
          content={tooltipContent}
        >
          <Icon icon={IconNames.INFO_SIGN} />
        </Tooltip>
      )}

      <span
        className={classNames(
          tw({ "text-base": large }),
          Classes.TEXT_MUTED,
          styles.tooltipLabel,
        )}
      >
        {label}
      </span>

      {tooltipContent && alignIndicator === Alignment.RIGHT && (
        <Tooltip
          className={styles.tooltip}
          inheritDarkTheme={false}
          position={Position.TOP}
          content={tooltipContent}
        >
          <Icon icon={IconNames.INFO_SIGN} />
        </Tooltip>
      )}
    </div>
  );
}
