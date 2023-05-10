import { ReactElement } from "react";

import {
  Button,
  Divider,
  Spinner,
  SpinnerSize,
  Tab,
  Tabs,
} from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import classNames from "classnames";
import { t } from "ttag";

import tw from "efi-tailwindcss-classnames";
import { AppMenuButton } from "ui/app/AppMenuButton/AppMenuButton";
import { useNavigation } from "ui/app/navigation/hooks/useTab";
import { Navigation } from "ui/app/navigation/navigation";
import { ElementLogo } from "ui/base/ElementLogo";
import { useDarkMode } from "ui/prefs/useDarkMode/useDarkMode";
import { usePendingTransactionPref } from "ui/transactions/usePendingTransactionPref/usePendingTransactionPref";
import { ConnectWalletButton } from "ui/wallets/ConnectWalletButton/ConnectWalletButton";
import { ExperimentalBanner } from "ui/page/ExperimentalBanner/ExperimentalBanner";

interface AppHeaderProps {
  chainId: number | undefined;
  account: string | null | undefined;
  active: boolean;
  connectorName: string | undefined;
  deactivate: () => void;
  hamburgerButton: ReactElement;
}

export function AppHeader({
  account,
  active: walletConnectionActive,
  chainId,
  hamburgerButton,
}: AppHeaderProps): ReactElement {
  const { activeTab, changeTab } = useNavigation();
  const { isDarkMode, setDarkModeOff, setDarkModeOn } = useDarkMode();
  const { transactionHash, clearPendingTransactionPref } =
    usePendingTransactionPref();
  const hasPendingTransaction = !!transactionHash;

  return (
    <div className={tw("flex", "w-full", "flex-col")}>
      <ExperimentalBanner />
      {/* Mobile */}
      <div
        className={tw(
          "flex",
          "lg:hidden",
          "w-full",
          "p-2",
          "items-center",
          "justify-between",
        )}
      >
        <AppMenuButton />
      </div>

      {/* Desktop */}
      <div className={tw("hidden", "lg:flex", "w-full", "p-8")}>
        <div className={tw("flex", "w-full", "space-x-4", "items-end")}>
          <ElementLogo
            height={48}
            isDarkMode={isDarkMode}
            className={tw("mr-16", "hidden", "md:block")}
          />
          <Tabs
            id="primary-nav"
            large
            onChange={changeTab}
            selectedTabId={activeTab}
          >
            <Tab
              id={Navigation.FIXED_RATES}
              title={<span>{t`Fixed Rates`}</span>}
            />
            <Divider />

            <Tab id={Navigation.MINT} title={<span>{t`Mint & LP`}</span>} />
            <Divider />
            <Tab id={Navigation.POOLS} title={<span>{t`Pools`}</span>} />
            <Divider />
            <Tab
              id={Navigation.PORTFOLIO}
              title={
                <div
                  className={tw("flex", "space-x-2", "items-center", "h-full")}
                >
                  <span
                    className={tw("flex", "w-full", "justify-between")}
                  >{t`Portfolio`}</span>
                  {hasPendingTransaction ? (
                    <Spinner size={SpinnerSize.SMALL} />
                  ) : null}
                </div>
              }
            />
          </Tabs>
          {hasPendingTransaction ? (
            <div className={tw("flex", "mb-1")}>
              <Button
                outlined
                small
                icon={IconNames.CROSS}
                onClick={clearPendingTransactionPref}
              >
                {t`Clear spinner`}
              </Button>
            </div>
          ) : null}
        </div>

        <div
          className={classNames(
            tw(
              "flex-shrink-0",
              "flex-no-wrap",
              "space-x-4",
              "items-center",
              "hidden",
              "md:flex",
            ),
            { "bp3-dark": isDarkMode },
          )}
        >
          <Button
            minimal
            className={tw("px-6", "py-3")}
            icon={isDarkMode ? IconNames.FLASH : IconNames.MOON}
            onClick={isDarkMode ? setDarkModeOff : setDarkModeOn}
          />

          <ConnectWalletButton
            account={account}
            chainId={chainId}
            walletConnectionActive={walletConnectionActive}
          />
        </div>
        {hamburgerButton}
      </div>
    </div>
  );
}
