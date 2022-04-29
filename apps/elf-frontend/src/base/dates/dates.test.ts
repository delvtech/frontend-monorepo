import {
  formatDay,
  formatFullDate,
  formatAbbreviatedDate,
  formatAbbreviatedMonthAndDay,
  formatYear,
} from "base/dates/dates";

const inputDate = new Date("6/3/1994");

describe("formatDay", () => {
  test("should return '03'", () => {
    expect(formatDay(inputDate)).toEqual("03");
  });
});

describe("formatFullDate", () => {
  test("should return 'June 03, 1994'", () => {
    expect(formatFullDate(inputDate)).toEqual("June 03, 1994");
  });
});

describe("formatAbbreviatedDate", () => {
  test("should return 'Jun 3, 1994'", () => {
    expect(formatAbbreviatedDate(inputDate)).toEqual("Jun 03, 1994");
  });
});

describe("formatAbbreviatedMonthAndDay", () => {
  test("should return 'June 3, 1994'", () => {
    expect(formatAbbreviatedMonthAndDay(inputDate)).toEqual("Jun 03");
  });
});

describe("formatYear", () => {
  test("should return '1994'", () => {
    expect(formatYear(inputDate)).toEqual("1994");
  });
});
