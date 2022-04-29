import React, { ReactElement } from "react";

import { Callout } from "@blueprintjs/core";
import { t } from "ttag";

import tw from "efi-tailwindcss-classnames";
import { ConnectWalletButtons } from "ui/wallets/ConnectWalletButtons/ConnectWalletButtons";

export function ConnectWalletCallout(): ReactElement {
  return (
    <Callout
      className={tw("p-8", "flex", "flex-col", "space-y-4", "items-center")}
    >
      <span className="h4">{t`Connect your wallet to continue`}</span>
      <ConnectWalletButtons />
    </Callout>
  );
}
