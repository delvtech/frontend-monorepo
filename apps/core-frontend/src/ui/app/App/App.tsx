import React, { FC, Fragment } from "react";
import { ReactQueryDevtools } from "react-query/devtools";

import { Button, FocusStyleManager, H1, Overlay } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import classNames from "classnames";
import { t } from "ttag";

import { tw } from "efi-tailwindcss-classnames";
import { useForcedRedirect } from "ui/router/useForcedRedirect";
import { AppHamburgerButton } from "ui/app/AppHamburgerButton/AppHamburgerButton";
import { AppHeader } from "ui/app/AppHeader/AppHeader";
import { Title } from "ui/base/Title";
import { useDarkMode } from "ui/prefs/useDarkMode/useDarkMode";
import { useToastWrongChain } from "ui/provider/useBlockFromTag/useToastWrongChain";
import { useTransactionToasts } from "ui/transactions/useTransactionToasts";
import useAddressScreening from "ui/wallets/hooks/useAddressScreening";
import IneligibleAccountDialog from "ui/wallets/IneligibleAccountDialog";
import { ConnectWalletButton } from "ui/wallets/ConnectWalletButton/ConnectWalletButton";
import { useEagerConnect } from "ui/wallets/hooks/useEagerReconnect";
import { useSyncWithInjectedEthereum } from "ui/wallets/hooks/useSyncWithInjectedEthereum";
import { AddressesJson } from "addresses/addresses";
import { ChainId, ChainNames } from "base/ethereum/ethereum";
import { getConnectorName } from "elf/wallets/connectors";

import styles from "./App.module.css";
import { TermsBanner } from "ui/app/Banner/TermsBanner";

FocusStyleManager.onlyShowFocusOnTabs();

interface AppProps {}

const App: FC<AppProps> = ({ children }) => {
  const { active, account, chainId, deactivate, connector, library } =
    useWeb3React<Web3Provider>();
  const isWrongChain = active && chainId !== AddressesJson.chainId;
  const chainName = ChainNames[AddressesJson.chainId as ChainId];
  const { pass } = useAddressScreening(account);
  useForcedRedirect("/void", pass === false);

  const { isDarkMode, darkModeClassName, setDarkModeOff, setDarkModeOn } =
    useDarkMode();

  // Do these at the top of the app in one place so we don't have multiple
  // callers trying to set event handlers.
  useSyncWithInjectedEthereum();
  useEagerConnect();
  useToastWrongChain(chainId);
  useTransactionToasts();

  return (
    <Fragment>
      <Title />
      <IneligibleAccountDialog isOpen={pass === false} />
      <div
        className={classNames(
          styles.appBackground,
          { [styles.appBackgroundDark]: isDarkMode },
          darkModeClassName,
          tw("w-full", "h-screen", "overflow-auto"),
        )}
      >
        <AppHeader
          account={account}
          active={active}
          chainId={chainId}
          connectorName={getConnectorName(connector, library)}
          deactivate={deactivate}
          hamburgerButton={<AppHamburgerButton />}
        />
        <TermsBanner />
        {children}
      </div>

      <div
        className={classNames(
          styles.appBackground,
          darkModeClassName,
          tw(
            "fixed",
            "w-full",
            "bottom-0",
            "flex",
            "px-8",
            "py-4",
            "justify-between",
            "block",
            "z-10",
            "lg:hidden",
          ),
          { [styles.appBackgroundDark]: isDarkMode },
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
          walletConnectionActive={active}
        />
      </div>
      <Overlay isOpen={isWrongChain}>
        <div
          className={tw(
            "flex",
            "justify-center",
            "items-center",
            "w-full",
            "h-full",
          )}
        >
          <H1
            className={tw("text-white")}
          >{t`Please Connect to ${chainName}`}</H1>
        </div>
      </Overlay>
      {/* Safe to render unconditionally as it does not render in production
      builds by default */}
      <ReactQueryDevtools initialIsOpen={false} />
    </Fragment>
  );
};

export default App;
