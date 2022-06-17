import React, { FC } from "react";

import { fireEvent, render, screen } from "@testing-library/react";

import { useBoolean } from "ui/base/hooks/useBoolean/useBoolean";

test("Default value is set correctly", () => {
  const SampleComponent: FC<unknown> = () => {
    const { value } = useBoolean(true);
    return <div>{value.toString()}</div>;
  };

  const { getByText: unusedGetByText } = render(<SampleComponent />);
  const value = screen.getByText(/true/);
  expect(value).toBeInTheDocument();
});

test("Value can be set true", () => {
  const SampleComponent: FC<unknown> = () => {
    const { value, setTrue } = useBoolean();
    return <button onClick={setTrue}>{value.toString()}</button>;
  };

  const { getByText: unusedGetByText } = render(<SampleComponent />);
  const button = screen.getByText(/false/);

  expect(button).toBeInTheDocument();
  fireEvent.click(button);

  const buttonAfterClick = screen.getByText(/true/);
  expect(buttonAfterClick).toBeInTheDocument();
});

test("Value can be set false", () => {
  const SampleComponent: FC<unknown> = () => {
    const { value, setFalse } = useBoolean(true);
    return <button onClick={setFalse}>{value.toString()}</button>;
  };

  const { getByText: unusedGetByText } = render(<SampleComponent />);
  const button = screen.getByText(/true/);

  expect(button).toBeInTheDocument();
  fireEvent.click(button);

  const buttonAfterClick = screen.getByText(/false/);
  expect(buttonAfterClick).toBeInTheDocument();
});
