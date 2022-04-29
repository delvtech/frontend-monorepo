import { formatLengthOfTime } from "elf/time/formatLengthOfTime/formatLengthOfTime";
import {
  ONE_DAY_IN_MILLISECONDS,
  ONE_HOUR_IN_MILLISECONDS,
  TWELVE_HOUR_IN_MILLISECONDS,
} from "base/time";

test("should return hours if term length is < 1 day", () => {
  const twelveHours = formatLengthOfTime(0, TWELVE_HOUR_IN_MILLISECONDS);

  expect(twelveHours).toEqual("12 Hour");
});
test("should return exactly one day", () => {
  const oneDay = formatLengthOfTime(0, ONE_DAY_IN_MILLISECONDS);

  expect(oneDay).toEqual("1 Day");
});

test("should return round up days when appropriate", () => {
  const oneDayElevenHours = formatLengthOfTime(
    0,
    ONE_DAY_IN_MILLISECONDS +
      (TWELVE_HOUR_IN_MILLISECONDS - ONE_HOUR_IN_MILLISECONDS),
  );

  const oneDayTwelveHours = formatLengthOfTime(
    0,
    ONE_DAY_IN_MILLISECONDS + TWELVE_HOUR_IN_MILLISECONDS,
  );

  expect(oneDayElevenHours).toEqual("1 Day");
  expect(oneDayTwelveHours).toEqual("2 Day");
});
