import { constants } from "ethers";
import { MockERC20, MockERC20__factory } from "@elementfi/council-typechain";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { parseEther } from "ethers/lib/utils";
import hre, { waffle } from "hardhat";

import { fetchValueChangesForERC20 } from "src/fetchValueChangesForERC20";
import { mineBlocks } from "src/test/mineBlocks";
import { createSnapshot, restoreSnapshot } from "src/test/snapshot";

const { provider } = waffle;

describe("fetchValueChangesForERC20", () => {
  let signers: SignerWithAddress[];
  let deployer: SignerWithAddress;
  let signer1: SignerWithAddress;
  let signer2: SignerWithAddress;
  let tokenContract: MockERC20;

  before(async () => {
    // create snapshot of initial testnet at block 0
    await createSnapshot(provider);

    signers = await hre.ethers.getSigners();
    [deployer, signer1, signer2] = signers;

    tokenContract = await deployERC20(deployer);
  });

  beforeEach(async () => {
    await createSnapshot(provider);
  });
  afterEach(async () => {
    await restoreSnapshot(provider);
  });

  after(async () => {
    // restore snapshot to empty testnet
    await restoreSnapshot(provider);
  });

  it("should return an ampty object if no value changes found", async () => {
    await mineBlocks(5, provider);

    const startBlock = 0;
    const endBlock = await provider.getBlockNumber();
    const valueChanges = await fetchValueChangesForERC20(
      tokenContract.address,
      startBlock,
      endBlock,
      provider,
    );

    expect(valueChanges).to.deep.equal({});
  });

  it("should fetch value changes for all holders, ignoring the zero address and token address", async () => {
    const signers1to5 = signers.slice(1, 6);

    // creates Transfer events in blocks 2-6, mints come from address zero.
    for (const signer of signers1to5) {
      await tokenContract.mint(signer.address, parseEther("10"));
    }

    const startBlock = 0;
    const endBlock = await provider.getBlockNumber();
    const valueChanges = await fetchValueChangesForERC20(
      tokenContract.address,
      startBlock,
      endBlock,
      provider,
    );

    expect(valueChanges).to.deep.equal({
      "0x70997970C51812dc3A010C7d01b50e0d17dc79C8": [
        { valueChange: 10000000000000000000n, at: 2 },
      ],
      "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC": [
        { valueChange: 10000000000000000000n, at: 3 },
      ],
      "0x90F79bf6EB2c4f870365E785982E1f101E93b906": [
        { valueChange: 10000000000000000000n, at: 4 },
      ],
      "0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65": [
        { valueChange: 10000000000000000000n, at: 5 },
      ],
      "0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc": [
        { valueChange: 10000000000000000000n, at: 6 },
      ],
    });

    expect(valueChanges[constants.AddressZero]).to.equal(undefined);
  });

  it("should only fetch value changes in range", async () => {
    const signers1to5 = signers.slice(1, 6);

    // creates Transfer events in blocks 2-6
    for (const signer of signers1to5) {
      await tokenContract.mint(signer.address, parseEther("10"));
    }

    // ignore value changes at blocks 2 and 6
    const startBlock = 3;
    const endBlock = 5;
    const valueChanges = await fetchValueChangesForERC20(
      tokenContract.address,
      startBlock,
      endBlock,
      provider,
    );

    const signers2to4 = signers.slice(2, 5);
    signers2to4.forEach(({ address }) => {
      expect(!!valueChanges[address]).to.equal(true);
    });

    const signer1 = signers[1];
    expect(valueChanges[signer1.address]).to.equal(undefined);
  });

  it("should order value changes in chronological order in each array", async () => {
    const signers1to5 = signers.slice(1, 6);

    // creates Transfer events in blocks 2-6
    for (const signer of signers1to5) {
      await tokenContract.mint(signer.address, parseEther("10"));
    }
    // creates Transfer events in blocks 7-12
    for (const signer of signers1to5) {
      await tokenContract.mint(signer.address, parseEther("10"));
    }
    // creates Transfer events in blocks 13-18
    for (const signer of signers1to5) {
      await tokenContract.mint(signer.address, parseEther("10"));
    }

    const startBlock = 2;
    const endBlock = 18;
    const valueChanges = await fetchValueChangesForERC20(
      tokenContract.address,
      startBlock,
      endBlock,
      provider,
    );

    expect(valueChanges[signer1.address]).to.deep.equal([
      { valueChange: 10000000000000000000n, at: 2 },
      { valueChange: 10000000000000000000n, at: 7 },
      { valueChange: 10000000000000000000n, at: 12 },
    ]);

    expect(valueChanges[signer2.address]).to.deep.equal([
      { valueChange: 10000000000000000000n, at: 3 },
      { valueChange: 10000000000000000000n, at: 8 },
      { valueChange: 10000000000000000000n, at: 13 },
    ]);
  });

  it("should record negative values when tokens transferred between holders", async () => {
    const signers1to5 = signers.slice(1, 6);

    // creates Transfer events in blocks 2-6
    for (const signer of signers1to5) {
      await tokenContract.mint(signer.address, parseEther("10"));
    }

    // creates Transfer events in block 7
    await tokenContract
      .connect(signer1)
      .transfer(signer2.address, parseEther("1"));

    const startBlock = 2;
    const endBlock = 7;
    const valueChanges = await fetchValueChangesForERC20(
      tokenContract.address,
      startBlock,
      endBlock,
      provider,
    );

    // transfer to signer 2 in block 7 shows up as negative
    expect(valueChanges[signer1.address]).to.deep.equal([
      { valueChange: 10000000000000000000n, at: 2 },
      { valueChange: -1000000000000000000n, at: 7 },
    ]);

    // transfer from signer 1 in block 7 shows up as positive
    expect(valueChanges[signer2.address]).to.deep.equal([
      { valueChange: 10000000000000000000n, at: 3 },
      { valueChange: 1000000000000000000n, at: 7 },
    ]);
  });
});

export async function deployERC20(
  signer: SignerWithAddress,
): Promise<MockERC20> {
  const tokenDeployer = new MockERC20__factory(signer);
  const tokenContract = await tokenDeployer.deploy(
    "Element Governance Token",
    "ELFI",
    signer.address,
  );

  return tokenContract;
}
