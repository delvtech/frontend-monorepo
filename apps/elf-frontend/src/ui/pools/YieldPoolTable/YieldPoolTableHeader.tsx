import { Classes } from "@blueprintjs/core";
import classNames from "classnames";
import { t } from "ttag";
import tw from "efi-tailwindcss-classnames";
import styles from "ui/pools/YieldPoolTable/grid.module.css";
import { ReactElement } from "react";

interface YieldPoolTableHeaderProps {
  className?: string;
}

export function YieldPoolTableHeader({
  className,
}: YieldPoolTableHeaderProps): ReactElement {
  return (
    <div
      className={classNames(
        // padding to match Card default padding, keeps text alignment correct
        // with card content
        tw("px-5"),
        styles.yieldPoolGridColumns,
        Classes.TEXT_MUTED,
        className,
      )}
    >
      <div>{t`Pool`}</div>
      <div>{t`Liquidity`}</div>
      <div>{t`LP APY`}</div>
      <div>{t`Vault APY`}</div>
      <div>{t`Price`}</div>
      <div>{t`Term`}</div>
    </div>
  );
}
