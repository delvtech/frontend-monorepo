import React, { ReactElement } from "react";

import { Classes, Icon, Tag } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import classNames from "classnames";

import tw from "efi-tailwindcss-classnames";
import { WalletJazzicon } from "ui/wallets/WalletJazzicon/WalletJazzicon";
import { formatChainName } from "elf/crypto/formatChainName";
import { formatWalletAddress } from "elf/wallets/formatWalletAddress";

interface WalletSummaryProps {
  account: string | null | undefined;
  active: boolean;
  chainId: number | undefined;
  connectionStatusColor: string;
  connectorMessage: string;
}

export function WalletConnectionSummary({
  account,
  active,
  chainId,
  connectionStatusColor,
  connectorMessage,
}: WalletSummaryProps): ReactElement {
  return (
    <div
      className={tw(
        "flex",
        "w-full",
        "items-center",
        "space-x-10",
        "justify-between",
      )}
    >
      <div className={classNames(tw("flex", "space-x-4", "items-center"))}>
        <WalletJazzicon account={account} />

        <div className={tw("flex", "flex-col")}>
          <div className={tw("flex", "items-center", "justify-between")}>
            <span className={classNames(Classes.TEXT_LARGE)}>
              {account ? formatWalletAddress(account) : null}
            </span>
          </div>
          <div className={tw("flex", "items-center", "justify-between")}>
            <span className={classNames(Classes.TEXT_MUTED)}>
              {formatChainName(active, chainId)}
            </span>
          </div>
        </div>
      </div>
      <Tag
        minimal
        large
        icon={<Icon icon={IconNames.DOT} color={connectionStatusColor} />}
      >
        {connectorMessage}
      </Tag>
    </div>
  );
}
