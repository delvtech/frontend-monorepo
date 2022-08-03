import { BigNumber } from "ethers";
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

async function main() {
  // get signers
  const signers = await ethers.getSigners();
  const [signer] = signers;

  // Deploy ForwarderFactory
  const forwarderFactory = await deployForwarderFactory(signer);

  // Deploy Mock Tokens
  const usdcToken = await deployMockToken(signer, "USDC", "USDC", 6);

  // ERC20Forwarder contract bytecode hash
  const linkHash = await forwarderFactory.ERC20LINK_HASH();

  // deploy mock yearn vaults
  // todo see how many decimals is usdc token

  // Deploy mock vault
  const mockYearnVault = await deployMockYearnVault(signer, usdcToken.address);

  const governanceAddress = ethers.constants.AddressZero;
  // Deploy mock yield adapter i.e. term contract
  const mockYieldAdapter = await deployMockYieldAdapter(
    signer,
    mockYearnVault.address,
    governanceAddress,
    linkHash,
    forwarderFactory.address,
    usdcToken.address,
  );

  // give tokens to signer
  usdcToken.connect(signer).mint(signer.address, 7e6);
  // set allowance for yield adapter
  usdcToken.approve(mockYieldAdapter.address, 12e6);

  // Create new usdc term expiring in 30 days
  const currentTimestamp = await getCurrentBlockTimestamp(ethers.provider);
  // if start is in the future, the term will start on the current block timestamp
  // needed a buffer here b/c just currentTimestamp ends up being before in the next block
  const start = BigNumber.from(currentTimestamp + ONE_MINUTE_IN_SECONDS);
  const expiry = BigNumber.from(currentTimestamp + ONE_DAY_IN_SECONDS * 30);

  await createTerm(
    signer,
    mockYieldAdapter,
    start,
    expiry,
    signer.address,
    BigNumber.from(1e4),
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
