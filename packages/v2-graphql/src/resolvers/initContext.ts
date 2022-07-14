import { ResolverContext } from "@elementfi/graphql";
import { V2Context } from "src/logic/context";

export function initContext({ chainId, provider }: ResolverContext): V2Context {
  return {
    chainId,
    provider,
  };
}
