import {
  createServer as createYogaServer,
  YogaNodeServerInstance,
} from "@graphql-yoga/node";
import { useEnvelop } from "@envelop/core";
import init, { InitOptions } from "src/init";
import { envelopWithSchema } from "src/client/envelop";

/**
 * Create a Yoga Node Server instance with GraphiQL.
 * @param options An object for configuring the Yoga Server.
 * @param options.schemas An array of executable schemas with resolvers.
 * @param options.provider An ethers.js `Provider` instance that is added to the
 *   execution context for schema resolvers.
 * @returns An `YogaNodeServerInstance` instance.
 */
export default function createServer(
  options: InitOptions,
): YogaNodeServerInstance<
  {
    req: Request;
    res: Response;
  },
  Record<string, any>,
  void
> {
  const { schema, context } = init(options);
  return createYogaServer({
    plugins: [
      /* eslint-disable react-hooks/rules-of-hooks */
      useEnvelop(envelopWithSchema({ schema, context })),
      /* eslint-enable react-hooks/rules-of-hooks */
    ],
  });
}
