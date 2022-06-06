import React, { ReactElement } from "react";
import { t } from "ttag";
import tw from "efi-tailwindcss-classnames";
import { LabeledText } from "ui/base/LabeledText/LabeledText";
import { IconProps } from "ui/token/TokenIcon";
import { useIsTailwindLargeScreen } from "ui/base/mediaBreakpoints";

export function AssetLabel({
  icon: AssetIcon,
  assetName,
  assetSymbol,
}: AssetLabelProps): ReactElement {
  const isLargeScreen = useIsTailwindLargeScreen();
  const height = isLargeScreen ? 50 : 30;
  const width = height;
  return (
    <div className={tw("p-4", "justify-between", "flex-1")}>
      <div className={tw("flex", "items-center", "space-x-4", "flex-1")}>
        <LabeledText
          icon={AssetIcon && <AssetIcon height={height} width={width} />}
          iconClassName={tw("flex-shrink-0", "mr-4")}
          large={isLargeScreen}
          label={
            <span
              className={tw("text-xs", "lg:text-sm", "flex-wrap")}
            >{t`${assetName}`}</span>
          }
          textClassName={tw("lg:text-lg", "text-left")}
          text={assetSymbol}
        />
      </div>
    </div>
  );
}
interface AssetLabelProps {
  icon: React.FC<IconProps>;
  assetName: string;
  assetSymbol: string;
}
