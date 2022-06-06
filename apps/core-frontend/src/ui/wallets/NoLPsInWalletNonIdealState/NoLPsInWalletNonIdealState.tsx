import React, { ReactElement } from "react";

import { NonIdealState } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import { t } from "ttag";

export function NoLPsInWalletNonIdealState(): ReactElement {
  return (
    <NonIdealState
      icon={IconNames.BANK_ACCOUNT}
      description={t`This wallet does not contain any LP positions.`}
    />
  );
}
