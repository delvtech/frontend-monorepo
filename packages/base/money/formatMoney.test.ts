import { Currencies, Money } from "ts-money";

import { formatMoney } from "base/money/formatMoney";

test("should format undefined balance correctly", () => {
  expect(formatMoney(undefined)).toEqual(undefined);
});

test("should format to default value correctly", () => {
  expect(
    formatMoney(undefined, { defaultMoney: new Money(0, Currencies.USD) })
  ).toEqual("$0.00");
});

test("should format zero balance correctly", () => {
  const cents = new Money(0, Currencies.USD);
  expect(formatMoney(cents)).toEqual("$0.00");
});

test("should format micro balances correctly", () => {
  const cents = new Money(10, Currencies.USD);
  expect(formatMoney(cents)).toEqual("$0.10");
});

test("should format small balances correctly", () => {
  const cents = new Money(100, Currencies.USD);
  expect(formatMoney(cents)).toEqual("$1.00");
});

test("should format medium balances correctly", () => {
  const cents = new Money(10000, Currencies.USD);
  expect(formatMoney(cents)).toEqual("$100.00");
});

test("should format large balances correctly", () => {
  const cents = new Money(1000000, Currencies.USD);
  expect(formatMoney(cents)).toEqual("$10,000.00");
});
