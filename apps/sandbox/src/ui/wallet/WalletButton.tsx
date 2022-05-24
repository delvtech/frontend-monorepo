import React, { ReactElement, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { t } from "ttag";
import {
  getWalletConnectConnector,
  injectedConnector,
} from "src/elf/wallets/connectors";
import classNames from "classnames";

interface WalletButtonProps {
  className?: string;
}

export function WalletButton({ className }: WalletButtonProps): ReactElement {
  const [isShowingConnectOptions, setIsShowingConnectOptions] = useState(false);
  const showConnectOptions = () => setIsShowingConnectOptions(true);
  const hideConnectOptions = () => setIsShowingConnectOptions(false);

  const { account, activate, deactivate } = useWeb3React<Web3Provider>();

  const handleConnectToMetaMask = async () => {
    await deactivate();
    await activate(injectedConnector, deactivate);
    hideConnectOptions();
  };

  const handleConnectToWalletConnect = async () => {
    await deactivate();
    const walletConnectConnector = getWalletConnectConnector();
    await activate(walletConnectConnector, deactivate);
    hideConnectOptions();
  };

  return (
    <div className={classNames("flex gap-2", className)}>
      {isShowingConnectOptions ? (
        <div className="flex gap-2">
          <button
            className="h-12 rounded-xl px-4 py-3 shadow"
            onClick={handleConnectToMetaMask}
          >{t`MetaMask`}</button>
          <button
            className="h-12 rounded-xl px-4 py-3 shadow"
            onClick={handleConnectToWalletConnect}
          >{t`WalletConnect`}</button>
        </div>
      ) : !account ? (
        <button
          className="h-12 rounded-xl px-4 py-3 shadow"
          onClick={showConnectOptions}
        >{t`Connect Wallet`}</button>
      ) : (
        <button
          className="h-12 rounded-xl px-4 py-3 shadow"
          onClick={showConnectOptions}
        >
          {account.slice(0, 6)}...{account.slice(-4)}
        </button>
      )}
    </div>
  );
}
