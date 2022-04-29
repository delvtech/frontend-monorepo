import React, { ReactElement } from "react";

import { Classes, Icon } from "@blueprintjs/core";
import { IconName } from "@blueprintjs/icons";
import classNames from "classnames";

import tw from "efi-tailwindcss-classnames";
import { findAssetIcon } from "ui/crypto/CryptoIcon";
import { CryptoAsset } from "elf/crypto/CryptoAsset";
import { getCryptoName } from "elf/crypto/getCryptoName/getCryptoName";
import { getCryptoSymbol } from "elf/crypto/getCryptoSymbol";
import { AssetLabel } from "./AssetLabel";

interface CryptoAssetButtonProps {
  outlined?: boolean;
  fill?: boolean;
  minimal?: boolean;
  cryptoAsset: CryptoAsset;

  rightIcon?: IconName;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export function CryptoAssetButton({
  fill,
  minimal,
  outlined,
  cryptoAsset,
  rightIcon,
  onClick,
}: CryptoAssetButtonProps): ReactElement {
  const assetName = getCryptoName(cryptoAsset);
  const assetSymbol = getCryptoSymbol(cryptoAsset);
  const assetIcon = findAssetIcon(cryptoAsset);

  if (!cryptoAsset || !assetSymbol) {
    return <div className={classNames(Classes.SKELETON)} />;
  }

  return (
    <button
      onClick={onClick}
      className={classNames(
        Classes.BUTTON,
        {
          [Classes.MINIMAL]: minimal,
          [Classes.OUTLINED]: outlined,
          [Classes.FILL]: fill,
        },
        tw("flex", "justify-start"),
      )}
    >
      <AssetLabel
        icon={assetIcon}
        assetName={assetName}
        assetSymbol={assetSymbol}
      />
      {rightIcon && <Icon icon={rightIcon} className={tw("pr-4")} />}
    </button>
  );
}
