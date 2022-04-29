import { QueryObserverResult } from "react-query";

import { Contract } from "ethers";

import { useSmartContractReadCall } from "ui/contracts/useSmartContractReadCall/useSmartContractReadCall";
import { renderHookWithClient } from "ui/testing/renderHookWithClient";
import { createQueryClient } from "elf/queryClient";

const SAMPLE_READ_CONTRACT_CALL_RESULT = { 0: "sample contract name" };

test("does not run when contract doesn't exist", async () => {
  const mockNameFn = jest.fn(async () => SAMPLE_READ_CONTRACT_CALL_RESULT);

  const queryClient = createQueryClient();

  const undefinedContract = undefined;
  const { result } = renderHookWithClient(queryClient, () =>
    useSmartContractReadCall(undefinedContract, "name"),
  );

  // not called, no data
  expect(mockNameFn).toBeCalledTimes(0);
  expect(result.current.data).toEqual(undefined);
});
test("provides data from smart contract read methods", async () => {
  const mockNameFn = jest.fn(async () => SAMPLE_READ_CONTRACT_CALL_RESULT);

  const queryClient = createQueryClient();

  const { result, waitForNextUpdate, rerender } = renderHookWithClient(
    queryClient,
    () =>
      useSmartContractReadCall(
        { callStatic: { name: mockNameFn } } as unknown as Contract,
        "name",
      ),
  );

  // called but hasn't resolved yet
  expect(mockNameFn).toBeCalledTimes(1);
  expect(result.current.data).toEqual(undefined);

  await waitForNextUpdate();
  expect(mockNameFn).toBeCalledTimes(1);
  expect(result.current.data).toEqual(SAMPLE_READ_CONTRACT_CALL_RESULT);

  rerender();

  expect(mockNameFn).toBeCalledTimes(1);
  expect(result.current.data).toEqual(SAMPLE_READ_CONTRACT_CALL_RESULT);
});

test("passes arguments to smart contract read methods", async () => {
  const mockFn = jest.fn(async (a: string, b: string) => [a, b].join(" "));

  const queryClient = createQueryClient();
  const { result, waitForNextUpdate, rerender } = renderHookWithClient(
    queryClient,
    () =>
      useSmartContractReadCall(
        { callStatic: { name: mockFn } } as unknown as Contract,
        "name",
        {
          callArgs: ["firstarg", "secondArg"],
        },
      ),
  );

  expect(result.current.data).toEqual(undefined);

  await waitForNextUpdate();
  expect(mockFn).toBeCalledTimes(1);
  expect(mockFn).toBeCalledWith("firstarg", "secondArg");
  expect(result.current.data).toEqual("firstarg secondArg");

  rerender();

  expect(mockFn).toBeCalledTimes(1);
});

test("properly handles enabled option", async () => {
  const mockFn = jest.fn(async (a: string, b: string) => [a, b].join(" "));

  const queryClient = createQueryClient();
  const { result, waitForNextUpdate, rerender } = renderHookWithClient<
    {
      enabled: boolean;
    },
    QueryObserverResult<string>
  >(
    queryClient,
    ({ enabled }) =>
      useSmartContractReadCall(
        { callStatic: { name: mockFn } } as unknown as Contract,
        "name",
        {
          callArgs: ["firstarg", "secondArg"],
          enabled,
        },
      ),
    { initialProps: { enabled: false } },
  );

  expect(result.current.data).toEqual(undefined);

  expect(mockFn).toBeCalledTimes(0);

  rerender({ enabled: true });
  await waitForNextUpdate();

  expect(mockFn).toBeCalledTimes(1);
  expect(mockFn).toBeCalledWith("firstarg", "secondArg");
  expect(result.current.data).toEqual("firstarg secondArg");
});
