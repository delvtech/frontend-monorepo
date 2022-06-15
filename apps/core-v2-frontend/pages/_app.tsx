import "@fontsource/rubik";
import "@fontsource/rubik/600.css";
import "@fontsource/roboto-mono";
import "@fontsource/roboto-mono/500.css";
import "@blueprintjs/popover2/lib/css/blueprint-popover2.css";
import "@rainbow-me/rainbowkit/styles.css";
import "styles/globals.css";

import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiConfig } from "wagmi";

import { AppProps } from "next/app";
import React, { ReactElement } from "react";
import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Notifications } from "src/ui/notifications/Notifications";
import { queryClient } from "src/queryClient";
import { chains } from "src/provider";
import { wagmiClient } from "src/wagmiClient";

function App({ Component, pageProps }: AppProps): ReactElement {
  return (
    <QueryClientProvider client={queryClient}>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains} showRecentTransactions>
          <Notifications />
          <Component {...pageProps} />
        </RainbowKitProvider>
      </WagmiConfig>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
