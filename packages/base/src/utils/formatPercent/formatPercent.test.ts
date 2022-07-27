import { formatPercent } from "base/formatPercent/formatPercent";

test("should return correct percent given a decimal value", () => {
  const expectedOutput = "50.00%";
  const input = 0.5;

  expect(formatPercent(input)).toEqual(expectedOutput);
});

test("should return correct percent given a decimal value and precision", () => {
  const expectedOutput = "50%";
  const input = 0.5;

  expect(formatPercent(input, 0)).toEqual(expectedOutput);
});
