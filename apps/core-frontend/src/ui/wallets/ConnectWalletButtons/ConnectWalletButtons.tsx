import React, { CSSProperties, ReactElement, useCallback } from "react";

import { Button, ButtonGroup, Icon, Intent } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { t } from "ttag";

import CoinbaseIcon from "static/logos/coinbasewallet.svg";
import LedgerIcon from "static/logos/ledgerIcon.svg";
import MetamaskIcon from "static/logos/metamask.svg";
import LatticeIcon from "static/logos/svg/grid-plus-logo-white-blue.svg";
import TrezorIcon from "static/logos/svg/trezor-dark.svg";
import WalletConnectIcon from "static/logos/walletConnectIcon.svg";
import tw from "efi-tailwindcss-classnames";
import {
  coinbaseConnector,
  getWalletConnectConnector,
  injectedConnector,
  latticeConnector,
  ledgerConnector,
  trezorConnector,
} from "elf/wallets/connectors";

const connectorButtonClassName = tw("p-12", "w-1/4", "flex-col", "space-y-3");
const iconStyle: CSSProperties = {
  height: 48,
  width: 48,
};
const roundedIconStyle: CSSProperties = {
  height: 48,
  width: 48,
  // match border radius of the bp3-dialog
  borderRadius: 6,
};

interface ConnectWalletButtonsProps {
  vertical?: boolean;
  onClick?: () => void;
}

export function ConnectWalletButtons({
  vertical,
  onClick,
}: ConnectWalletButtonsProps): ReactElement {
  const { active, activate, deactivate, connector } =
    useWeb3React<Web3Provider>();

  const deactivateActiveConnector = useCallback(async () => {
    await deactivate();
  }, [deactivate]);

  const connectToMetaMask = useCallback(async () => {
    await deactivateActiveConnector();
    activate(injectedConnector, deactivateActiveConnector);
    onClick?.();
  }, [activate, deactivateActiveConnector, onClick]);

  const connectToWalletConnect = useCallback(async () => {
    await deactivateActiveConnector();
    const walletConnectConnector = getWalletConnectConnector();
    activate(walletConnectConnector, deactivateActiveConnector);
    onClick?.();
  }, [activate, deactivateActiveConnector, onClick]);

  const connectToCoinbase = useCallback(async () => {
    await deactivateActiveConnector();
    activate(coinbaseConnector, deactivateActiveConnector);
    onClick?.();
  }, [activate, deactivateActiveConnector, onClick]);

  const connectToLedger = useCallback(async () => {
    await deactivateActiveConnector();
    activate(ledgerConnector, (error) => {
      error && console.error(error);
      deactivateActiveConnector();
    });
    onClick?.();
  }, [activate, deactivateActiveConnector, onClick]);

  const connectToTrezor = useCallback(async () => {
    await deactivateActiveConnector();
    activate(trezorConnector, (error) => {
      error && console.error(error);
      deactivateActiveConnector();
    });
    onClick?.();
  }, [activate, deactivateActiveConnector, onClick]);

  const connectToLattice = useCallback(async () => {
    await deactivateActiveConnector();
    activate(latticeConnector, (error) => {
      error && console.error(error);
      deactivateActiveConnector();
    });
    onClick?.();
  }, [activate, deactivateActiveConnector, onClick]);

  const closeConnection = useCallback(async () => {
    await deactivateActiveConnector();
    if (!!(connector as WalletConnectConnector)?.close) {
      try {
        await (connector as WalletConnectConnector)?.close();
      } catch (error) {
        console.error(error);
      }
    }
  }, [connector, deactivateActiveConnector]);

  return (
    <div
      data-testid="connect-wallet-buttons"
      className={tw(
        "flex",
        "flex-col",
        "w-full",
        "justify-center",
        "overflow-auto",
      )}
    >
      <Button
        minimal
        outlined
        intent={Intent.PRIMARY}
        disabled={!active}
        onClick={closeConnection}
        className={tw("p-4", "m-4")}
        icon={<Icon icon={IconNames.CROSS} />}
      >{t`Close wallet connection`}</Button>
      <div className={tw("flex", "flex-col", "w-full", "px-8", "pb-4")}>
        <span>{t`- Some connectors can only change wallets from their app.`}</span>
        <span>{t`- Some connectors may cause a page refresh.`}</span>
      </div>
      <ButtonGroup className={tw("flex-wrap")} vertical={vertical} fill>
        <Button
          minimal
          className={connectorButtonClassName}
          onClick={connectToMetaMask}
          icon={<MetamaskIcon style={iconStyle} />}
        >
          <span className={tw("text-base")}>MetaMask</span>
        </Button>
        <Button
          minimal
          className={connectorButtonClassName}
          onClick={connectToWalletConnect}
          icon={<WalletConnectIcon style={iconStyle} />}
        >
          <span className={tw("text-base")}>WalletConnect</span>
        </Button>
        <Button
          minimal
          className={connectorButtonClassName}
          onClick={connectToCoinbase}
          icon={<CoinbaseIcon style={roundedIconStyle} />}
        >
          <span className={tw("text-base")}>Coinbase</span>
        </Button>
        <Button
          minimal
          className={connectorButtonClassName}
          onClick={connectToLedger}
          icon={<LedgerIcon style={roundedIconStyle} />}
        >
          <span className={tw("text-base")}>Ledger</span>
        </Button>
        <Button
          minimal
          className={connectorButtonClassName}
          onClick={connectToTrezor}
          icon={
            <TrezorIcon style={{ ...roundedIconStyle, background: "black" }} />
          }
        >
          <span className={tw("text-base")}>Trezor</span>
        </Button>
        <Button
          minimal
          className={connectorButtonClassName}
          onClick={connectToLattice}
          icon={
            <LatticeIcon style={{ ...roundedIconStyle, background: "black" }} />
          }
        >
          <span className={tw("text-base")}>Lattice</span>
        </Button>
      </ButtonGroup>
    </div>
  );
}
