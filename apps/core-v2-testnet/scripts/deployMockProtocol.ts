import { ethers } from "hardhat";
import {
  deployForwarderFactory,
  deployMockToken,
  deployMockYearnVault,
  deployMockYieldAdapter,
} from "src/deploy";
import { createTerm } from "src/helpers/createTerm";
import { getCurrentBlockTimestamp } from "src/utils";
import { ONE_DAY_IN_SECONDS, ONE_MINUTE_IN_SECONDS } from "@elementfi/base";
import { deployMockPermitToken } from "src/deploy/mocks/deployMockPermitToken";

// Script to deploy a mock version of the core-v2 protocol
// Uses mock contracts from the @elementfi/protocol-v2 repo
async function main() {
  // Get signers
  const signers = await ethers.getSigners();

  // [ signer 1 for deploying | signer 2 for mock governance ]
  const [deployer, governance] = signers;

  // Deploy Forwarder Factory
  const forwarderFactory = await deployForwarderFactory(deployer);

  // Deploy mock tokens
  const usdc = await deployMockToken(deployer, "USDC", "USDC", 6);
  const dai = await deployMockToken(deployer, "DAI", "DAI", 6);
  const weth = await deployMockPermitToken(deployer, "USDC", "USDC", 6); // only permit token

  // ERC20Forwarder contract bytecode hash
  const linkHash = await forwarderFactory.ERC20LINK_HASH();

  // Deploy mock yearn vaults
  // todo see how many decimals is usdc token

  // Deploy mock vaults for each token
  const yvUSDC = await deployMockYearnVault(deployer, usdc.address);
  const yvDAI = await deployMockYearnVault(deployer, dai.address);
  const yvWETH = await deployMockYearnVault(deployer, weth.address);

  // Deploy mock yield adapter (term) for each vault token

  const usdcTerm = await deployMockYieldAdapter(
    deployer,
    yvUSDC.address,
    governance.address,
    linkHash,
    forwarderFactory.address,
    usdc.address,
  );

  const daiTerm = await deployMockYieldAdapter(
    deployer,
    yvDAI.address,
    governance.address,
    linkHash,
    forwarderFactory.address,
    dai.address,
  );

  const wethTerm = await deployMockYieldAdapter(
    deployer,
    yvWETH.address,
    governance.address,
    linkHash,
    forwarderFactory.address,
    weth.address,
  );

  // Mint tokens to deployer EOA and give term contract max allowance
  usdc.connect(deployer).mint(deployer.address, 1_000_000);
  usdc.approve(usdcTerm.address, ethers.constants.MaxUint256);

  dai.connect(deployer).mint(deployer.address, 1_000_000);
  dai.approve(daiTerm.address, ethers.constants.MaxUint256);

  // TODO @cashd: use permit here
  weth.connect(deployer).mint(deployer.address, 100_000);
  weth.approve(wethTerm.address, ethers.constants.MaxUint256);

  // Create 90 and 180 day terms
  const currentTimestamp = await getCurrentBlockTimestamp(ethers.provider);
  const start = currentTimestamp + ONE_MINUTE_IN_SECONDS;
  const expiry90 = currentTimestamp + ONE_DAY_IN_SECONDS * 90;
  const expiry180 = currentTimestamp + ONE_DAY_IN_SECONDS * 180;

  await createTerm(
    deployer,
    usdcTerm,
    start,
    expiry90,
    deployer.address,
    200_000,
  );

  await createTerm(
    deployer,
    usdcTerm,
    start,
    expiry180,
    deployer.address,
    200_000,
  );

  await createTerm(
    deployer,
    daiTerm,
    start,
    expiry90,
    deployer.address,
    200_000,
  );

  await createTerm(
    deployer,
    daiTerm,
    start,
    expiry180,
    deployer.address,
    200_000,
  );

  await createTerm(
    deployer,
    wethTerm,
    start,
    expiry90,
    deployer.address,
    15_000,
  );

  await createTerm(
    deployer,
    wethTerm,
    start,
    expiry180,
    deployer.address,
    15_000,
  );

  // Create pools for every term
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
