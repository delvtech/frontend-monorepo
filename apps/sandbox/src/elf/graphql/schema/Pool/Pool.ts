import { makeExecutableSchema } from "@graphql-tools/schema";
import { formatEther } from "ethers/lib/utils";
import { poolIdsByPoolAddress } from "src/elf/liquiditymining/eligiblepools";
import { masterChef } from "src/elf/liquiditymining/masterChef";
import { Resolvers } from "src/elf/graphql";
import typeDefs from "./Pool.graphql";

const poolResolvers: Resolvers = {
  Query: {
    pool: (_, { address }) => ({ address }),
    pools: (_, { addresses }) => addresses.map((address) => ({ address })),
  },
  Pool: {
    stakedBalance: async ({ address }, { walletAddress }) => {
      const [balance] = await masterChef.functions.userInfo(
        poolIdsByPoolAddress[address],
        walletAddress,
      );
      return formatEther(balance);
    },
  },
};

export const poolSchema = makeExecutableSchema({
  typeDefs,
  resolvers: poolResolvers,
});
