import { makeExecutableSchema } from "@graphql-tools/schema";
import { Graph } from "@elementfi/graphql";
import { resolvers } from "./resolvers";
import { initContext } from "./context";
import typeDefs from "./v2.graphql";

export const elementSchema = makeExecutableSchema({
  resolvers,
  typeDefs,
});

export const elementGraph: Graph = {
  schema: elementSchema,
  initContext,
};

export * from "./generated";
