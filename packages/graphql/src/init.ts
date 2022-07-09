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
  ) => ResolverContext | Promise<ResolverContext>;
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
      const { chainId } = await provider.getNetwork();
      let context = {
        chainId,
        provider,
      };
      for (const { initContext } of graphs) {
        context = (await initContext?.(context)) || context;
      }
      resolve(context);
    }),
  };
}
