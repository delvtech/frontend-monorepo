import { ResolverContext } from "@elementfi/graphql";
import { V2Context } from "src/context";

export function initContext({ chainId, provider }: ResolverContext): V2Context {
  return {
    chainId,
    provider,
    elementDataSources: {},
  };
}
