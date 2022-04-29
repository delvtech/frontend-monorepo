import React, { FC, ReactElement, useCallback, useState } from "react";

import { Callout, Classes, Colors, Icon, Tag } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import { Popover2 } from "@blueprintjs/popover2";
import classNames from "classnames";
import { t } from "ttag";

import tw from "efi-tailwindcss-classnames";
import { useDarkMode } from "ui/prefs/useDarkMode/useDarkMode";
import { ConnectWalletButtons } from "ui/wallets/ConnectWalletButtons/ConnectWalletButtons";
import { isMainnet } from "base/ethereum/ethereum";

import { WalletConnectionSummary } from "./WalletConnectionSummary";

interface WalletConnectionCardProps {
  chainId: number | undefined;
  account: string | null | undefined;
  active: boolean;
  connectorName: string | undefined;

  className?: string;
}

export function WalletConnectionCard({
  chainId,
  account,
  active,
  connectorName,
  className,
}: WalletConnectionCardProps): ReactElement {
  const { isDarkMode } = useDarkMode();
  const [isWalletDialogOpen, setWalletDialogOpen] = useState(false);
  const openWalletDialog = useCallback(() => setWalletDialogOpen(true), []);
  const closeWalletDialog = useCallback(() => setWalletDialogOpen(false), []);

  const connectionStatusColor = active ? Colors.GREEN4 : Colors.RED4;
  const connectorMessage = connectorName ?? t`No wallet connection`;

  return (
    <Popover2
      minimal
      isOpen={isWalletDialogOpen}
      onClose={closeWalletDialog}
      content={
        <div className={tw("w-400")}>
          <ConnectWalletButtons vertical onClick={closeWalletDialog} />
        </div>
      }
    >
      <Callout
        className={classNames(tw("flex", "items-center"), className)}
        onClick={openWalletDialog}
        style={getCardStyle(chainId, isDarkMode)}
      >
        {!active ? (
          <ConnectToBegin
            isDarkMode={isDarkMode}
            statusColor={connectionStatusColor}
            connectorMessage={connectorMessage}
          />
        ) : (
          <WalletConnectionSummary
            account={account}
            active={active}
            chainId={chainId}
            connectionStatusColor={connectionStatusColor}
            connectorMessage={connectorMessage}
          />
        )}
      </Callout>
    </Popover2>
  );
}

interface ConnectToBeginProps {
  isDarkMode: boolean;
  statusColor: string;
  connectorMessage: string;
}
const ConnectToBegin: FC<ConnectToBeginProps> = ({
  isDarkMode,
  statusColor,
  connectorMessage,
}) => {
  return (
    <div className={tw("flex", "flex-1", "items-center", "justify-between")}>
      <button
        className={classNames(
          Classes.BUTTON_TEXT,
          tw("flex-1", "justify-center", "items-center", "flex", "mr-5"),
        )}
        style={{ color: isDarkMode ? Colors.BLUE5 : Colors.BLUE2 }}
      >
        {t`Connect wallet to begin`}
      </button>
      <Tag
        minimal
        large
        icon={<Icon icon={IconNames.DOT} color={statusColor} />}
      >
        {connectorMessage}
      </Tag>
    </div>
  );
};

function getCardStyle(
  chainId: number | undefined,
  isDarkMode: boolean,
): React.CSSProperties {
  const mainnetDanger =
    chainId && isMainnet(chainId) && process.env.NODE_ENV !== "production";

  if (mainnetDanger) {
    return { backgroundColor: isDarkMode ? Colors.RED1 : Colors.ORANGE5 };
  }

  return {};
}
