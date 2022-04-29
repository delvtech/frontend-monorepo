import { Classes, Icon } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import { Tranche } from "@elementfi/core-typechain/dist/v1";
import classNames from "classnames";
import tw from "efi-tailwindcss-classnames";
import { CryptoAsset } from "elf/crypto/CryptoAsset";
import { getBaseAssetForTranche } from "elf/tranche/baseAssets";
import React from "react";

interface TrancheButtonProps {
  account: string | null | undefined;
  tranche: Tranche;
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  /**
   * If true will show the dropdown caret, defaults to true
   */
  showCaret?: boolean;
  buttonLabelRenderer: (
    tranche: Tranche,
    baseAsset: CryptoAsset,
  ) => JSX.Element;
}

/**
 * @deprecated Passing contracts is deprecated. Refactor this!
 */
export function TermButton({
  tranche,
  disabled = false,
  buttonLabelRenderer,
  showCaret = true,
  onClick,
}: TrancheButtonProps): JSX.Element {
  const baseAsset = getBaseAssetForTranche(tranche.address);
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={classNames(
        Classes.BUTTON,
        Classes.FILL,
        Classes.MINIMAL,
        tw("flex", "justify-start", "w-64", "h-full"),
      )}
    >
      <div
        className={tw(
          "flex",
          "justify-between",
          "items-center",
          "space-x-4",
          "flex-1",
          "p-2",
        )}
      >
        {buttonLabelRenderer(tranche, baseAsset)}
        {showCaret ? <Icon icon={IconNames.CARET_DOWN} /> : null}
      </div>
    </button>
  );
}
