import React from "react";

import { render, screen } from "@testing-library/react";

import { LabeledProgressBar } from "ui/base/LabeledProgressBar/LabeledProgressBar";

test("should render the label", () => {
  const label = "until the end of time";
  const { getByText: unusedGetByText } = render(
    <LabeledProgressBar progressValue={0} label={label} showProgress />,
  );

  expect(screen.getByText(label)).toBeVisible();
});
