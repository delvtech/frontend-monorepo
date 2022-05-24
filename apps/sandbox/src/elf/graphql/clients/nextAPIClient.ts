import { ApolloClient, InMemoryCache } from "@apollo/client";

/**
 * A simple Apollo client that sends graphql queries as HTTP requests to the
 * `/api/graphql` endpoint.
 */
export const nextAPIClient = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "/api/graphql",
});
