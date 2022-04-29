import { flushPromises } from "base/flush/flush";

beforeEach(() => {
  jest.useFakeTimers();
  jest.spyOn(global, "setTimeout");
});

afterEach(() => {
  jest.runOnlyPendingTimers();
  jest.useRealTimers();
});

test("should be called once and with the correct params", () => {
  flushPromises(100);

  expect(setTimeout).toHaveBeenCalledTimes(1);
  expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 100);
});
