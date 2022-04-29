import { Fragment, ReactElement, useState } from "react";
import { Classes, H2 } from "@blueprintjs/core";
import { Web3Provider } from "@ethersproject/providers";
import { AbstractConnector } from "@web3-react/abstract-connector";
import { t } from "ttag";
import tw from "efi-tailwindcss-classnames";
import { LiquidityPositionPortfolio } from "ui/portfolio/LiquidityPositionPortfolio/LiquidityPositionPortfolio";
import {
  PortfolioTabId,
  PortfolioTabs,
} from "ui/portfolio/PortfolioTabs/PortfolioTabs";
import { PrincipalTokenPortfolioOld } from "ui/portfolio/PrincipalTokenPortfolio/PrincipalTokenPortfolioOld";
import { YieldTokenPortfolio } from "ui/portfolio/YieldTokenPortfolio/YieldTokenPortfolio";
import { assertNever } from "base/assertNever";
import { formatWalletAddress } from "elf/wallets/formatWalletAddress";
import styles from "./styles.module.css";

export interface PortfolioViewOriginalProps {
  account: string | null | undefined;
  chainId: number | undefined;
  library: Web3Provider | undefined;
  connector: AbstractConnector | undefined;
  walletConnectionActive: boolean;
}

export function PortfolioViewOriginal({
  account,
  chainId,
  library,
  connector,
  walletConnectionActive,
}: PortfolioViewOriginalProps): ReactElement {
  const [activePortfolioTabId, setActivePortfolioTab] = useState(
    PortfolioTabId.PRINCIPAL_TOKENS,
  );
  return (
    <Fragment>
      {account ? (
        <H2 className={tw("text-center")}>
          {t`Portfolio `}{" "}
          <a
            className={styles.accountLink}
            href={`https://etherscan.io/address/${account}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className={Classes.TEXT_MUTED}>{`(${formatWalletAddress(
              account,
            )})`}</span>
          </a>
        </H2>
      ) : null}
      <div className={tw("w-full", "flex", "flex-col", "items-center")}>
        {account ? (
          <PortfolioTabs
            account={account}
            onChangeTab={setActivePortfolioTab}
            activePortfolioTabId={activePortfolioTabId}
          />
        ) : null}
        <div
          className={tw(
            "w-full",
            "flex",
            "flex-col",
            "pt-8",
            "space-y-10",
            "lg:flex-row",
            "lg:space-y-0",
            "lg:space-x-10",
          )}
        >
          <div className={tw("flex", "flex-1", "w-full")}>
            {(() => {
              switch (activePortfolioTabId) {
                case PortfolioTabId.PRINCIPAL_TOKENS:
                  return (
                    <PrincipalTokenPortfolioOld
                      chainId={chainId}
                      library={library}
                      account={account}
                    />
                  );
                case PortfolioTabId.YIELD_TOKENS:
                  return (
                    <YieldTokenPortfolio
                      chainId={chainId}
                      library={library}
                      connector={connector}
                      account={account}
                      walletConnectionActive={walletConnectionActive}
                    />
                  );
                case PortfolioTabId.LP_POSITIONS:
                  return <LiquidityPositionPortfolio account={account} />;
                default:
                  assertNever(activePortfolioTabId);
              }
            })()}
          </div>
        </div>
      </div>
    </Fragment>
  );
}
