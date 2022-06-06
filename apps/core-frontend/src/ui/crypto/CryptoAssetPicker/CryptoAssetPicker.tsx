import React, { ReactElement } from "react";

import { IPopoverProps } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import { ItemRenderer, Select } from "@blueprintjs/select";
import classNames from "classnames";

import tw from "efi-tailwindcss-classnames";
import styles from "ui/crypto/CryptoAssetPicker/styles.module.css";
import { CryptoAsset } from "elf/crypto/CryptoAsset";

import { CryptoAssetButton } from "./CryptoAssetButton";

interface CryptoAssetPickerProps {
  className?: string;
  cryptoAssets: CryptoAsset[];
  activeCryptoAsset: CryptoAsset;
  onCryptoAssetChange: (newCryptoAsset: CryptoAsset) => void;
}

const popoverProps: IPopoverProps = {
  minimal: true,
  targetClassName: tw("w-full"),
  popoverClassName: classNames(styles.baseAssetPicker),
};

const itemRenderer: ItemRenderer<CryptoAsset> = (
  baseAsset: CryptoAsset,
  { handleClick },
) => (
  <CryptoAssetButton
    key={baseAsset.id}
    fill
    minimal
    onClick={handleClick}
    cryptoAsset={baseAsset}
  />
);
export function CryptoAssetPicker(props: CryptoAssetPickerProps): ReactElement {
  const { className, cryptoAssets, onCryptoAssetChange, activeCryptoAsset } =
    props;

  return (
    <Select
      className={classNames(tw("flex-shrink-0", "w-full"), className)}
      popoverProps={popoverProps}
      items={cryptoAssets}
      filterable={false}
      itemRenderer={itemRenderer}
      onItemSelect={onCryptoAssetChange}
    >
      <CryptoAssetButton
        minimal
        fill
        cryptoAsset={activeCryptoAsset}
        rightIcon={IconNames.CARET_DOWN}
      />
    </Select>
  );
}
