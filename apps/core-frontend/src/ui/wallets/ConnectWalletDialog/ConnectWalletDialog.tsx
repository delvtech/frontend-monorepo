import React, { CSSProperties, ReactElement } from "react";
import { useMedia } from "react-use";

import { Callout, Dialog } from "@blueprintjs/core";
import classNames from "classnames";
import { t } from "ttag";

import tw from "efi-tailwindcss-classnames";
import { useDarkMode } from "ui/prefs/useDarkMode/useDarkMode";
import { ConnectWalletButtons } from "ui/wallets/ConnectWalletButtons/ConnectWalletButtons";

const smallScreenStyle: CSSProperties = {
  margin: 0,
  height: "100vh",
  width: "100vw",
};

interface ConnectWalletDialogProps {
  isOpen: boolean;
  onClose: () => void;
}
export function ConnectWalletDialog({
  isOpen,
  onClose,
}: ConnectWalletDialogProps): ReactElement {
  const { darkModeClassName } = useDarkMode();
  const isSmallScreen = useMedia("(max-width: 639px)");
  return (
    <Dialog
      isCloseButtonShown={true}
      style={isSmallScreen ? smallScreenStyle : undefined}
      className={classNames(darkModeClassName, tw("pb-0", "overflow-auto"))}
      isOpen={isOpen}
      onClose={onClose}
      title={
        <span
          className={tw("text-center", "text-base", "py-6")}
        >{t`Select a wallet provider`}</span>
      }
    >
      <div
        className={tw("flex", "flex-col", "w-full", "h-full")}
        data-testid="connect-wallet-dialog"
      >
        <Callout className={tw("p-0", "w-full")}>
          <ConnectWalletButtons vertical={isSmallScreen} onClick={onClose} />
        </Callout>
      </div>
    </Dialog>
  );
}
