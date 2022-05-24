import { mergeSchemas } from "@graphql-tools/schema";
import { walletSchema } from "./Wallet/Wallet";
import { poolSchema } from "./Pool/Pool";
import { tokenSchema } from "./Token/Token";

export const schema = mergeSchemas({
  schemas: [walletSchema, poolSchema, tokenSchema],
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
