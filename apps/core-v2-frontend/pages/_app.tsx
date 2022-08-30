import "@blueprintjs/popover2/lib/css/blueprint-popover2.css";
import "@elementfi/component-library/dist/css/global.css";
import "@fontsource/roboto-mono";
import "@fontsource/roboto-mono/500.css";
import "@fontsource/rubik";
import "@fontsource/rubik/600.css";
import "@rainbow-me/rainbowkit/styles.css";
// styles/globals.css must be the last css import in order to overwrite the previous css imports
import "styles/globals.css";

import { ApolloProvider } from "@apollo/client";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { AppProps } from "next/app";
import dynamic from "next/dynamic";
import { ReactElement } from "react";
import { Toaster } from "react-hot-toast";
import { apolloClient } from "src/apolloClient";
import { chains } from "src/provider";
import { wagmiClient } from "src/wagmiClient";
import { WagmiConfig } from "wagmi";

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
    <WagmiConfigWithoutSSR client={wagmiClient}>
      <RainbowKitProvider chains={chains} showRecentTransactions>
        <ApolloProvider client={apolloClient}>
          <Toaster />
          <Component {...pageProps} />
        </ApolloProvider>
      </RainbowKitProvider>
    </WagmiConfigWithoutSSR>
  );
}

export default App;
