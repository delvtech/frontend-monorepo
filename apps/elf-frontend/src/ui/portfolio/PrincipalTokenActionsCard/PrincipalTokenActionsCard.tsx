import { ReactElement } from "react";

import { Card } from "@blueprintjs/core";
import { Web3Provider } from "@ethersproject/providers";

import tw from "efi-tailwindcss-classnames";
import { BuyPrincipalTokensForm } from "ui/portfolio/PrincipalTokenActionsCard/BuyPrincipalTokensForm";
import { PrincipalTokenActionTabId } from "ui/portfolio/PrincipalTokenActionTabs/tabs";
import { PrincipalTokenActionTabs } from "ui/portfolio/PrincipalTokenActionTabs/PrincipalTokenActionTabs";
import { PrincipalTokenInformation } from "ui/portfolio/PrincipalTokenInformation/PrincipalTokenInformation";
import { SellPrincipalTokensForm } from "ui/portfolio/PrincipalTokenActionsCard/SellPrincipalTokensForm";
import { RedeemPrincipalTokensForm } from "ui/portfolio/PrincipalTokenActionsCard/RedeemPrincipalTokensForm";
import { PrincipalTokenInfo } from "@elementfi/tokenlist";

interface PrincipalTokenActionsCardProps {
  library: Web3Provider | undefined;
  account: string | null | undefined;
  principalToken: PrincipalTokenInfo;
  activeTabId: PrincipalTokenActionTabId;
  setActiveTabId: (tabId: PrincipalTokenActionTabId) => void;
}

export function PrincipalTokenActionsCard(
  props: PrincipalTokenActionsCardProps,
): ReactElement {
  const { library, account, activeTabId, setActiveTabId, principalToken } =
    props;

  return (
    <Card className={tw("flex", "space-x-6", "flex-col", "lg:flex-row")}>
      <PrincipalTokenActionTabs
        principalToken={principalToken}
        activeTabId={activeTabId}
        onSetActiveTab={setActiveTabId}
      />

      <div className={tw("flex", "flex-col", "flex-1")}>
        {activeTabId === PrincipalTokenActionTabId.BUY ? (
          <BuyPrincipalTokensForm
            account={account}
            library={library}
            principalToken={principalToken}
          />
        ) : null}
        {activeTabId === PrincipalTokenActionTabId.SELL ? (
          <SellPrincipalTokensForm
            account={account}
            library={library}
            principalToken={principalToken}
          />
        ) : null}
        {activeTabId === PrincipalTokenActionTabId.REDEEM ? (
          <RedeemPrincipalTokensForm
            account={account}
            library={library}
            principalToken={principalToken}
          />
        ) : null}
        {activeTabId === PrincipalTokenActionTabId.INFO ? (
          <PrincipalTokenInformation
            account={account}
            library={library}
            principalToken={principalToken}
          />
        ) : null}
      </div>
    </Card>
  );
}
