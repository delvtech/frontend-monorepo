import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import hre, { ethers } from "hardhat";
import { buyYieldTokens } from "src/buyYieldTokens/buyYieldTokens";

const contractAddress = ethers.constants.AddressZero;
describe("buyYieldtokens", () => {
  let signers: SignerWithAddress[];
  let signer: SignerWithAddress;

  beforeEach(async () => {
    signers = await hre.ethers.getSigners();
    [signer] = signers;
  });

  it("Should return a transaction", async () => {
    const tx = await buyYieldTokens(contractAddress, signer, "1");
    expect(tx.from).to.equal(signer.address);
  });
});
