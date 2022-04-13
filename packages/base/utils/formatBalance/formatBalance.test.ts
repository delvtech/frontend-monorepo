import { BigNumber } from "ethers";
import { formatBalance } from "@elementfi/base/utils/formatBalance/formatBalance";

test("should return '0.0000' when given undefined parameters", () => {
  const oneEther = BigNumber.from("1000000000000000000");
  const expectedOutput = "0.0000";

  expect(formatBalance(undefined, 5)).toEqual(expectedOutput);
  expect(formatBalance(oneEther, undefined)).toEqual(expectedOutput);
});

test("should return '1.0' when given one eth as a balance", () => {
  const oneEther = BigNumber.from("1000000000000000000");

  expect(formatBalance(oneEther, 18)).toEqual("1.0");
});

test("should return '1,000.0' when given one thousand eth as a balance", () => {
  const oneThousandEther = BigNumber.from("1000000000000000000000");

  expect(formatBalance(oneThousandEther, 18)).toEqual("1,000.0");
});

test("should return '1000.0' when when given one thousand eth and formatCommas is set to false", () => {
  const oneThousandEther = BigNumber.from("1000000000000000000000");

  expect(
    formatBalance(oneThousandEther, 18, 4, { formatCommas: false }),
  ).toEqual("1000.0");
});
