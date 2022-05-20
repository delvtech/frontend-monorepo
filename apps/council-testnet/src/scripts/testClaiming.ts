import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import {
  MockERC20__factory,
  OptimisticRewards__factory,
} from "@elementfi/council-typechain";
import { formatEther, parseEther } from "ethers/lib/utils";
import hre, { ethers } from "hardhat";
import addressesJson from "src/addresses/testnet.addresses.json";
import { getMerkleTree } from "src/merkle";

const ONE_ETHER = ethers.utils.parseEther("1");
async function testClaiming() {
  const signers: SignerWithAddress[] = await hre.ethers.getSigners();
  const [signer] = signers;
  const {
    addresses: { elementToken, optimisticRewardsVault },
  } = addressesJson;

  console.log(
    "signers",
    signers.map((s) => s.address),
  );

  const accounts = [];
  for (const i in signers) {
    accounts.push({
      address: signers[i].address,
      value: ONE_ETHER,
    });
  }
  const merkleTree = getMerkleTree(accounts);
  const root = merkleTree.getHexRoot();
  const leaves = merkleTree.getLeaves();
  const merkleProof = merkleTree.getHexProof(leaves[0]);

  console.log("root", root);
  console.log("leaves", leaves);
  console.log("proof", merkleProof);

  const rewardsContract = OptimisticRewards__factory.connect(
    optimisticRewardsVault,
    signer,
  );

  const elementTokenContract = MockERC20__factory.connect(elementToken, signer);

  const rewardsContractBalance = await elementTokenContract.balanceOf(
    optimisticRewardsVault,
  );

  if (rewardsContractBalance.eq(0)) {
    await elementTokenContract.setBalance(
      optimisticRewardsVault,
      parseEther("10"),
    );
  }

  const rewardsTx = await rewardsContract.claim(
    ONE_ETHER,
    ONE_ETHER,
    merkleProof,
    signer.address,
  );
  await rewardsTx.wait(1);

  const balance = await elementTokenContract.balanceOf(signer.address);
  console.log("balance", formatEther(balance));
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
testClaiming()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
