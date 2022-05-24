import { mergeSchemas } from "@graphql-tools/schema";
import { poolSchema } from "./Pool/Pool";
import { tokenSchema } from "./Token/Token";

export const schema = mergeSchemas({
  schemas: [poolSchema, tokenSchema],
  typeDefs: /* GraphQL */ `
    type Query {
      ping: String
    }
  `,
  resolvers: {
    Query: {
      ping: () => "pong",
    },
  },
});
