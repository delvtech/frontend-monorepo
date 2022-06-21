import React from "react";
import { screen } from "@testing-library/react";

import { ViewTitle } from "ui/page/ViewTitle/ViewTitle";
import { renderWithClient } from "ui/testing/renderWithClient";
import { createQueryClient } from "elf/queryClient";

test("should render normally", async () => {
  const queryClient = createQueryClient();
  const { getByText: unusedGetByText } = await renderWithClient(
    queryClient,
    <ViewTitle title="sample title" subtitle="sample subtitle" />,
  );

  expect(screen.getByText("sample title")).toBeVisible();
  expect(screen.getByText("sample subtitle")).toBeVisible();
});
