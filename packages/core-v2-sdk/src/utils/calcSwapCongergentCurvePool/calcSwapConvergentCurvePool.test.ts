import { expect } from "chai";
import { calcSwapConvergentCurvePool } from "./calculateTradePrincipalTokens";

describe("cacl", () => {
  it("Should return a string", () => {
    const result = calcSwapConvergentCurvePool(["1", "1"], ["1", "1"]);
    expect(result).to.equal("1");
  });
});
