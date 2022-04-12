import { convertEpochSecondsToDate } from "base/time/convertEpochSecondsToDate/convertEpochSecondsToDate";

test("when given 5 as an input should return correct date", () => {
  const expectedOutput = new Date(
    "Wed Dec 31 1969 16:00:05 GMT-0800 (Pacific Standard Time)",
  );

  expect(convertEpochSecondsToDate(5)).toEqual(expectedOutput);
});

test("when given 0 as an input should return correct date", () => {
  const expectedOutput = new Date(
    "Wed Dec 31 1969 16:00:00 GMT-0800 (Pacific Standard Time)",
  );

  expect(convertEpochSecondsToDate(0)).toEqual(expectedOutput);
});
