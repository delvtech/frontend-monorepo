import { GraphQLSchema } from "graphql";
import { Provider } from "@ethersproject/providers";
import { ApolloLink } from "@apollo/client";
import { YogaNodeServerInstance } from "@graphql-yoga/node";
interface LinkOptions {
  schemas: GraphQLSchema[];
  provider: Provider;
}
/**
 * Create an `ApolloLink` instance for Apollo Client (specifically, a
 * terminating link) that manages executing queries in the client.
 * @param options An object for configuring the execution layer.
 * @param options.schemas An array of executable schemas with resolvers.
 * @param options.provider An ethers.js `Provider` instance that is added to the
 *   execution context for schema resolvers.
 * @returns An `ApolloLink` instance.
 */
export function getApolloLink({ schemas, provider }: LinkOptions): ApolloLink;
interface ServerOptions {
  schemas: GraphQLSchema[];
  provider: Provider;
}
/**
 * Create a Yoga Node Server instance with GraphiQL.
 * @param options An object for configuring the Yoga Server.
 * @param options.schemas An array of executable schemas with resolvers.
 * @param options.provider An ethers.js `Provider` instance that is added to the
 *   execution context for schema resolvers.
 * @returns An `YogaNodeServerInstance` instance.
 */
export function createServer({
  schemas,
  provider,
}: ServerOptions): YogaNodeServerInstance<
  {
    req: Request;
    res: Response;
  },
  Record<string, any>,
  void
>;
export interface ResolverContext extends Record<string | number | symbol, any> {
  provider: Provider;
}

//# sourceMappingURL=main.d.ts.map
