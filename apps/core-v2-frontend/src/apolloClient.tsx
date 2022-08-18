import { provider } from "src/provider";
import { ApolloClient, ApolloLink, InMemoryCache } from "@apollo/client";
import { getApolloLink } from "@elementfi/graphql";
import { coreV2Graph } from "@elementfi/core-v2-graphql";

export const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: getApolloLink({
    graphs: [coreV2Graph],
    provider: provider({
      // TODO: Clean this up
      chainId: parseInt(process.env.NEXT_PUBLIC_CHAIN_ID || "5"),
    }),
  }) as unknown as ApolloLink, // TODO: Find a better solution
});
