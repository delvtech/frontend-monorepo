import { makeExecutableSchema } from "@graphql-tools/schema";
import { Resolvers } from "src/elf/graphql";
import typeDefs from "./Pool.graphql";

const poolResolvers: Resolvers = {
  Query: {
    pool: (_, { address }) => ({ address }),
    pools: (_, { addresses }) => addresses.map((address) => ({ address })),
  },
};

export const poolSchema = makeExecutableSchema({
  typeDefs,
  resolvers: poolResolvers,
});
