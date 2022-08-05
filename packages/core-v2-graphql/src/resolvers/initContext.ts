import { ResolverContext } from "@elementfi/graphql";
import { CoreV2Context } from "src/context";

export function initContext({
  chainId,
  provider,
}: ResolverContext): CoreV2Context {
  return {
    chainId,
    provider,
    elementDataSources: {},
  };
}
