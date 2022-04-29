import { ERC20 } from "@elementfi/core-typechain/dist/libraries";
import { useSmartContractReadCalls } from "ui/contracts/useSmartContractReadCalls/useSmartContractReadCalls";
import { renderHookWithClient } from "ui/testing/renderHookWithClient";
import { createQueryClient } from "elf/queryClient";
import { BigNumber } from "ethers";
import { QueryObserverResult } from "react-query";

test("returns undefined results when contracts don't exist", async () => {
  const queryClient = createQueryClient();

  const undefinedContract = undefined;
  const { result } = renderHookWithClient(queryClient, () =>
    useSmartContractReadCalls([undefinedContract], "name"),
  );

  expect(result.current[0].data).toEqual(undefined);
});

test("provides data from smart contract read methods", async () => {
  const stubContractName1 = ["contract name 1"];
  const stubContractName2 = ["contract name 2"];
  const mockFn1 = jest.fn(async () => stubContractName1);
  const mockFn2 = jest.fn(async () => stubContractName2);

  const contract1 = {
    address: "0xContract1",
    callStatic: {
      name: mockFn1,
    },
  } as unknown as ERC20;
  const contract2 = {
    address: "0xContract2",
    callStatic: {
      name: mockFn2,
    },
  } as unknown as ERC20;

  const queryClient = createQueryClient();
  const { result, waitForNextUpdate, rerender } = renderHookWithClient(
    queryClient,
    () => useSmartContractReadCalls([contract1, contract2], "name"),
  );

  // called but hasn't resolved yet
  expect(mockFn1).toBeCalledTimes(1);
  expect(result.current[0].data).toEqual(undefined);
  expect(mockFn2).toBeCalledTimes(1);
  expect(result.current[1].data).toEqual(undefined);

  await waitForNextUpdate();

  // now we get the values
  expect(mockFn1).toBeCalledTimes(1);
  expect(result.current[0].data).toEqual(stubContractName1);
  expect(mockFn2).toBeCalledTimes(1);
  expect(result.current[1].data).toEqual(stubContractName2);

  rerender();

  // triggering re-renders doesn't result in unnecessary refetches
  expect(mockFn1).toBeCalledTimes(1);
  expect(mockFn2).toBeCalledTimes(1);
});

test("passes single arguments object to all smart contract read methods", async () => {
  const stubAddress = "0xWalletAddress";
  const stubBalanceOf1 = [BigNumber.from(10)];
  const stubBalanceOf2 = [BigNumber.from(90)];
  const mockFn1 = jest.fn(async () => stubBalanceOf1);
  const mockFn2 = jest.fn(async () => stubBalanceOf2);

  const contract1 = {
    address: "0xContract1",
    callStatic: {
      balanceOf: mockFn1,
    },
  } as unknown as ERC20;
  const contract2 = {
    address: "0xContract2",
    callStatic: {
      balanceOf: mockFn2,
    },
  } as unknown as ERC20;

  const queryClient = createQueryClient();
  const { result, waitForNextUpdate, rerender } = renderHookWithClient(
    queryClient,
    () =>
      useSmartContractReadCalls([contract1, contract2], "balanceOf", {
        callArgs: [stubAddress],
      }),
  );

  // called but hasn't resolved yet
  expect(mockFn1).toBeCalledTimes(1);
  expect(mockFn2).toBeCalledTimes(1);
  expect(result.current[0].data).toEqual(undefined);
  expect(result.current[1].data).toEqual(undefined);

  await waitForNextUpdate();

  // now we get the values
  expect(mockFn1).toBeCalledTimes(1);
  expect(mockFn1).toBeCalledWith(stubAddress);
  expect(mockFn2).toBeCalledTimes(1);
  expect(mockFn2).toBeCalledWith(stubAddress);
  expect(result.current[0].data).toEqual(stubBalanceOf1);
  expect(result.current[1].data).toEqual(stubBalanceOf2);

  rerender();

  // triggering re-renders doesn't result in unnecessary refetches
  expect(mockFn1).toBeCalledTimes(1);
  expect(mockFn2).toBeCalledTimes(1);
});
test("passes arguments object list to smart contract read methods", async () => {
  const stubAddress = "0xWalletAddress";
  const stubBalanceOf1 = [BigNumber.from(10)];
  const stubBalanceOf2 = [BigNumber.from(90)];
  const mockFn1 = jest.fn(async () => stubBalanceOf1);
  const mockFn2 = jest.fn(async () => stubBalanceOf2);

  const contract1 = {
    address: "0xContract1",
    callStatic: {
      balanceOf: mockFn1,
    },
  } as unknown as ERC20;
  const contract2 = {
    address: "0xContract2",
    callStatic: {
      balanceOf: mockFn2,
    },
  } as unknown as ERC20;

  const queryClient = createQueryClient();
  const { result, waitForNextUpdate, rerender } = renderHookWithClient(
    queryClient,
    () =>
      useSmartContractReadCalls([contract1, contract2], "balanceOf", [
        {
          callArgs: [stubAddress],
        },
        {
          callArgs: [stubAddress],
        },
      ]),
  );

  // called but hasn't resolved yet
  expect(mockFn1).toBeCalledTimes(1);
  expect(mockFn2).toBeCalledTimes(1);
  expect(result.current[0].data).toEqual(undefined);
  expect(result.current[1].data).toEqual(undefined);

  await waitForNextUpdate();

  // now we get the values
  expect(mockFn1).toBeCalledTimes(1);
  expect(mockFn1).toBeCalledWith(stubAddress);
  expect(mockFn2).toBeCalledTimes(1);
  expect(mockFn2).toBeCalledWith(stubAddress);
  expect(result.current[0].data).toEqual(stubBalanceOf1);
  expect(result.current[1].data).toEqual(stubBalanceOf2);

  rerender();

  // triggering re-renders doesn't result in unnecessary refetches
  expect(mockFn1).toBeCalledTimes(1);
  expect(mockFn2).toBeCalledTimes(1);
});

test("properly handles enabled option", async () => {
  const stubContractName1 = ["contract name 1"];
  const stubContractName2 = ["contract name 2"];
  const mockFn1 = jest.fn(async () => stubContractName1);
  const mockFn2 = jest.fn(async () => stubContractName2);

  const contract1 = {
    address: "0xContract1",
    callStatic: {
      name: mockFn1,
    },
  } as unknown as ERC20;
  const contract2 = {
    address: "0xContract2",
    callStatic: {
      name: mockFn2,
    },
  } as unknown as ERC20;

  const queryClient = createQueryClient();
  const { result, waitForNextUpdate, rerender } = renderHookWithClient<
    {
      enabled: boolean;
    },
    QueryObserverResult<string>[]
  >(
    queryClient,
    ({ enabled }) =>
      useSmartContractReadCalls([contract1, contract2], "name", [
        {
          enabled,
        },
        undefined,
      ]),
    { initialProps: { enabled: false } },
  );

  // not called because enabled is false
  expect(result.current[0].data).toEqual(undefined);
  expect(result.current[1].data).toEqual(undefined);
  expect(mockFn1).toBeCalledTimes(0);
  expect(mockFn2).toBeCalledTimes(1);

  rerender({ enabled: true });
  await waitForNextUpdate();

  expect(mockFn1).toBeCalledTimes(1);
  expect(mockFn2).toBeCalledTimes(1);
  expect(result.current[0].data).toEqual(stubContractName1);
  expect(result.current[1].data).toEqual(stubContractName2);
});
