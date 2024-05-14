import { Web3Provider } from "@ethersproject/providers";
import { AbstractConnector } from "@web3-react/abstract-connector";
import { InjectedConnector } from "@web3-react/injected-connector";
import { LatticeConnector } from "@web3-react/lattice-connector";
import { LedgerConnector } from "@web3-react/ledger-connector";
import { TrezorConnector } from "@web3-react/trezor-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { WalletLinkConnector } from "@web3-react/walletlink-connector";
import { t } from "ttag";

import { AddressesJson } from "addresses/addresses";
import { ChainId, ChainNames, DEFAULT_CHAIN_IDS } from "base/ethereum/ethereum";
import {
  ALCHEMY_GOERLI_HTTP_URL,
  ALCHEMY_MAINNET_HTTP_URL,
} from "elf/providers/providers";

/**
 * The 'injected' connector refers to plugin-based wallets like MetaMask, which
 * inject it's client library into the window object.
 */
export const injectedConnector = new InjectedConnector({
  supportedChainIds: DEFAULT_CHAIN_IDS,
});

// Patch chainChanged 0xNaN causing app to crash when switching from the mainnet
// to localnet. See: https://github.com/NoahZinsmeister/web3-react/issues/73
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
const originalChainIdChangeHandler = injectedConnector.handleChainChanged;
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
injectedConnector.handleChainChanged = (chainId: string | number) => {
  // preserve the existing console log from the
  // eslint-disable-next-line no-console
  console.debug("Handling 'chainChanged' event with payload", chainId);
  if (chainId === "0xNaN") {
    return; //Ignore 0xNaN, when user doesn't set chainId
  }
  originalChainIdChangeHandler(chainId);
};

/**
 * WalletConnect.  This provides access to many mobile wallets that use the wallet connect protocol
 * like Rainbow, Argent etc.  Note that once this connector is closed, it can't be reopened so we
 * need to create a new instance to try to connect again.
 */
export function getWalletConnectConnector(): WalletConnectConnector {
  const walletConnectConnector = new WalletConnectConnector({
    rpc: {
      [ChainId.MAINNET]: ALCHEMY_MAINNET_HTTP_URL,
      [ChainId.GOERLI]: ALCHEMY_GOERLI_HTTP_URL,
      [ChainId.LOCAL]: ChainNames[ChainId.LOCAL],
    },
  });
  return walletConnectConnector;
}

export const coinbaseConnector = new WalletLinkConnector({
  url:
    AddressesJson.chainId === ChainId.MAINNET
      ? ALCHEMY_MAINNET_HTTP_URL
      : ALCHEMY_GOERLI_HTTP_URL,
  appName: "Element Finance",
});

export const ledgerConnector = new LedgerConnector({
  chainId: AddressesJson.chainId,
  url:
    AddressesJson.chainId === ChainId.MAINNET
      ? ALCHEMY_MAINNET_HTTP_URL
      : ALCHEMY_GOERLI_HTTP_URL,
});

export const trezorConnector = new TrezorConnector({
  manifestEmail: "support@website.com",
  manifestAppUrl: "https://app.website.com",
  chainId: AddressesJson.chainId,
  url:
    AddressesJson.chainId === ChainId.MAINNET
      ? ALCHEMY_MAINNET_HTTP_URL
      : ALCHEMY_GOERLI_HTTP_URL,
});

export const latticeConnector = new LatticeConnector({
  appName: "Element Finance",
  chainId: AddressesJson.chainId,
  url:
    AddressesJson.chainId === ChainId.MAINNET
      ? ALCHEMY_MAINNET_HTTP_URL
      : ALCHEMY_GOERLI_HTTP_URL,
});

export function getConnectorName(
  connector?: AbstractConnector | undefined,
  library?: Web3Provider | undefined,
): string | undefined {
  if (!connector) {
    return undefined;
  }

  // Metamask is special. It's connector doesn't identify itself so we have to
  // use the library instead. :(
  if (isMetaMaskConnector(library)) {
    return "MetaMask";
  }

  if (isWalletConnectConnector(connector)) {
    const walletBrand =
      connector.walletConnectProvider?.connector?.clientMeta?.name ||
      t`unknown`;
    return `WalletConnect (${walletBrand})`;
  }

  return t`Uknown connector`;
}

export function isWalletConnectConnector(
  connector: AbstractConnector,
): connector is WalletConnectConnector {
  return !!(connector as WalletConnectConnector)?.walletConnectProvider;
}

export function isMetaMaskConnector(
  library?: Web3Provider | undefined,
): boolean {
  return library?.connection?.url === "metamask";
}
