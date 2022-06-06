import { IPopoverProps } from "@blueprintjs/core";
import { ItemRenderer, Select } from "@blueprintjs/select";
import { Tranche } from "@elementfi/core-typechain/dist/v1";
import classNames from "classnames";
import tw from "efi-tailwindcss-classnames";
import { CryptoAsset } from "elf/crypto/CryptoAsset";
import React, { ReactElement, useCallback } from "react";
import { TermButton } from "./TermButton";
import styles from "./TermPicker.module.css";

interface TermPickerProps {
  account: string | null | undefined;
  tranches: Tranche[];
  activeTrancheIndex: number;
  onTrancheChange: (newTranche: Tranche) => void;
  buttonLabelRenderer: (
    tranche: Tranche,
    baseAsset: CryptoAsset,
  ) => JSX.Element;
}

const popoverProps: IPopoverProps = {
  minimal: true,
  className: tw("w-full"),
  targetClassName: classNames(styles.fullHeight, tw("w-full", "h-full")),
  popoverClassName: tw("w-full", "h-full"),
  portalClassName: tw("w-64"),
};
/**
 *
 * @deprecated passing contracts as props is deprecated, refactor this component!
 */
export function TermPicker({
  tranches,
  account,
  onTrancheChange,
  activeTrancheIndex,
  buttonLabelRenderer,
}: TermPickerProps): ReactElement | null {
  const activeTranche = tranches[activeTrancheIndex];

  const itemRenderer: ItemRenderer<Tranche> = useCallback(
    (tranche: Tranche, { handleClick }) => (
      <TermButton
        key={tranche?.address}
        showCaret={false}
        account={account}
        tranche={tranche}
        onClick={handleClick}
        buttonLabelRenderer={buttonLabelRenderer}
      />
    ),
    [account, buttonLabelRenderer],
  );

  const hasZeroOrOneTranche = tranches.length < 2;

  return (
    <Select
      disabled={hasZeroOrOneTranche}
      className={tw("lg:pr-2")}
      popoverProps={popoverProps}
      items={tranches}
      filterable={false}
      itemRenderer={itemRenderer}
      onItemSelect={onTrancheChange}
    >
      <TermButton
        disabled={hasZeroOrOneTranche}
        showCaret={tranches.length > 1}
        account={account}
        tranche={activeTranche}
        buttonLabelRenderer={buttonLabelRenderer}
      />
    </Select>
  );
}
