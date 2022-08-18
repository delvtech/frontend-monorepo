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

import { AppProps } from "next/app";
import dynamic from "next/dynamic";
import React, { ReactElement } from "react";
import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { queryClient } from "src/queryClient";
import { chains } from "src/provider";
import { wagmiClient } from "src/wagmiClient";
import { Toaster } from "react-hot-toast";
import { WagmiConfig } from "wagmi";
import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "src/apolloClient";

// Wagmi can't be rendered in SSR without exploding the dev-goerli server
const WagmiConfigWithoutSSR = dynamic(
  async () => {
    const { WagmiConfig } = await import("wagmi");
    return WagmiConfig;
  },
  {
    ssr: false,
  },
) as typeof WagmiConfig;

function App({ Component, pageProps }: AppProps): ReactElement {
  return (
    <QueryClientProvider client={queryClient}>
      <WagmiConfigWithoutSSR client={wagmiClient}>
        <RainbowKitProvider chains={chains} showRecentTransactions>
          <ApolloProvider client={apolloClient}>
            <Toaster />
            <Component {...pageProps} />
          </ApolloProvider>
        </RainbowKitProvider>
      </WagmiConfigWithoutSSR>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
