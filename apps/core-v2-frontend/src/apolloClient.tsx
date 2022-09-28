import { provider } from "src/provider";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { getApolloLink } from "@elementfi/graphql";
import { elementGraph } from "@elementfi/core-v2-graphql";

export const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: getApolloLink({
    graphs: [elementGraph],
    provider: provider({
      // TODO: Clean this up
      chainId: parseInt(process.env.NEXT_PUBLIC_CHAIN_ID || "5"),
    }),
  }),
});
