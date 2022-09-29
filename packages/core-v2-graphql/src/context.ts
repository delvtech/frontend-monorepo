import { ElementContext } from "@elementfi/core-v2-sdk";
import { ResolverContext } from "@elementfi/graphql";

export type ElementGraphQLContext = {
  elementContext: ElementContext;
};

export function initContext({
  chainId,
  provider,
}: ResolverContext): ElementGraphQLContext {
  return {
    elementContext: new ElementContext({ chainId, provider }),
  };
}
