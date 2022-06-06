import React, { Fragment, ReactElement, ReactNode } from "react";

import { Classes, H2 } from "@blueprintjs/core";
import classNames from "classnames";

import tw from "efi-tailwindcss-classnames";

interface ViewTitleProps {
  title: ReactNode;
  bottomTitle?: ReactNode;
  subtitle: ReactNode;
  /**
   * Whether or not to show the beta tag
   */
  titleTag?: ReactNode;
  className?: string;
}

const subtitleClassName = classNames(
  Classes.RUNNING_TEXT,
  Classes.TEXT_MUTED,
  tw("text-base"),
);

export function ViewTitle({
  title,
  subtitle,
  className,
  titleTag,
  bottomTitle,
}: ViewTitleProps): ReactElement {
  return (
    <div
      className={classNames(tw("flex", "justify-between", "w-full"), className)}
    >
      <div className={tw("flex", "flex-col", "justify-start", "flex-1")}>
        <div>
          <H2 className={!bottomTitle ? tw("mb-4", "flex-1") : ""}>
            {title}
            {!titleTag && bottomTitle ? null : (
              <Fragment>
                {" "}
                <span>
                  <sup>{titleTag}</sup>
                </span>
              </Fragment>
            )}
          </H2>
        </div>
        {bottomTitle ? (
          <div>
            <H2 className={tw("mb-4")}>{bottomTitle}</H2>
          </div>
        ) : null}
        <div>
          <span className={subtitleClassName}>{subtitle}</span>
        </div>
      </div>
    </div>
  );
}
