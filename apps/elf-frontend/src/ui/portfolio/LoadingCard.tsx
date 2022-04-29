import React, { ReactElement } from "react";

import { Callout, H4, Intent, Spinner } from "@blueprintjs/core";
import { t } from "ttag";

import tw from "efi-tailwindcss-classnames";

export function LoadingCard(): ReactElement {
  return (
    <Callout
      icon={null}
      intent={Intent.WARNING}
      className={tw("flex", "space-x-4", "p-4", "w-500")}
    >
      <Spinner intent={Intent.WARNING} size={Spinner.SIZE_SMALL} />
      <H4
        className={tw("flex-1")}
      >{t`There is a pending transaction in this wallet`}</H4>
    </Callout>
  );
}
