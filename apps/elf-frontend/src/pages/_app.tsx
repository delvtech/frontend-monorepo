// Next.js:
// Global CSS cannot be imported from files other than pages/_app.
// Read more: https://nextjs.org/docs/messages/css-global

// Normalize before everything else
import "normalize.css/normalize.css";

// Tailwind provides some modern low-level resets that don't need to be compiled
// into the main tailwind.output.css file.
import "tailwindcss/dist/base.css";

// custom fonts
import "@fontsource/rubik";
import "@fontsource/inter";
// end custom fonts

// Third party libraries
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import "@blueprintjs/select/lib/css/blueprint-select.css";
import "@blueprintjs/popover2/lib/css/blueprint-popover2.css";
// end Third party libraries

// Tailwind compiled
import "styles/tailwind.output.css";

// Our CSS
import "styles/variables.css";
import "styles/index.css";
// end our CSS

import "elf/debug/consoleEther";
import "addresses/addresses";

import { Web3ReactProvider } from "@web3-react/core";
import type { AppProps } from "next/app";
import React, { ReactElement, useEffect } from "react";
import { QueryClientProvider } from "react-query";

import App from "ui/app/App/App";
import { useClearLocalStorageOnNewVersion } from "ui/base/useClearLocalStorageOnNewVersion";
import { getEthereumProviderLibrary } from "elf/wallets/providers";

import { efiQueryClient } from "elf/queryClient";
import { AddressesJson, lookupAddressKey } from "addresses/addresses";
import { logAppVersion } from "logAppVersion";
import { FeatureFlag } from "elf/featureFlag/featureFlag";

logAppVersion();

function ElementUI({ Component, pageProps }: AppProps): ReactElement {
  useClearLocalStorageOnNewVersion();
  useEffect(() => {
    window.addresses = AddressesJson;
    window.lookupAddressKey = lookupAddressKey;

    if (typeof window !== "undefined") {
      (window as any).setZapSwapCurve = () => {
        window.localStorage.setItem(FeatureFlag.ZAP_SWAP_CURVE, "true");
      };
    }
  }, []);
  return (
    <Web3ReactProvider getLibrary={getEthereumProviderLibrary}>
      <QueryClientProvider client={efiQueryClient}>
        <React.StrictMode /* Only our components should be under strict mode */>
          <App>
            <Component {...pageProps} />
          </App>
        </React.StrictMode>
      </QueryClientProvider>
    </Web3ReactProvider>
  );
}

export default ElementUI;
