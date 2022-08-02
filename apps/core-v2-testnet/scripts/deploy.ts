import { ethers } from "hardhat";
import { ERC4626Term__factory } from "@elementfi/core-v2-typechain";
import {
  deployForwarderFactory,
  deployMockToken,
  deployTerm,
  deployVault,
} from "src/deploy";

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
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
