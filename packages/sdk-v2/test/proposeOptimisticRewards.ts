import {
  OptimisticRewards,
  OptimisticRewards__factory,
} from "@elementfi/council-typechain";
import { expect } from "chai";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { parseEther } from "ethers/lib/utils";
import hre, { ethers } from "hardhat";
import MerkleTree from "merkletreejs";

import { proposeOptimisticRewards } from "src/proposeOptimisticRewards";

import { Account, getMerkleTree } from "./merkle";

import { MockERC20, MockERC20__factory } from "@elementfi/council-typechain";

describe("proposeOptimisticRewards", () => {
  let signers: SignerWithAddress[];
  let signer: SignerWithAddress;
  let accounts: Account[];
  let merkleTree: MerkleTree;
  let votingToken: MockERC20;
  let optimisticRewards: OptimisticRewards;

  beforeEach(async () => {
    signers = await hre.ethers.getSigners();
    [signer] = signers;
    accounts = signers.map(({ address }) => ({
      address,
      value: parseEther("1"),
    }));
    merkleTree = getMerkleTree(accounts);

    votingToken = await deployVotingToken(signer);
    optimisticRewards = await deployOptimisticRewards(
      signer,
      votingToken.address,
      ethers.constants.AddressZero,
      merkleTree,
      ethers.constants.AddressZero,
    );
  });

  it("Should set the pending rewards root", async () => {
    const newAccounts = accounts.map(({ address }) => ({
      address,
      value: parseEther("2"),
    }));
    const newMerkleTree = getMerkleTree(newAccounts);
    const newRoot = newMerkleTree.getHexRoot();

    const tx = await proposeOptimisticRewards(
      optimisticRewards.address,
      newRoot,
      "",
      signer,
    );
    await tx.wait(1);

    const pendingRoot = await optimisticRewards.pendingRoot();
    const rewardsRoot = await optimisticRewards.rewardsRoot();
    const merkleRoot = merkleTree.getHexRoot();

    expect(pendingRoot).to.equal(newRoot);
    expect(rewardsRoot).to.equal(merkleRoot);
  });
});

// TODO: combine with with the deploy scripts from council-testnet
async function deployOptimisticRewards(
  signer: SignerWithAddress,
  elementTokenAddress: string,
  coreVotingAddress: string,
  merkleTree: MerkleTree,
  lockingVaultAddress: string,
): Promise<OptimisticRewards> {
  const rewardsDeployer = new OptimisticRewards__factory(signer);
  const merkleRoot = merkleTree.getHexRoot();
  const rewardsContract = await rewardsDeployer.deploy(
    coreVotingAddress,
    merkleRoot,
    signer.address,
    signer.address,
    elementTokenAddress,
    lockingVaultAddress,
  );

  return rewardsContract;
}

export async function deployVotingToken(
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
