import { Tab, Tabs, Tag } from "@blueprintjs/core";
import { ERC20 } from "@elementfi/core-typechain/dist/libraries";
import classNames from "classnames";
import tw from "efi-tailwindcss-classnames";
import { useConvergentCurvePoolsWithLPBalance } from "ui/portfolio/hooks/useConvergentCurvePoolsWithLPBalance";
import { useWeightedPoolsWithLPBalance } from "ui/portfolio/hooks/useWeightedPoolsWithLPBalance";
import { useTokensWithBalance } from "ui/token/hooks/useTokensWithBalance";
import { usePrincipalTokensWithoutDust } from "ui/tranche/usePrincipalTokensWithoutDust";
import { interestTokenContracts } from "elf/interestToken/interestToken";
import React, { ReactElement } from "react";
import { t } from "ttag";
import styles from "./PortfolioTabs.module.css";

export enum PortfolioTabId {
  PRINCIPAL_TOKENS = "principalTokens",
  YIELD_TOKENS = "yieldTokens",
  LP_POSITIONS = "lpPositions",
}

interface PortfolioTabsProps {
  account: string | null | undefined;
  onChangeTab: (tabId: PortfolioTabId) => void;
  activePortfolioTabId: string;
}
export function PortfolioTabs({
  account,
  onChangeTab,
  activePortfolioTabId,
}: PortfolioTabsProps): ReactElement {
  const principalTokenInfosWithoutDust = usePrincipalTokensWithoutDust(account);

  // TODO: This is how we do it for the YieldTokenPortfolio, so asking on behalf
  // of both there and here..., should we use a dust calc?
  const yieldTokensWithBalanceResults = useTokensWithBalance(
    account,
    interestTokenContracts as unknown as ERC20[],
  );

  const interestTokenLPs = useWeightedPoolsWithLPBalance(account);
  const principalTokenLPs = useConvergentCurvePoolsWithLPBalance(account);
  const numLPs = principalTokenLPs.length + interestTokenLPs.length;
  return (
    <Tabs
      id="portfolio-tabs"
      large
      className={classNames(styles.portfolioTabs)}
      onChange={onChangeTab}
      selectedTabId={activePortfolioTabId}
    >
      <Tab id={PortfolioTabId.PRINCIPAL_TOKENS}>
        <div className={tw("flex", "items-center", "text-lg", "space-x-4")}>
          <span>{t`Principal Tokens`} </span>
          {principalTokenInfosWithoutDust.length ? (
            <Tag
              round
              className={classNames(styles.skinnyTag, tw("font-bold"))}
            >
              {principalTokenInfosWithoutDust.length}
            </Tag>
          ) : null}
        </div>
      </Tab>
      <Tab id={PortfolioTabId.YIELD_TOKENS}>
        <div className={tw("flex", "items-center", "text-lg", "space-x-4")}>
          <span>{t`Yield Tokens`} </span>
          {yieldTokensWithBalanceResults.length ? (
            <Tag
              round
              className={classNames(styles.skinnyTag, tw("font-bold"))}
            >
              {yieldTokensWithBalanceResults.length}
            </Tag>
          ) : null}
        </div>
      </Tab>
      <Tab id={PortfolioTabId.LP_POSITIONS}>
        <div className={tw("flex", "items-center", "text-lg", "space-x-4")}>
          <span>{t`LP Positions`} </span>
          {numLPs > 0 ? (
            <Tag
              round
              className={classNames(styles.skinnyTag, tw("font-bold"))}
            >
              {numLPs}
            </Tag>
          ) : null}
        </div>
      </Tab>
    </Tabs>
  );
}
