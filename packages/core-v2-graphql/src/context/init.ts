import { ResolverContext } from "@elementfi/graphql";
import { CoreV2Context } from "src/context";
import { TokenContract } from "src/datasources/TokenContract";

export function initContext({
  chainId,
  provider,
}: ResolverContext): CoreV2Context {
  return {
    chainId,
    provider,
    elementDataSources: {
      tokenContracts: [],
    },
  };
}
