import { expect } from "chai";

import { calculateTradePrincipalTokens } from "src/calculateTradePrincipalTokens/calculateTradePrincipalTokens";

describe("calculateTradePrincipalTokens", () => {
  it("Should return a string", async () => {
    const result = await calculateTradePrincipalTokens(["1", "1"], ["1", "1"]);
    expect(result).to.equal("1");
  });
});
