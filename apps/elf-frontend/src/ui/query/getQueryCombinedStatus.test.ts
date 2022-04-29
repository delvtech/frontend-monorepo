import {
  QueryObserverIdleResult,
  QueryObserverLoadingErrorResult,
  QueryObserverLoadingResult,
  QueryObserverResult,
  QueryObserverSuccessResult,
} from "react-query";

import { getQueryCombinedStatus } from "ui/query/getQueryCombinedStatus";

const sampleIdleResult: Partial<QueryObserverIdleResult> = { isIdle: true };
const sampleLoadingResult: Partial<QueryObserverLoadingResult> = {
  isIdle: false,
  isLoading: true,
};
const sampleErrorResult: Partial<QueryObserverLoadingErrorResult> = {
  isError: true,
};
const sampleSuccessResult: Partial<QueryObserverSuccessResult> = {
  isSuccess: true,
};

test("should return idle", () => {
  const queryResults = [
    { isIdle: true },
    { isIdle: true },
  ] as QueryObserverResult<unknown>[];
  expect(getQueryCombinedStatus(queryResults)).toEqual("idle");
});

test("should not return idle", () => {
  const queryResults = [
    { isIdle: true },
    { isIdle: false },
  ] as QueryObserverResult<unknown>[];
  expect(getQueryCombinedStatus(queryResults)).not.toEqual("idle");
});

test("should return loading", () => {
  const queryResults1 = [
    sampleIdleResult,
    sampleLoadingResult,
  ] as QueryObserverResult[];
  expect(getQueryCombinedStatus(queryResults1)).toEqual("loading");

  const queryResults2 = [
    sampleLoadingResult,
    sampleErrorResult,
  ] as QueryObserverResult[];
  expect(getQueryCombinedStatus(queryResults2)).toEqual("loading");

  const queryResults3 = [
    sampleLoadingResult,
    sampleErrorResult,
  ] as QueryObserverResult[];
  expect(getQueryCombinedStatus(queryResults3)).toEqual("loading");
});

test("should return error", () => {
  const queryResults = [
    sampleSuccessResult,
    sampleIdleResult,
  ] as QueryObserverResult<unknown>[];
  expect(getQueryCombinedStatus(queryResults)).toEqual("error");
});

test("should return success", () => {
  const queryResults = [
    sampleSuccessResult,
    sampleSuccessResult,
  ] as QueryObserverResult<unknown>[];
  expect(getQueryCombinedStatus(queryResults)).toEqual("success");
});

test("should default to error", () => {
  // this is a case that shouldn't happen.  the first result doesn't have any status so even though
  // the second is a success, we should return an error.
  const queryResults = [
    sampleIdleResult,
    sampleSuccessResult,
  ] as QueryObserverResult<unknown>[];
  expect(getQueryCombinedStatus(queryResults)).toEqual("error");
});
