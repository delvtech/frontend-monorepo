import { ApolloLink, Observable } from "@apollo/client";
import init, { InitOptions } from "src/init";
import { handleQuery, envelopWithSchema } from "./envelop";

/**
 * Create an `ApolloLink` instance for Apollo Client (specifically, a
 * terminating link) that manages executing queries in the client.
 * @param options An object for configuring the execution layer.
 * @param options.schemas An array of executable schemas with resolvers.
 * @param options.provider An ethers.js `Provider` instance that is added to the
 *   execution context for schema resolvers.
 * @returns An `ApolloLink` instance.
 */
export default function getApolloLink(options: InitOptions): ApolloLink {
  const { schema, context } = init(options);
  const getEnveloped = envelopWithSchema({
    schema,
    context,
  });
  return new ApolloLink(
    ({ query, variables }) =>
      new Observable((observer) => {
        handleQuery({
          query,
          variables,
          getEnveloped,
          onError: (res) => {
            observer.next(res);
            observer.complete();
          },
          onSuccess: (res) => {
            observer.next(res);
            observer.complete();
          },
        });
      }),
  );
}
