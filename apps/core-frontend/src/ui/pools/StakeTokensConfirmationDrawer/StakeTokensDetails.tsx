import { ReactElement } from "react";

import { t } from "ttag";

import tw from "efi-tailwindcss-classnames";
import { LabeledText } from "ui/base/LabeledText/LabeledText";
import { formatPercent } from "base/formatPercent/formatPercent";

/**
 * Generalize this further to handle any transaction confirmation
 */
interface StakeTokensDetailsProps {
  shareOfPool: number;
  poolAPY: number;
  poolFees: number;
  isPrincipalPool: boolean;
}
export function StakeTokensDetails({
  shareOfPool,
  poolAPY,
  poolFees,
  isPrincipalPool,
}: StakeTokensDetailsProps): ReactElement {
  const shareOfPoolPercent = formatPercent(shareOfPool);
  const poolAPYLabel = formatPercent(poolAPY);
  const poolFeesFormatted = formatPercent(poolFees);
  const poolFeesLabel = isPrincipalPool
    ? t`${poolFeesFormatted} (current)`
    : poolFeesFormatted;

  return (
    <div className={tw("flex", "flex-col", "space-y-6", "items-center")}>
      <LabeledText
        muted={false}
        bold
        containerClassName={tw("justify-center")}
        text={<span>{t`Share of pool`}</span>}
        className={tw("items-center")}
        label={<span className={tw("text-base")}>{shareOfPoolPercent}</span>}
      />
      <LabeledText
        bold
        muted={false}
        containerClassName={tw("justify-center")}
        className={tw("items-center")}
        text={<span>{t`LP APY`}</span>}
        label={<span className={tw("text-base")}>{poolAPYLabel}</span>}
      />
      <LabeledText
        muted={false}
        bold
        containerClassName={tw("justify-center")}
        text={<span>{t`Pool fees`}</span>}
        className={tw("items-center")}
        label={<span className={tw("text-base")}>{poolFeesLabel}</span>}
      />
    </div>
  );
}
