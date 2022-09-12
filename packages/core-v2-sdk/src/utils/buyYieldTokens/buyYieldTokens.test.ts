import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import hre, { ethers } from "hardhat";

import { buyYieldTokens } from "src/utils/buyYieldTokens/buyYieldTokens";

const contractAddress = ethers.constants.AddressZero;
const vaultAddress = ethers.constants.AddressZero;

describe("buyYieldtokens", () => {
  let signers: SignerWithAddress[];
  let signer: SignerWithAddress;

  beforeEach(async () => {
    signers = await hre.ethers.getSigners();
    [signer] = signers;
  });

  it("Should return a transaction", async () => {
    const tx = await buyYieldTokens(contractAddress, vaultAddress, "1", signer);
    expect(tx.from).to.equal(signer.address);
  });
});
