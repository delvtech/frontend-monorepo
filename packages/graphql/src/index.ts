import type { Provider } from "@ethersproject/providers";

export { default as getApolloLink } from "./client/getApolloLink";
export { default as createServer } from "./server/createServer";

// This is used by codegen for the context variable type in resolvers, so it's
// important that any part of this package that's responsible for creating
// context, creates this type.
export interface ResolverContext extends Record<string | number | symbol, any> {
  provider: Provider;
}
