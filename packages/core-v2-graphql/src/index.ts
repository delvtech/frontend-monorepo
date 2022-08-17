import { makeExecutableSchema } from "@graphql-tools/schema";
import { Graph } from "@elementfi/graphql";
import { resolvers } from "./resolvers";
import { initContext } from "./context/init";
import typeDefs from "./v2.graphql";

export const coreV2Schema = makeExecutableSchema({
  resolvers,
  typeDefs,
});

export const coreV2Graph: Graph = {
  schema: coreV2Schema,
  initContext,
};

export * from "./generated";
