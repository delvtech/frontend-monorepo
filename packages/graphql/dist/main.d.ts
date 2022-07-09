import { Provider } from "@ethersproject/providers";
import { GraphQLSchema } from "graphql";
import { ApolloLink } from "@apollo/client";
import { YogaNodeServerInstance } from "@graphql-yoga/node";
export interface InitOptions {
  graphs: Graph[];
  provider: Provider;
}
export type ResolverContext<
  T extends Record<string, any> = Record<string, any>,
> = {
  chainId: number;
  provider: Provider;
} & T;
export interface Graph {
  schema: GraphQLSchema;
  initContext?: (
    initialContext: ResolverContext,
  ) => ResolverContext | Promise<ResolverContext>;
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
export function getApolloLink(options: InitOptions): ApolloLink;
/**
 * Create a Yoga Node Server instance with GraphiQL.
 * @param options An object for configuring the Yoga Server.
 * @param options.schemas An array of executable schemas with resolvers.
 * @param options.provider An ethers.js `Provider` instance that is added to the
 *   execution context for schema resolvers.
 * @returns An `YogaNodeServerInstance` instance.
 */
export function createServer(options: InitOptions): YogaNodeServerInstance<
  {
    req: Request;
    res: Response;
  },
  Record<string, any>,
  void
>;

//# sourceMappingURL=main.d.ts.map
