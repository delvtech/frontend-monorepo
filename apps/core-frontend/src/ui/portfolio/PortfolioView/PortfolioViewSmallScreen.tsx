import {
  Button,
  Classes,
  Icon,
  Intent,
  Menu,
  MenuItem,
  NonIdealState,
  Tag,
} from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import { Popover2 } from "@blueprintjs/popover2";
import { ERC20 } from "@elementfi/core-typechain/dist/libraries";
import { Web3Provider } from "@ethersproject/providers";
import { AbstractConnector } from "@web3-react/abstract-connector";
import classNames from "classnames";
import tw from "efi-tailwindcss-classnames";
import { useBoolean } from "ui/base/hooks/useBoolean/useBoolean";
import { useConvergentCurvePoolsWithLPBalance } from "ui/portfolio/hooks/useConvergentCurvePoolsWithLPBalance";
import { useWeightedPoolsWithLPBalance } from "ui/portfolio/hooks/useWeightedPoolsWithLPBalance";
import { LiquidityPositionPortfolio } from "ui/portfolio/LiquidityPositionPortfolio/LiquidityPositionPortfolio";
import { PrincipalTokenPortfolio } from "ui/portfolio/PrincipalTokenPortfolio/PrincipalTokenPortfolio";
import { YieldTokenPortfolio } from "ui/portfolio/YieldTokenPortfolio/YieldTokenPortfolio";
import { useTokensWithBalance } from "ui/token/hooks/useTokensWithBalance";
import { usePrincipalTokensWithoutDust } from "ui/tranche/usePrincipalTokensWithoutDust";
import { interestTokenContracts } from "elf/interestToken/interestToken";
import { formatWalletAddress } from "elf/wallets/formatWalletAddress";
import { ReactElement, useCallback } from "react";
import { t } from "ttag";
export interface PortfolioViewSmallScreenProps {
  account: string | null | undefined;
  chainId: number | undefined;
  library: Web3Provider | undefined;
  connector: AbstractConnector | undefined;
  walletConnectionActive: boolean;
}

export function PortfolioViewSmallScreen({
  account,
  chainId,
  library,
  connector,
  walletConnectionActive,
}: PortfolioViewSmallScreenProps): ReactElement {
  const principalTokenInfosWithoutDust = usePrincipalTokensWithoutDust(account);
  const yieldTokensWithBalanceResults = useTokensWithBalance(
    account,
    interestTokenContracts as unknown as ERC20[],
  );

  const interestTokenLPs = useWeightedPoolsWithLPBalance(account);
  const principalTokenLPs = useConvergentCurvePoolsWithLPBalance(account);
  const numLPs = principalTokenLPs.length + interestTokenLPs.length;

  // Filter state
  const {
    value: showPrincipalTokens,
    setTrue: setPrincipalTokensShowing,
    setFalse: setPrincipalTokensHidden,
  } = useBoolean(true);
  const {
    value: showYieldTokens,
    setTrue: setYieldTokensShowing,
    setFalse: setYieldTokensHidden,
  } = useBoolean(true);
  const {
    value: showLPTokens,
    setTrue: setLPTokensShowing,
    setFalse: setLPTokensHidden,
  } = useBoolean(true);

  // Edge case if the user turns all the token filters off for some reason
  const hasNoResultsToShow =
    !showPrincipalTokens && !showYieldTokens && !showLPTokens;
  const clearAllFilters = useCallback(() => {
    setPrincipalTokensShowing();
    setYieldTokensShowing();
    setLPTokensShowing();
  }, [setLPTokensShowing, setPrincipalTokensShowing, setYieldTokensShowing]);

  return (
    <div
      className={tw("w-full", "flex", "flex-col", "items-center")}
      style={{ fontFamily: "var(--rubik-font)" }}
    >
      {account ? (
        <Popover2
          minimal
          content={
            <Menu className={tw("w-300")}>
              <MenuItem
                shouldDismissPopover={false}
                className={tw("h-12", "items-center")}
                onClick={
                  showPrincipalTokens
                    ? setPrincipalTokensHidden
                    : setPrincipalTokensShowing
                }
                text={
                  <div
                    className={tw(
                      "flex",
                      "items-center",
                      "text-base",
                      "space-x-4",
                    )}
                  >
                    <span>{t`Principal Tokens`} </span>
                  </div>
                }
                labelElement={
                  <PortfolioMenuItemLabelElement
                    numItems={principalTokenInfosWithoutDust.length}
                    isSelected={showPrincipalTokens}
                  />
                }
              />
              <MenuItem
                className={tw("h-12", "items-center")}
                shouldDismissPopover={false}
                onClick={
                  showYieldTokens ? setYieldTokensHidden : setYieldTokensShowing
                }
                text={
                  <div
                    className={tw(
                      "flex",
                      "items-center",
                      "text-base",
                      "space-x-4",
                    )}
                  >
                    <span>{t`Yield Tokens`} </span>
                  </div>
                }
                labelElement={
                  <PortfolioMenuItemLabelElement
                    numItems={yieldTokensWithBalanceResults.length}
                    isSelected={showYieldTokens}
                  />
                }
              />
              <MenuItem
                className={tw("h-12", "items-center")}
                shouldDismissPopover={false}
                onClick={showLPTokens ? setLPTokensHidden : setLPTokensShowing}
                text={
                  <div
                    className={tw(
                      "flex",
                      "items-center",
                      "text-base",
                      "space-x-4",
                    )}
                  >
                    <span>{t`LP Positions`} </span>
                  </div>
                }
                labelElement={
                  <PortfolioMenuItemLabelElement
                    numItems={numLPs}
                    isSelected={showLPTokens}
                  />
                }
              />
            </Menu>
          }
        >
          <Button large minimal icon={IconNames.SETTINGS}>
            <span className={tw("text-center", "text-xl", "font-semibold")}>
              {t`Portfolio `}
              <span className={Classes.TEXT_MUTED}>{`(${formatWalletAddress(
                account,
              )})`}</span>
            </span>
          </Button>
        </Popover2>
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
        <div className={tw("flex", "flex-col", "flex-1", "w-full")}>
          {showPrincipalTokens ? (
            <PrincipalTokenPortfolio
              chainId={chainId}
              library={library}
              account={account}
            />
          ) : null}

          {showYieldTokens ? (
            <YieldTokenPortfolio
              chainId={chainId}
              library={library}
              connector={connector}
              account={account}
              walletConnectionActive={walletConnectionActive}
            />
          ) : null}

          {showLPTokens ? (
            <LiquidityPositionPortfolio account={account} />
          ) : null}

          {hasNoResultsToShow ? (
            <NonIdealState
              icon={IconNames.BANK_ACCOUNT}
              title={t`There are no tokens that match the current filter.`}
              action={
                <Button
                  outlined
                  large
                  onClick={clearAllFilters}
                >{t`Reset filters`}</Button>
              }
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}
interface PortfolioMenuItemLabelElementProps {
  numItems: number;
  isSelected: boolean;
}

function PortfolioMenuItemLabelElement({
  numItems,
  isSelected,
}: PortfolioMenuItemLabelElementProps) {
  return (
    <div className={tw("flex", "space-x-4", "items-center")}>
      {numItems ? (
        <Tag
          intent={Intent.PRIMARY}
          minimal
          large
          round
          className={classNames(tw("font-bold"))}
        >
          {numItems}
        </Tag>
      ) : null}
      {isSelected ? (
        <Icon intent={Intent.PRIMARY} icon={IconNames.SELECTION} size={28} />
      ) : (
        <Icon icon={IconNames.CIRCLE} intent={Intent.PRIMARY} size={28} />
      )}
    </div>
  );
}
