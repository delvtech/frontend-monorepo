import {
  createServer as createYogaServer,
  YogaNodeServerInstance,
} from "@graphql-yoga/node";
import { mergeSchemas } from "@graphql-tools/schema";
import { GraphQLSchema } from "graphql";
import { Provider } from "@ethersproject/providers";
import { useEnvelop, useExtendContext } from "@envelop/core";
import { getEnvelopedBase } from "src/client/envelop";

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
export default function createServer({
  schemas,
  provider,
}: ServerOptions): YogaNodeServerInstance<
  {
    req: Request;
    res: Response;
  },
  Record<string, any>,
  void
> {
  const schema = mergeSchemas({ schemas });
  return createYogaServer({
    schema,
    plugins: [
      /* eslint-disable react-hooks/rules-of-hooks */
      useExtendContext(() => ({ provider })),
      useEnvelop(getEnvelopedBase),
      /* eslint-enable react-hooks/rules-of-hooks */
    ],
  });
}
