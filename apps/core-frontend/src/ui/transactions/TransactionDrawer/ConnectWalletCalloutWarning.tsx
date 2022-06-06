import React, { FC } from "react";

import { Callout, Intent } from "@blueprintjs/core";
import { t } from "ttag";

import tw from "efi-tailwindcss-classnames";

export const ConnectWalletCalloutWarning: FC<unknown> = () => {
  return (
    <Callout
      intent={Intent.WARNING}
      title={t`Connect your wallet to continue`}
      icon={null}
      className={tw("p-4")}
    >
      <div
        className={"pt-1"}
      >{t`Element cannot initialize this transaction until you connect your wallet.`}</div>
    </Callout>
  );
};
