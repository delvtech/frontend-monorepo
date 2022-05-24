import { makeExecutableSchema } from "@graphql-tools/schema";
import { formatEther } from "ethers/lib/utils";
import { ConvergentCurvePool__factory } from "@elementfi/core-typechain/dist/v1.1";
import { defaultProvider } from "src/elf/providers/providers";
import { Resolvers } from "src/elf/graphql";
import typeDefs from "./Pool.graphql";

const poolResolvers: Resolvers = {
  Query: {
    pool: (_, { address }) => ({ address }),
    pools: (_, { addresses }) => addresses.map((address) => ({ address })),
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
};

export const poolSchema = makeExecutableSchema({
  typeDefs,
  resolvers: poolResolvers,
});
