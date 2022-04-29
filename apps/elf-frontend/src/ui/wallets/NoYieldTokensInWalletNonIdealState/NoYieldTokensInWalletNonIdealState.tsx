import React, { ReactElement, useCallback } from "react";

import { Button, NonIdealState } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import { t } from "ttag";

import tw from "efi-tailwindcss-classnames";
import { useNavigation } from "ui/app/navigation/hooks/useTab";
import { Navigation } from "ui/app/navigation/navigation";

export function NoYieldTokensInWalletNonIdealState(): ReactElement {
  const { changeTab } = useNavigation();
  const goToMint = useCallback(() => changeTab(Navigation.MINT), [changeTab]);
  return (
    <NonIdealState
      icon={IconNames.BANK_ACCOUNT}
      className={tw("text-base")}
      description={t`This wallet does not contain any Yield Tokens.`}
      action={
        <Button outlined large onClick={goToMint}>{t`Go to Earn`}</Button>
      }
    />
  );
}
