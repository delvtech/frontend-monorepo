import "@fontsource/rubik";
import "@fontsource/rubik/600.css";
import "@fontsource/roboto-mono";
import "@fontsource/roboto-mono/500.css";
import "@blueprintjs/popover2/lib/css/blueprint-popover2.css";
import "styles/globals.css";

import { Web3ReactProvider } from "@web3-react/core";
import { AppProps } from "next/app";
import React, { ReactElement } from "react";
import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { getEthereumProviderLibrary } from "src/base/getEthereumProviderLibrary";
import { ApolloProvider, ApolloClient, InMemoryCache, ApolloLink } from "@apollo/client";
import { getApolloLink } from "@elementfi/graphql";
import { councilSchema } from "@elementfi/council-graphql";
import { defaultProvider } from "src/providers/providers";
import { queryClient } from "src/queryClient";
import { addressesJson } from "src/addresses";
import { Notifications } from "src/ui/notifications/Notifications";

const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: getApolloLink({
    schemas: [councilSchema],
    provider: defaultProvider,
  }) as unknown as ApolloLink, // TODO: Find a better solution
});

// We want to log out addresses for sanity/debugging purposes
// eslint-disable-next-line no-console
console.log(addressesJson);
function MyApp({ Component, pageProps }: AppProps): ReactElement {
  return (
    <ApolloProvider client={apolloClient}>
      <QueryClientProvider client={queryClient}>
        <Web3ReactProvider getLibrary={getEthereumProviderLibrary}>
          <Notifications />
          <Component {...pageProps} />
        </Web3ReactProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </ApolloProvider>
  );
}

export default MyApp;
