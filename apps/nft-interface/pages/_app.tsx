import "@fontsource/rubik";
import { Web3ReactProvider } from "@web3-react/core";
import { TermsBanner } from "components/Banners/TermsBanners";
import { IneligibleAccountDialog } from "components/Dialogs/IneligibleAccountDialog";
import { SwitchNetworkDialog } from "components/Dialogs/SwitchNetworkDialog";
import { Footer } from "components/Layout/Footer";
import { Header } from "components/Layout/Header";
import { Transition } from "components/Layout/Transition";
import { WalletNotifier } from "components/Wallet/WalletNotifier";
import { WalletDialogProvider } from "contexts/WalletDialogContext/provider";
import { DefaultSeo } from "next-seo";
import SEO from "next-seo.config";
import type { AppProps } from "next/app";
import Head from "next/head";
import "public/assets/fonts/style.css";
import { ReactElement } from "react";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "react-query";
import { getEthereumProviderLibrary } from "src/providers/getEthereumProviderLibrary";
import { GlobalStyle } from "styles/globalStyles";

const queryClient = new QueryClient();

export default function App({
  Component,
  pageProps,
  router,
}: AppProps): ReactElement {
  return (
    <>
      <Head>
        <title>Element ElfiVerse</title>
        <meta name="robots" content="follow, index" />
        <meta content={""} name="description" />
        <meta
          property="og:url"
          content={`https://elfiverse.delv.tech${router.asPath}`}
        />
        <link
          rel="canonical"
          href={`https://elfiverse.delv.tech${router.asPath}`}
        />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Elfiverse" />
        <meta property="og:description" content="Elfiverse" />
        <meta property="og:title" content="Elfiverse" />
        <meta property="og:image" content="" />
        <meta property="og:image:alt" content="" />
        <meta
          name="twitter:card"
          content="https://elfiverse.delv.tech/Metaname.png"
        />
        <meta name="twitter:site" content="@element_fi" />
        <meta name="twitter:title" content="Elfiverse" />
        <meta name="twitter:description" content="Enter the Elfiverse" />
        <meta
          name="twitter:image"
          content="https://elfiverse.delv.tech/Metaname.png"
        />
      </Head>
      <GlobalStyle />
      <DefaultSeo {...SEO} />
      <Web3ReactProvider getLibrary={getEthereumProviderLibrary}>
        <QueryClientProvider client={queryClient}>
          <SwitchNetworkDialog />
          <TermsBanner />
          <WalletDialogProvider>
            <IneligibleAccountDialog />
            <Header />
            <Toaster />
            <WalletNotifier>
              <Transition location={router.pathname}>
                <Component {...pageProps} />
              </Transition>
            </WalletNotifier>
          </WalletDialogProvider>
        </QueryClientProvider>
      </Web3ReactProvider>
      <Footer />
    </>
  );
}
