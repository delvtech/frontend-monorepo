import { ReactElement } from "react";

import { Tab, Tabs } from "@blueprintjs/core";
import { t } from "ttag";

import tw from "efi-tailwindcss-classnames";
import { PrincipalTokenActionTabId } from "ui/portfolio/PrincipalTokenActionTabs/tabs";
import { getIsMature } from "elf/tranche/getIsMature";
import { useIsTailwindLargeScreen } from "ui/base/mediaBreakpoints";
import classNames from "classnames";
import styles from "./tabs.module.css";
import { PrincipalTokenInfo } from "@elementfi/core-tokenlist";

interface PortfolioActionTabsProps {
  activeTabId: PrincipalTokenActionTabId;
  onSetActiveTab: (
    newTabId: PrincipalTokenActionTabId,
    prevTabId: PrincipalTokenActionTabId,
  ) => void;

  principalToken: PrincipalTokenInfo;
}

export function PrincipalTokenActionTabs(
  props: PortfolioActionTabsProps,
): ReactElement {
  const {
    activeTabId,
    onSetActiveTab,
    principalToken: {
      extensions: { unlockTimestamp },
    },
  } = props;
  const isMature = getIsMature(unlockTimestamp);
  const isLargeScreen = useIsTailwindLargeScreen();
  return (
    <Tabs
      id="save-transactions-tab"
      vertical={isLargeScreen}
      selectedTabId={activeTabId}
      className={classNames(
        tw("text-left", "pb-4", "lg:pb-0", "justify-center"),
        styles.actionTabs,
      )}
      onChange={onSetActiveTab}
    >
      <Tab disabled={isMature} id={PrincipalTokenActionTabId.BUY}>{t`Buy`}</Tab>
      <Tab
        disabled={isMature}
        id={PrincipalTokenActionTabId.SELL}
      >{t`Sell`}</Tab>
      <Tab
        id={PrincipalTokenActionTabId.REDEEM}
        disabled={!isMature}
      >{t`Redeem`}</Tab>
      <Tab id={PrincipalTokenActionTabId.INFO}>{t`More Information`}</Tab>
    </Tabs>
  );
}
