import React, { ReactElement, ReactNode } from "react";

import { Callout, Colors, Drawer } from "@blueprintjs/core";
import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import classNames from "classnames";
import { t } from "ttag";

import tw from "efi-tailwindcss-classnames";
import { useDarkMode } from "ui/prefs/useDarkMode/useDarkMode";
import { WalletConnectionSummary } from "ui/wallets/WalletConnectionCard/WalletConnectionSummary";
import { getConnectorName } from "elf/wallets/connectors";

import { ConnectWalletCallout } from "./ConnectWalletCallout";
import styles from "./WalletDrawer.module.css";
import { useIsTailwindSmallScreen } from "ui/base/mediaBreakpoints";

interface WalletDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
  children?: ReactNode;
}

/**
 * A simple drawer component that contains a wallet connection step.
 */
export function WalletDrawer({
  isOpen,
  onClose,
  className,
  children,
}: WalletDrawerProps): ReactElement {
  const { active, account, chainId, connector, library } =
    useWeb3React<Web3Provider>();
  const connectorName = getConnectorName(connector, library);
  const { isDarkMode, darkModeClassName } = useDarkMode();
  const connectionStatusColor = active ? Colors.GREEN4 : Colors.RED4;
  const connectorMessage = connectorName ?? t`No wallet connection`;
  const isSmallScreen = useIsTailwindSmallScreen();

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      onClosing={onClose}
      isCloseButtonShown
      title={""}
      size={isSmallScreen ? "100%" : 500}
      style={!isDarkMode ? { background: "var(--bp3-bg-color)" } : {}}
      className={classNames(
        darkModeClassName,
        styles.walletDrawer,
        tw(
          "flex",
          "flex-col",
          "justify-between",
          "text-base",
          "overflow-auto",
          "p-10",
          "pt-8",
          {
            "text-gray-700": !isDarkMode,
            "text-white": isDarkMode,
          },
        ),
        className,
      )}
    >
      <div className={tw("flex", "flex-1", "flex-col", "justify-between")}>
        {!account ? (
          <ConnectWalletCallout />
        ) : (
          <Callout className={tw("p-6")}>
            <WalletConnectionSummary
              account={account}
              active={active}
              chainId={chainId}
              connectionStatusColor={connectionStatusColor}
              connectorMessage={connectorMessage}
            />
          </Callout>
        )}

        {children}
      </div>
    </Drawer>
  );
}
