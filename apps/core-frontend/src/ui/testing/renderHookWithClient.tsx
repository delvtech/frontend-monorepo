import React, { FC } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

import {
  renderHook,
  RenderHookOptions,
  RenderHookResult,
} from "@testing-library/react-hooks";

export function renderHookWithClient<P, R>(
  client: QueryClient,
  hook: (props: P) => R,
  renderOptions?: Pick<RenderHookOptions<P>, "initialProps">,
): RenderHookResult<P, R> {
  const QueryClientWrapper: FC<P> = ({ children }) => (
    <QueryClientProvider client={client}>{children}</QueryClientProvider>
  );

  return renderHook(hook, {
    wrapper: QueryClientWrapper,
    initialProps: renderOptions?.initialProps,
  });
}
