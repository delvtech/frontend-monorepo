import { makeExecutableSchema } from "@graphql-tools/schema";
import { formatEther } from "ethers/lib/utils";
import {
  ConvergentCurvePool__factory,
  ERC20__factory,
} from "@elementfi/core-typechain/dist/v1.1";
import { defaultProvider } from "src/elf/providers/providers";
import { Resolvers } from "src/elf/graphql";
import typeDefs from "./Wallet.graphql";

const resolvers: Resolvers = {
  Query: {
    wallet: (_, { address }) => ({ address }),
    wallets: (_, { addresses }) => addresses.map((address) => ({ address })),
  },
  Wallet: {
    pool: (_, { address }) => ({
      address,
    }),
    pools: (_, { addresses }) => addresses.map((address) => ({ address })),
    token: (_, { address }) => ({
      address,
    }),
    tokens: (_, { addresses }) => addresses.map((address) => ({ address })),
  },
  Pool: {
    balance: async ({ address }, { walletAddress }) => {
      const poolContract = ConvergentCurvePool__factory.connect(
        address,
        defaultProvider,
      );
      const [balance] = await poolContract.functions.balanceOf(walletAddress);
      return formatEther(balance);
    },
  },
  Token: {
    balance: async ({ address }, { walletAddress }) => {
      const tokenContract = ERC20__factory.connect(address, defaultProvider);
      const [balance] = await tokenContract.functions.balanceOf(walletAddress);
      return formatEther(balance);
    },
  },
};

export const walletSchema = makeExecutableSchema({
  typeDefs,
  resolvers,
});
