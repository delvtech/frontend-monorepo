import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import hre, { ethers } from "hardhat";

import { tradePrincipalTokens } from "src/tradePrincipalTokens/tradePrincipalTokens";

const tokenInAddress = ethers.constants.AddressZero;
const tokenOutAddress = ethers.constants.AddressZero;
const vaultAddress = ethers.constants.AddressZero;
describe("provideLiquidity", () => {
  let signers: SignerWithAddress[];
  let signer: SignerWithAddress;

  beforeEach(async () => {
    signers = await hre.ethers.getSigners();
    [signer] = signers;
  });

  it("Should return a transaction", async () => {
    const tx = await tradePrincipalTokens(
      tokenInAddress,
      tokenOutAddress,
      vaultAddress,
      "1",
      ".01",
      signer,
    );
    expect(tx.from).to.equal(signer.address);
  });
});
