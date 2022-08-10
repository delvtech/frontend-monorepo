import "@fontsource/rubik";
import "@fontsource/rubik/600.css";
import "@fontsource/roboto-mono";
import "@fontsource/roboto-mono/500.css";
import "@blueprintjs/popover2/lib/css/blueprint-popover2.css";
import "styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";

import React, { ReactElement } from "react";
import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  ApolloLink,
} from "@apollo/client";
import { getApolloLink } from "@elementfi/graphql";
import { councilGraph } from "@elementfi/council-graphql";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { AppProps } from "next/app";
import { WagmiConfig } from "wagmi";
import { defaultProvider } from "src/providers/providers";
import { queryClient } from "src/queryClient";
import { addressesJson } from "src/addresses";
import { Notifications } from "src/ui/notifications/Notifications";
import { wagmiClient } from "src/wagmiClient";
import { chains } from "src/provider";

const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: getApolloLink({
    graphs: [councilGraph],
    provider: defaultProvider,
  }) as unknown as ApolloLink, // TODO: Find a better solution
});

// We want to log out addresses for sanity/debugging purposes
// eslint-disable-next-line no-console
console.log(addressesJson);
function MyApp({ Component, pageProps }: AppProps): ReactElement {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <ApolloProvider client={apolloClient}>
          <QueryClientProvider client={queryClient}>
            <Notifications />
            <Component {...pageProps} />
            <ReactQueryDevtools />
          </QueryClientProvider>
        </ApolloProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
