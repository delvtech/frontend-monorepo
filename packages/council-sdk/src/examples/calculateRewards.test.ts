import { MockERC20, MockERC20__factory } from "@elementfi/council-typechain";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { formatUnits, parseEther, parseUnits } from "ethers/lib/utils";
import hre, { waffle } from "hardhat";

import { fetchValueChangesForERC20 } from "src/fetchValueChangesForERC20";
import { mineBlocks } from "src/test/mineBlocks";
import { createSnapshot, restoreSnapshot } from "src/test/snapshot";
import { calculateRewards } from "src/examples/calculateRewards";
import { fetchIPFSData } from "src/fetchIPFSData";

const { provider } = waffle;

const ONE_ETH = BigInt(parseEther("1").toString());

const WBTC_DECIMALS = 8;
const ONE_WBTC = BigInt(parseUnits("1", WBTC_DECIMALS).toString());

describe("calculateRewards", () => {
  let signers: SignerWithAddress[];
  let deployer: SignerWithAddress;
  let signer1: SignerWithAddress;
  let signer2: SignerWithAddress;
  let signer3: SignerWithAddress;
  let tokenContract: MockERC20;

  before(async () => {
    // create snapshot of initial testnet at block 0
    await createSnapshot(provider);

    signers = await hre.ethers.getSigners();
    [deployer, signer1, signer2, signer3] = signers;

    // deployed in block 1
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

  it("should distribute rewards evenly for accounts", async () => {
    const balancesAtStartBlock = {
      [signer1.address]: ONE_ETH,
      [signer2.address]: ONE_ETH,
      [signer3.address]: ONE_ETH,
    };

    const signers1to3 = signers.slice(1, 4);

    // creates Transfer events in blocks 2-4, mints come from address zero.
    for (const signer of signers1to3) {
      await tokenContract.mint(signer.address, parseEther("10"));
    }

    // blocks 5 - 9
    await mineBlocks(5, provider);

    const startBlock = 5;
    const endBlock = 9;
    const rewardsForPeriod = ONE_WBTC;

    // there are no value changes in blocks 5-9, each user has 1 ETH the whole time
    const valueChanges = await fetchValueChangesForERC20(
      tokenContract.address,
      startBlock,
      endBlock,
      provider,
    );

    // we *should* see an even distribution for all users, since the reward for this period is 1
    // WBTC and we have 3 users, they should receive 1/3 WBTC each.
    const rewardsPerUser = calculateRewards(
      balancesAtStartBlock,
      valueChanges,
      startBlock,
      endBlock,
      rewardsForPeriod,
    );

    signers1to3.forEach((signer) => {
      const reward = formatUnits(
        rewardsPerUser[signer.address].toString(),
        WBTC_DECIMALS,
      );
      expect(reward).to.equal("0.33333333");
    });
  });

  it("should distribute rewards proportinally for accounts", async () => {
    const signers1to3 = signers.slice(1, 4);

    // creates Transfer events in blocks 2-4, mints come from address zero.
    for (const signer of signers1to3) {
      await tokenContract.mint(signer.address, parseEther("10"));
    }

    const ipfsData = await fetchIPFSData(
      "QmNzHnUwXEkaFatmKACmJ9Uxnpv2rtyiJ1mAarK7n2Nep7",
    );

    // starting balances for signer 1,2,3 should be at 10 ETH
    const balancesAtStartBlock = Object.fromEntries(
      ipfsData.leaves.map((leaf) => {
        const { address, data } = leaf;
        const { balance } =
          data.find(
            ({ tokenAddress }) => tokenAddress === tokenContract.address,
          ) || {};
        return [address, BigInt(balance || 0)];
      }),
    );

    const block = await provider.getBlockNumber();
    expect(block).to.equal(4);

    // block 5
    await mineBlocks(1, provider);
    // block 6
    await tokenContract.mint(signer1.address, parseEther("20"));
    // block 7
    await mineBlocks(1, provider);

    const startBlock = 5;
    const endBlock = 7;
    const rewardsForPeriod = ONE_WBTC;

    // signer 1 increases from 10 to 30 for an average of 20.  signer 2 and 3 have 10 the whole time.
    const valueChanges = await fetchValueChangesForERC20(
      tokenContract.address,
      startBlock,
      endBlock,
      provider,
    );

    // signer 1 average: 20 ETH
    // signer 2 average: 10 ETH
    // signer 3 average: 10 ETH
    // signer1  has an average of half the tokens (20/40 ETH), signer 2 and 3 have and average of one quarter
    // the tokens each. (10/40 ETH)
    const rewardsPerUser = calculateRewards(
      balancesAtStartBlock,
      valueChanges,
      startBlock,
      endBlock,
      rewardsForPeriod,
    );

    const signer1Reward = formatUnits(
      rewardsPerUser[signer1.address].toString(),
      WBTC_DECIMALS,
    );
    expect(signer1Reward).to.equal("0.5");

    const signer2Reward = formatUnits(
      rewardsPerUser[signer2.address].toString(),
      WBTC_DECIMALS,
    );
    expect(signer2Reward).to.equal("0.25");

    const signer3Reward = formatUnits(
      rewardsPerUser[signer3.address].toString(),
      WBTC_DECIMALS,
    );
    expect(signer3Reward).to.equal("0.25");
  });
});

export async function deployERC20(
  signer: SignerWithAddress,
): Promise<MockERC20> {
  const tokenDeployer = new MockERC20__factory(signer);
  const tokenContract = await tokenDeployer.deploy(
    "Mock ERC20",
    "MERC",
    signer.address,
  );

  return tokenContract;
}
