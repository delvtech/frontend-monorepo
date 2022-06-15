import { chain, configureChains } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";

const LOCAL_RPC_HOST = "http://127.0.0.1:8545";

export const { chains, provider } = configureChains(
  [chain.mainnet, chain.goerli],
  // the providers for each chain are listed at config time, and wagmi will
  // fallback to the next provider in the list if a chain is not supported.
  [
    alchemyProvider({ alchemyId: process.env.NEXT_PUBLIC_MAINNET_ALCHEMY_ID }),
    alchemyProvider({ alchemyId: process.env.NEXT_PUBLIC_GOERLI_ALCHEMY_ID }),
    jsonRpcProvider({
      rpc: () => ({
        http: LOCAL_RPC_HOST,
      }),
    }),
  ],
);
