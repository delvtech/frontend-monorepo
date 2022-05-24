import { makeExecutableSchema } from "@graphql-tools/schema";
import { getTokenInfo } from "@elementfi/core/tokenlists/tokenlists";
import { Resolvers } from "src/elf/graphql";
import typeDefs from "./Token.graphql";

export const tokenResolvers: Resolvers = {
  Query: {
    token: (_, { address }) => getTokenInfo(address),
    tokens: (_, { addresses }) =>
      addresses.map((address) => getTokenInfo(address) || { address }),
  },
  Pool: {
    token: ({ address }) => getTokenInfo(address),
  },
};

export const tokenSchema = makeExecutableSchema({
  typeDefs,
  resolvers: tokenResolvers,
});
