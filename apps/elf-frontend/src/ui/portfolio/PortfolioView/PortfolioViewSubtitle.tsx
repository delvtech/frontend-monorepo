import React, { Fragment, ReactElement, useCallback, useState } from "react";

import { Classes, Colors } from "@blueprintjs/core";
import classNames from "classnames";
import { jt, t } from "ttag";

import { makeEtherscanWalletAddressUrl } from "integrations/etherscan/links";
import tw from "efi-tailwindcss-classnames";
import { useDarkMode } from "ui/prefs/useDarkMode/useDarkMode";
import { ConnectWalletDialog } from "ui/wallets/ConnectWalletDialog/ConnectWalletDialog";
import { AddressesJson } from "addresses/addresses";

export interface PortfolioViewSubtitleProps {
  account: string | null | undefined;
}

export const subtitleClassName = classNames(
  Classes.RUNNING_TEXT,
  Classes.TEXT_MUTED,
  tw("text-base"),
);

export function PortfolioViewSubtitle({
  account,
}: PortfolioViewSubtitleProps): ReactElement {
  const { isDarkMode } = useDarkMode();
  const [isDialogOpen, setDialogOpen] = useState(false);
  const openDialog = useCallback(() => setDialogOpen(true), []);
  const closeDialog = useCallback(() => setDialogOpen(false), []);

  if (account) {
    const walletEtherscanLink = (
      <a
        key={account}
        href={makeEtherscanWalletAddressUrl(AddressesJson.chainId, account)}
        target="_blank"
        rel="noreferrer"
      >
        {account}
      </a>
    );

    // TODO: make it easy to copy the address to the clipboard here..
    return (
      <span className={subtitleClassName}>{jt`${walletEtherscanLink}`}</span>
    );
  }

  return (
    <Fragment>
      <span className={subtitleClassName}>
        <span>
          {t`View your balances and interest earnings.`}{" "}
          <button
            onClick={openDialog}
            className={classNames(Classes.BUTTON_TEXT, Classes.TEXT_LARGE)}
            style={{ color: isDarkMode ? Colors.BLUE5 : Colors.BLUE2 }}
          >
            {t`Connect a wallet to begin.`}
          </button>
        </span>
      </span>
      <ConnectWalletDialog isOpen={isDialogOpen} onClose={closeDialog} />
    </Fragment>
  );
}
