import React, { FC } from "react";

import { Callout } from "@blueprintjs/core";
import { t } from "ttag";

import tw from "efi-tailwindcss-classnames";
import { LabeledText } from "ui/base/LabeledText/LabeledText";

interface YieldTokenPreviewProps {
  /**
   * The number of yield tokens to display
   */
  amount: number | undefined;
  baseAssetSymbol: string | undefined;
  baseAssetDecimals: number | undefined;
}

const calloutClassName = tw(
  "flex",
  "flex-col",
  "flex-1",
  "h-full",
  "p-8",
  "items-center",
  "justify-center",
);

export const YieldTokenPreview: FC<YieldTokenPreviewProps> = ({
  amount,
  baseAssetSymbol,
}) => {
  return (
    <Callout className={calloutClassName}>
      <LabeledText
        muted={false}
        bold
        className={tw(
          "flex",
          "justify-center",
          "flex-col-reverse",
          "items-center",
        )}
        label={<span className={tw("text-base")}>{t`Yield Tokens`}</span>}
        textClassName={tw("text-lg")}
        text={
          !amount ? (
            t`Enter an amount`
          ) : (
            <span>{`${amount.toFixed(4)} yt${baseAssetSymbol}`}</span>
          )
        }
      />
    </Callout>
  );
};
