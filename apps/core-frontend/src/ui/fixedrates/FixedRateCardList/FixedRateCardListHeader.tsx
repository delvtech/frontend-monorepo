import classNames from "classnames";
import tw from "efi-tailwindcss-classnames";
import { ReactElement } from "react";
import { t } from "ttag";
import styles from "ui/fixedrates/grid.module.css";

interface FixedRateCardListHeaderProps {
  hide?: boolean;
}

export function FixedRateCardListHeader(
  props: FixedRateCardListHeaderProps,
): ReactElement | null {
  if (props.hide) {
    return null;
  }

  return (
    <div
      className={classNames(
        styles.fixedRatesZapGrid,
        tw("text-base", "text-left", "pb-2"),
      )}
    >
      <span>{t`Principal Tokens`}</span>
      <span>{t`Input Tokens`}</span>
      <span>{t`Term Period`}</span>
      <span>{t`Fixed APR`}</span>
      <span />
    </div>
  );
}
