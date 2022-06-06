import { formatTimeLeft } from "base/formatTImeLeft/formatTimeLeft";
import {
  ONE_DAY_IN_MILLISECONDS,
  ONE_HOUR_IN_MILLISECONDS,
  ONE_MINUTE_IN_MILLISECONDS,
} from "base/time";

test("should return 'in less than one minute' when less than 1 minute away", () => {
  const inThirtySeconds = 30 * 1000;

  expect(formatTimeLeft(0, inThirtySeconds)).toEqual("less than one minute");
});
test("should return minutes when less than 1 hour away", () => {
  const inTwoMinutes = 2 * ONE_MINUTE_IN_MILLISECONDS;

  expect(formatTimeLeft(0, inTwoMinutes)).toEqual("2 minutes");
});
test("should return days, hours, and minutes when less than 2 days away", () => {
  const inTwentyThreeHours = 23 * ONE_HOUR_IN_MILLISECONDS;
  const inTwentyThreeHoursTwelveMinutes =
    23 * ONE_HOUR_IN_MILLISECONDS + 12 * ONE_MINUTE_IN_MILLISECONDS;
  const inTwentyThreeHoursFiveSeconds = 23 * ONE_HOUR_IN_MILLISECONDS + 5000;

  const inOneDayOneHour = ONE_DAY_IN_MILLISECONDS + ONE_HOUR_IN_MILLISECONDS;
  const inOneDayOneHourTwelveMinutes =
    ONE_DAY_IN_MILLISECONDS +
    ONE_HOUR_IN_MILLISECONDS +
    12 * ONE_MINUTE_IN_MILLISECONDS;

  expect(formatTimeLeft(0, inTwentyThreeHours)).toEqual("23 hours");
  expect(formatTimeLeft(0, inTwentyThreeHoursFiveSeconds)).toEqual("23 hours"); // never return seconds
  expect(formatTimeLeft(0, inTwentyThreeHoursTwelveMinutes)).toEqual(
    "23 hours, 12 minutes",
  );
  expect(formatTimeLeft(0, ONE_DAY_IN_MILLISECONDS)).toEqual("1 day");
  expect(formatTimeLeft(0, inOneDayOneHour)).toEqual("1 day, 1 hour");
  expect(formatTimeLeft(0, inOneDayOneHourTwelveMinutes)).toEqual(
    "1 day, 1 hour, 12 minutes",
  );
});

test("should return months and days left when over a month away", () => {
  const inOneMonthEightDays =
    ONE_DAY_IN_MILLISECONDS * 31 + // epoch time is january 1st, so use 31 days
    ONE_DAY_IN_MILLISECONDS * 8 +
    5000;

  expect(formatTimeLeft(0, inOneMonthEightDays)).toEqual("1 month, 8 days");
});

test("should return days and hours left when less than a month away", () => {
  const inNineDaysOneHour =
    9 * ONE_DAY_IN_MILLISECONDS + ONE_HOUR_IN_MILLISECONDS;
  const inNineDaysOneHourThreeMinutes =
    9 * ONE_DAY_IN_MILLISECONDS +
    ONE_HOUR_IN_MILLISECONDS +
    3 * ONE_MINUTE_IN_MILLISECONDS;

  expect(formatTimeLeft(0, ONE_DAY_IN_MILLISECONDS)).toEqual("1 day");
  expect(formatTimeLeft(0, inNineDaysOneHour)).toEqual("9 days, 1 hour");

  // Don't include minutes when this much time left
  expect(formatTimeLeft(0, inNineDaysOneHourThreeMinutes)).toEqual(
    "9 days, 1 hour",
  );
});
