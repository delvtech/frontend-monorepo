import { Currencies, Money } from "ts-money";
import { BigNumber } from "ethers";

import {
  convertToFiatBalance,
  convertNumberToFiatBalance,
} from "@elementfi/base";

describe("convertToFiatBalance", () => {
  const oneEther = BigNumber.from("1000000000000000000");
  const tenDollars = new Money(1000, Currencies.USD);
  const outputMoney = convertToFiatBalance(tenDollars, oneEther, 18);

  test("when given the price of 1 ether being $10 should be dollar denominated", () => {
    expect(outputMoney.currency).toEqual("USD");
  });

  test("when given the price of 1 ether being $10 should return 1000", () => {
    expect(outputMoney.amount).toEqual(1000);
  });
});

describe("convertNumberToFiatBalance", () => {
  const tenDollars = new Money(1000, Currencies.USD);
  const outputMoney = convertNumberToFiatBalance(tenDollars, 10);

  test("when given the price of 1 unit being $10 should be dollar denominated", () => {
    expect(outputMoney.currency).toEqual("USD");
  });

  test("when given the price of 1 unit being $10 should return 10000", () => {
    expect(outputMoney.amount).toEqual(10000);
  });
});
