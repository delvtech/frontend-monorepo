import { useEffect } from "react";

import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";

import { ChainId } from "base/ethereum/ethereum";
import { injectedConnector } from "elf/wallets/connectors";

/**
 * It's possible for an ethereum client to exist on window, which can change
 * state out from under the app. For example, disconnecting directly from the
 * MetaMask plugin will trigger events on the window.ethereum client.
 *
 * This effect keeps the app's Web3 context in sync w/ window.ethereum (if it
 * exists).
 */
export function useSyncWithInjectedEthereum(): void {
  const { active, error, activate, deactivate } = useWeb3React<Web3Provider>();

  useEffect(() => {
    const { ethereum } = window;

    if (!ethereum?.on || error || active) {
      return;
    }

    const handleChainChanged = (chainId: ChainId) => {
      console.warn("chainChanged", chainId);
      activate(injectedConnector);
    };

    const handleAccountsChanged = (accounts: string[]): void => {
      console.warn("accountsChanged", accounts);
      if (accounts.length > 0) {
        activate(injectedConnector);
      }
    };

    ethereum.on("chainChanged", handleChainChanged);
    ethereum.on("accountsChanged", handleAccountsChanged);

    return () => {
      if (ethereum.removeListener) {
        ethereum.removeListener("chainChanged", handleChainChanged);
        ethereum.removeListener("accountsChanged", handleAccountsChanged);
      }
    };
  }, [active, error, activate, deactivate]);
}
