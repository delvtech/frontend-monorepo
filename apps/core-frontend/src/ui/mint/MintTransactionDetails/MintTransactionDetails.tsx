import { ReactElement } from "react";

import { t } from "ttag";

import tw from "efi-tailwindcss-classnames";
import { LabeledText } from "ui/base/LabeledText/LabeledText";
import { formatFullDate } from "base/dates/dates";

/**
 * Generalize this further to handle any transaction confirmation
 */
interface MintTransactionDetailsProps {
  principalTokenSymbol: string | undefined;
  yieldTokenSymbol: string | undefined;
  numPrincipalTokens: number | undefined;
  numYieldTokens: number | undefined;
  unlockTimestamp: Date | undefined;
}
export function MintTransactionDetails({
  principalTokenSymbol,
  yieldTokenSymbol,
  numPrincipalTokens,
  numYieldTokens,
  unlockTimestamp,
}: MintTransactionDetailsProps): ReactElement {
  const unlockTimeStampLabel = unlockTimestamp
    ? formatFullDate(unlockTimestamp)
    : undefined;
  return (
    <div className={tw("flex", "flex-col", "space-y-6", "items-center")}>
      <LabeledText
        bold
        muted={false}
        className={tw("items-start")}
        text={<span>{t`Principal Tokens you receive`}</span>}
        label={
          <span className={tw("text-base")}>{t`${numPrincipalTokens?.toFixed(
            4,
          )} ${principalTokenSymbol}`}</span>
        }
      />
      <LabeledText
        muted={false}
        bold
        className={tw("items-start")}
        text={<span>{t`Yield Tokens you receive`}</span>}
        label={
          <span className={tw("text-base")}>
            {t`${numYieldTokens?.toFixed(4)} ${yieldTokenSymbol}`}
          </span>
        }
      />
      <LabeledText
        bold
        muted={false}
        text={<span>{t`Term date`}</span>}
        className={tw("items-start")}
        label={<span className={tw("text-base")}>{unlockTimeStampLabel}</span>}
      />
    </div>
  );
}
