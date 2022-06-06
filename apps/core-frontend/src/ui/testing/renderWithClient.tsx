import React, { ReactElement } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

import { render, RenderResult } from "@testing-library/react";

export function renderWithClient(
  client: QueryClient,
  ui: ReactElement,
): RenderResult {
  return render(
    <QueryClientProvider client={client}>{ui}</QueryClientProvider>,
  );
}
