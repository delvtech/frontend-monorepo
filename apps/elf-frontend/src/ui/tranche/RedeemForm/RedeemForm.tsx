import {
  Button,
  Callout,
  Divider,
  InputGroup,
  Intent,
} from "@blueprintjs/core";
import { Tranche } from "@elementfi/core-typechain/dist/v1";
import { PrincipalTokenInfo } from "@elementfi/tokenlist";
import classNames from "classnames";
import tw from "efi-tailwindcss-classnames";
import { useDarkMode } from "ui/prefs/useDarkMode/useDarkMode";
import { IconProps } from "ui/token/TokenIcon";
import { getTokenInfo } from "tokenlists/tokenlists";
import React, { ChangeEvent, ReactElement, useCallback } from "react";
import { t } from "ttag";
import styles from "./styles.module.css";

interface RedeemFormProps {
  tranche: Tranche;
  amount: string;
  intent?: Intent;
  /**
   * If provided, this will render a MAX button
   */
  onSetMaxAmount?: () => void;

  /**
   * If set this will override the symbol lookup for assetTwo. This is useful
   * when don't want to show a long principal or yield token symbol in the
   * input
   */
  assetSymbol: string;
  assetIcon?: React.FC<IconProps>;
  heading?: string;

  /**
   * If provided, this will make the input interactive, otherwise it will be
   * disabled and read-only
   */
  onAmountChange?: (amount: string) => void;
  children?: ReactElement;
}

export function RedeemForm({
  tranche,
  assetSymbol: assetSymbolFromProps,
  assetIcon: AssetIcon,
  amount,
  intent,
  heading = t`Redeem`,
  onAmountChange,
  onSetMaxAmount,
  children,
}: RedeemFormProps): ReactElement {
  const { isDarkMode } = useDarkMode();
  const { symbol: assetSymbol } = getTokenInfo<PrincipalTokenInfo>(
    tranche.address,
  );
  const assetSymbolLabel = assetSymbolFromProps || assetSymbol;
  const onAssetOneAmountChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      onAmountChange?.(event.target.value);
    },
    [onAmountChange],
  );

  return (
    <Callout className={tw("flex", "flex-col", "p-8", "space-y-6")}>
      <span className={classNames("h4", tw("text-center"))}>{heading}</span>
      <div className={tw("flex", "flex-col", "space-y-4", "items-center")}>
        <div className={tw("flex", "w-full", "items-center", "space-x-4")}>
          <InputGroup
            large
            fill
            intent={intent}
            placeholder="0.00"
            disabled={!onAmountChange}
            onChange={onAssetOneAmountChange}
            className={classNames(tw(), styles.inputWithIcon, {
              [styles.inputColor]: !isDarkMode,
              [styles.inputColorDark]: isDarkMode,
            })}
            leftElement={
              <div className={tw("flex", "items-center", "px-2")}>
                {AssetIcon ? <AssetIcon height={18} width={18} /> : null}
              </div>
            }
            value={amount}
            rightElement={
              <div className={tw("flex", "items-center", "px-3", "space-x-8")}>
                {assetSymbolLabel}
              </div>
            }
          />
          {onSetMaxAmount ? (
            <Button
              className={tw("flex-shrink-0")}
              outlined
              intent={Intent.PRIMARY}
              onClick={onSetMaxAmount}
            >{t`MAX`}</Button>
          ) : null}
        </div>
      </div>
      <Divider />
      {children}
    </Callout>
  );
}
