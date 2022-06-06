import { ReactElement } from "react";

import { Intent, Tab, Tabs, Tag } from "@blueprintjs/core";
import { t } from "ttag";

import tw from "efi-tailwindcss-classnames";
import { EarnActionsTabId } from "ui/earn/EarnActionsTabs/EarnActionsTabId";
import { getIsMature } from "elf/tranche/getIsMature";

interface EarnActionsTabsProps {
  activeTabId: EarnActionsTabId;
  onSetActiveTab: (
    newTabId: EarnActionsTabId,
    prevTabId: EarnActionsTabId,
  ) => void;

  unlockTimestamp: number;
}

export function EarnActionsTabs(props: EarnActionsTabsProps): ReactElement {
  const { activeTabId, onSetActiveTab, unlockTimestamp } = props;
  const isMature = getIsMature(unlockTimestamp);
  return (
    <Tabs
      id="earn-actions-tabs"
      vertical
      selectedTabId={activeTabId}
      className={tw("text-left")}
      onChange={onSetActiveTab}
    >
      <Tab disabled={isMature} id={EarnActionsTabId.MINT}>
        <Tag intent={Intent.PRIMARY} round minimal className={tw("mr-2")}>
          1
        </Tag>
        {t`Mint principal and yield tokens`}
      </Tab>
      <Tab disabled={isMature} id={EarnActionsTabId.PROVIDE_LIQUIDITY}>
        <Tag intent={Intent.PRIMARY} round minimal className={tw("mr-2")}>
          2
        </Tag>
        {t`LP for additional yield`}
      </Tab>
    </Tabs>
  );
}
