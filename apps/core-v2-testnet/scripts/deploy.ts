import { BigNumber } from "ethers";
import { ethers } from "hardhat";
import {
  deployForwarderFactory,
  deployMockToken,
  deployTerm,
  deployVault,
} from "src/deploy";
import { deployMockYearnVault } from "src/deploy/deployMockYearnVault";
import { deployMockYieldAdapter } from "src/deploy/deployMockYieldAdapter";
import { createTerm } from "src/helpers/createTerm";
import { getCurrentBlockTimestamp } from "src/utils";
import { ONE_DAY, ONE_MINUTE } from "src/utils/time";

async function main() {
  const signers = await ethers.getSigners();

  const [signer] = signers;

  const forwarderFactory = await deployForwarderFactory(signer);
  const mockERC20 = await deployMockToken(signer, "FakeToken", "FAKE", 18);
  const vault = await deployVault(signer, mockERC20.address);

  // ERC20Forwarder contrat bytecode hash
  const linkHash = await forwarderFactory.ERC20LINK_HASH();
  const maxReserve = ethers.utils.parseEther("50000");
  await deployTerm(
    signer,
    vault.address,
    linkHash,
    forwarderFactory.address,
    maxReserve,
    signer.address,
  );

  // deploy mock yearn vaults
  // todo see how many decimals is usdc token
  const usdcToken = await deployMockToken(signer, "USDC", "USDC", 18);
  console.log("token");
  const mockYearnVault = await deployMockYearnVault(signer, usdcToken.address);
  console.log("vault");

  const governanceAddress = ethers.constants.AddressZero;

  // deploy mock yield adapter i.e. term
  const mockYieldAdapter = await deployMockYieldAdapter(
    signer,
    mockYearnVault.address,
    governanceAddress,
    linkHash,
    forwarderFactory.address,
    usdcToken.address,
  );
  console.log("yield adapter");

  // give token to signer
  usdcToken.connect(signer).mint(signer.address, 7e6);
  // set allowance for yield adapter
  usdcToken.approve(mockYieldAdapter.address, 12e6);
  // create new term with underlying tokens
  const currentTimestamp = await getCurrentBlockTimestamp(ethers.provider);
  const start = BigNumber.from(currentTimestamp + ONE_MINUTE);
  const expiry = BigNumber.from(currentTimestamp + ONE_DAY * 30);

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
