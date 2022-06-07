import { expect } from "chai";
import { ethers } from "hardhat";

import { calculateLPTokensOut } from "src/calculateLPTokensOut/calculateLPTokensOut";

const tokenOneAddress = ethers.constants.AddressZero;
const tokenTwoAddress = ethers.constants.AddressZero;
const vaultAddress = ethers.constants.AddressZero;
const poolAddress = ethers.constants.AddressZero;

describe("calculateLPTokensOut", () => {
  it("Should return a string", async () => {
    const result = calculateLPTokensOut(
      [tokenOneAddress, tokenTwoAddress],
      ["1", "1"],
      ["1", "1"],
      vaultAddress,
      poolAddress,
    );
    expect(result).to.equal("1");
  });
});
