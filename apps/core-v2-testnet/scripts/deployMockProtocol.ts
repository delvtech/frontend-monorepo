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
import { deployMockPool } from "src/deploy/mocks/deployMockPool";

// Script to deploy a mock version of the core-v2 protocol
// Uses mock contracts from the @elementfi/protocol-v2 repo
async function main() {
  // Get signers
  const signers = await ethers.getSigners();

  // [ signer 1 for deploying | signer 2 for mock governance | signer 3 for mock user]
  const [deployer, governance, user] = signers;

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
  await usdc.mint(user.address, 1_000_000);
  await usdc
    .connect(user)
    .approve(usdcTerm.address, ethers.constants.MaxUint256);

  await dai.mint(user.address, 1_000_000);
  await dai.connect(user).approve(daiTerm.address, ethers.constants.MaxUint256);

  // TODO @cashd: use permit here
  await weth.mint(user.address, 100_000);
  await weth
    .connect(user)
    .approve(wethTerm.address, ethers.constants.MaxUint256);

  // Create 90 and 180 day terms
  const currentTimestamp = await getCurrentBlockTimestamp(ethers.provider);
  const start = currentTimestamp + ONE_MINUTE_IN_SECONDS;
  const expiry90 = currentTimestamp + ONE_DAY_IN_SECONDS * 90;
  const expiry180 = currentTimestamp + ONE_DAY_IN_SECONDS * 180;

  await createTerm(user, usdcTerm, start, expiry90, user.address, 200_000);
  await createTerm(user, usdcTerm, start, expiry180, user.address, 200_000);
  await createTerm(user, daiTerm, start, expiry90, user.address, 200_000);
  await createTerm(user, daiTerm, start, expiry180, user.address, 200_000);
  await createTerm(user, wethTerm, start, expiry90, user.address, 15_000);
  await createTerm(user, wethTerm, start, expiry180, user.address, 15_000);

  // Create pools for every term
  const fee = 0;

  const usdcPool = await deployMockPool(
    deployer,
    usdcTerm,
    usdc,
    fee,
    linkHash,
    governance,
    forwarderFactory,
  );

  const daiPool = await deployMockPool(
    deployer,
    daiTerm,
    dai,
    fee,
    linkHash,
    governance,
    forwarderFactory,
  );

  const wethPool = await deployMockPool(
    deployer,
    wethTerm,
    weth,
    fee,
    linkHash,
    governance,
    forwarderFactory,
  );

  // give allowance from user to pool
  await usdc
    .connect(user)
    .approve(usdcPool.address, ethers.constants.MaxUint256);
  await dai.connect(user).approve(daiPool.address, ethers.constants.MaxUint256);
  await weth
    .connect(user)
    .approve(wethPool.address, ethers.constants.MaxUint256);

  // register pool for every 90 / 180 day term
  await usdcPool
    .connect(user)
    .registerPoolId(expiry90, 100_000, 10000, user.address, 0, 0);
  await usdcPool
    .connect(user)
    .registerPoolId(expiry180, 100_000, 10000, user.address, 0, 0);
  await daiPool
    .connect(user)
    .registerPoolId(expiry90, 100_000, 10000, user.address, 0, 0);
  await daiPool
    .connect(user)
    .registerPoolId(expiry180, 100_000, 10000, user.address, 0, 0);
  await wethPool
    .connect(user)
    .registerPoolId(expiry90, 5_000, 10000, user.address, 0, 0);
  await wethPool
    .connect(user)
    .registerPoolId(expiry180, 5_000, 10000, user.address, 0, 0);

  await usdcTerm.connect(user).setApprovalForAll(usdcPool.address, true);
  await daiTerm.connect(user).setApprovalForAll(daiPool.address, true);
  await wethTerm.connect(user).setApprovalForAll(wethPool.address, true);

  // intialize each pool with liquidity
  await usdcPool
    .connect(user)
    .tradeBonds(expiry90, 50_000, 0, user.address, false);
  await usdcPool
    .connect(user)
    .tradeBonds(expiry180, 50_000, 0, user.address, false);
  await daiPool
    .connect(user)
    .tradeBonds(expiry90, 50_000, 0, user.address, false);
  await daiPool
    .connect(user)
    .tradeBonds(expiry180, 50_000, 0, user.address, false);
  await wethPool
    .connect(user)
    .tradeBonds(expiry90, 1_000, 0, user.address, false);
  await wethPool
    .connect(user)
    .tradeBonds(expiry180, 1_000, 0, user.address, false);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
