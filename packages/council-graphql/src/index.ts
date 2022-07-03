import { Graph } from "@elementfi/graphql";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { resolvers } from "./resolvers";
import { initContext } from "./resolvers/context";
import typeDefs from "./council.graphql";

export const councilSchema = makeExecutableSchema({
  resolvers,
  typeDefs,
});

export const councilGraph: Graph = {
  schema: councilSchema,
  initContext,
};

export * from "./generated";
