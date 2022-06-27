import { makeExecutableSchema } from "@graphql-tools/schema";
import typeDefs from "./council.graphql";
import { resolvers } from "./resolvers";

export const councilSchema = makeExecutableSchema({
  resolvers,
  typeDefs,
});

export * from "./generated";
