// TODO: @reach/router has been removed. Look into how to do this with next.js
// https://nextjs.org/docs/api-reference/next/router#withrouter

// import React, { ReactNode } from "react";
// import { QueryClient, QueryClientProvider } from "react-query";

// import {
//   createHistory,
//   createMemorySource,
//   History,
//   LocationProvider,
// } from "@reach/router";
// import { render, RenderResult } from "@testing-library/react";
// import { Web3ReactProvider } from "@web3-react/core";

// import { getEthereumProviderLibrary } from "efi/wallets/providers";

// interface ProviderOptions {
//   route: string;
//   history: History;
//   queryClient: QueryClient;
// }

// interface RenderResultWithProviderOptions extends RenderResult {
//   history: History;
//   queryClient: QueryClient;
// }

// /**
//  * Testing utility to render a component with all of our app's providers.
//  * @param { ReactNode } ui the UI to test.
//  * @param { ProviderOptions } options options to customize the providers that wrap the component.
//  */
// export function renderWithAppProviders(
//   ui: ReactNode,
//   options: Partial<ProviderOptions> = {}
// ): RenderResultWithProviderOptions {
//   const {
//     route = "/",
//     queryClient = new QueryClient(),
//     history = createHistory(createMemorySource(route)),
//   } = options;

//   return {
//     ...render(
//       <Web3ReactProvider getLibrary={getEthereumProviderLibrary}>
//         <QueryClientProvider client={queryClient}>
//           <React.StrictMode>
//             <LocationProvider history={history}>{ui}</LocationProvider>
//           </React.StrictMode>
//         </QueryClientProvider>
//       </Web3ReactProvider>
//     ),
//     history,
//     queryClient,
//   };
// }

export {};
