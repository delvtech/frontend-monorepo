import "@fontsource/rubik";
import "@fontsource/rubik/600.css";
import "@fontsource/roboto-mono";
import "@fontsource/roboto-mono/500.css";
import "styles/globals.css";

import { Web3ReactProvider } from "@web3-react/core";
import { AppProps } from "next/app";
import React, { ReactElement } from "react";
import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { getEthereumProviderLibrary } from "src/elf/getEthereumProviderLibrary";
import { queryClient } from "src/elf/queryClient";
import { ApolloProvider } from "@apollo/client";
import { envelopClient } from "src/elf/graphql/clients/envelopClient";

function MyApp({ Component, pageProps }: AppProps): ReactElement {
  return (
    <ApolloProvider client={envelopClient}>
      <QueryClientProvider client={queryClient}>
        <Web3ReactProvider getLibrary={getEthereumProviderLibrary}>
          <Component {...pageProps} />
        </Web3ReactProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </ApolloProvider>
  );
}

export default MyApp;
