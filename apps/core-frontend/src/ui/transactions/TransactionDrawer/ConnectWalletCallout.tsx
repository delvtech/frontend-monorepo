import React, { FC } from "react";

import { Callout } from "@blueprintjs/core";
import classNames from "classnames";
import { t } from "ttag";

import tw from "efi-tailwindcss-classnames";
import { ConnectWalletButtons } from "ui/wallets/ConnectWalletButtons/ConnectWalletButtons";

export const ConnectWalletCallout: FC<unknown> = () => {
  return (
    <Callout className={tw("p-0")}>
      <div className={tw("flex", "flex-col", "items-center")}>
        <span
          className={classNames("h4", tw("py-6"))}
        >{t`Connect your wallet to continue`}</span>
        <ConnectWalletButtons />
      </div>
    </Callout>
  );
};
