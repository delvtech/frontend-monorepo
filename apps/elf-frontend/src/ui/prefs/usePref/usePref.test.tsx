import React, { FC, Fragment } from "react";

import { act } from "@testing-library/react-hooks";
import userEvent from "@testing-library/user-event";

import { usePref } from "ui/prefs/usePref/usePref";
import { renderHookWithClient } from "ui/testing/renderHookWithClient";
import { renderWithClient } from "ui/testing/renderWithClient";
import efiLocalStorage from "base/localStorage";
import { makePrefEnvelope } from "elf/prefs/prefEnvelope";
import { createQueryClient } from "elf/queryClient";
import { screen } from "@testing-library/dom";

test.skip("Default value is provided when no pref exists", () => {
  const { result } = renderUsePref();

  expect(result.current.pref).toEqual("default value");
});

test.skip("Stored value is provided when a pref already exists", () => {
  const prefEnvelope = makePrefEnvelope("this is a previously stored value");
  efiLocalStorage.setItem("test-pref", JSON.stringify(prefEnvelope));

  const { result } = renderUsePref();

  expect(result.current.pref).toEqual("this is a previously stored value");
});

test.skip("Updating the pref triggers a rerender correctly", async () => {
  const { findByText, queryByText, getByRole } = renderTestComponent();
  expect(await screen.findByText("default value")).toBeVisible();

  userEvent.click(screen.getByRole("button"));

  expect(await screen.findByText("new value!")).toBeVisible();
  expect(screen.queryByText("default value")).not.toBeInTheDocument();
});

// TODO: Skip this until `renderHook` behaves more like a react component, ie:
// triggering re-renders on custom hooks that wrap useQuery.
test.skip("Updating the pref triggers a rerender correctly", async () => {
  const { result, waitForNextUpdate } = renderUsePref();
  expect(result.current.pref).toEqual("default value");

  act(() => {
    result.current.setPref("new value!");
  });

  // From here down this test will fail until `renderHook` updates as a result
  // of calling `setPref`.
  await waitForNextUpdate();

  expect(result.current.pref).toEqual("new value!");
});

function renderTestComponent() {
  const queryClient = createQueryClient();
  const TestComponent: FC = () => {
    const { pref, setPref } = usePref("test-pref", "default value");

    return (
      <Fragment>
        <span>{pref}</span>
        <button onClick={() => setPref("new value!")}>click</button>
      </Fragment>
    );
  };
  return renderWithClient(queryClient, <TestComponent />);
}

function renderUsePref() {
  const queryClient = createQueryClient();
  return renderHookWithClient(queryClient, () => {
    return usePref("test-pref", "default value");
  });
}
