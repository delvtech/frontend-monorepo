import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import hre, { ethers } from "hardhat";

import { redeemLiquidity } from "./redeemLiquidity";

const poolAddress = ethers.constants.AddressZero;

describe("redeemLiquidity", () => {
  let signers: SignerWithAddress[];
  let signer: SignerWithAddress;

  beforeEach(async () => {
    signers = await hre.ethers.getSigners();
    [signer] = signers;
  });

  it("Should return a transaction", async () => {
    const tx = await redeemLiquidity("1", poolAddress, signer);
    expect(tx.from).to.equal(signer.address);
  });
});
