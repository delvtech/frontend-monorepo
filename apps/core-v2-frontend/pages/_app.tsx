import "@fontsource/rubik";
import "@fontsource/rubik/600.css";
import "@fontsource/roboto-mono";
import "@fontsource/roboto-mono/500.css";
import "@blueprintjs/popover2/lib/css/blueprint-popover2.css";
import "@rainbow-me/rainbowkit/styles.css";
import "@elementfi/component-library/dist/css/global.css";
// styles/globals.css must be the last css import in order to overwrite the previous css imports
import "styles/globals.css";

import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiConfig } from "wagmi";

import { AppProps } from "next/app";
import React, { ReactElement } from "react";
import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { queryClient } from "src/queryClient";
import { chains } from "src/provider";
import { wagmiClient } from "src/wagmiClient";
import { Toaster } from "react-hot-toast";

function App({ Component, pageProps }: AppProps): ReactElement {
  return (
    <QueryClientProvider client={queryClient}>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains} showRecentTransactions>
          <Toaster />
          <Component {...pageProps} />
        </RainbowKitProvider>
      </WagmiConfig>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
