import { Provider } from "@ethersproject/providers";
import { mergeSchemas } from "@graphql-tools/schema";
import { GraphQLSchema } from "graphql";

// This is used by codegen for the context variable type in resolvers, so it's
// important that any part of this package that's responsible for creating
// context, creates this type.
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
  ) => Record<string, any> | Record<string, any>;
}

export interface InitOptions {
  graphs: Graph[];
  provider: Provider;
}

/**
 * Initialize the schema and context from an array of `Graph`s.
 * @param options An object for configuring the execution layer.
 * @param options.graphs An array of `Graph`s which contain executable schemas
 *  and `initContext` functions.
 * @param options.provider An ethers.js `Provider` instance that is added to the
 *   execution context for schema resolvers.
 * @returns A single merged schema and context.
 */
export default function init({ graphs, provider }: InitOptions): {
  schema: GraphQLSchema;
  context: Promise<ResolverContext>;
} {
  const schemas = graphs.map(({ schema }) => schema);
  return {
    schema: mergeSchemas({ schemas }),
    context: new Promise<ResolverContext>(async (resolve) => {
      let chainId: number;
      try {
        // this will throw errors if the network can't be fetched (e.g., the
        // provider is a local json rpc host and the network isn't running.)
        const network = await provider.getNetwork();
        chainId = network.chainId;
      } catch {
        chainId = 31337;
      }
      const initialContext = {
        chainId,
        provider,
      };
      let context = initialContext;
      for (const { initContext } of graphs) {
        context = {
          ...context,
          ...(await initContext?.(initialContext)),
        };
      }
      resolve(context);
    }),
  };
}
