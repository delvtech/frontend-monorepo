import { ethers } from "hardhat";
import Logger from "utils/logger";

import {
  ForwarderFactory__factory,
  MockERC20__factory,
  ERC4626Term__factory,
  MockERC4626__factory,
} from "@elementfi/core-v2-typechain";

async function main() {
  const signers = await ethers.getSigners();

  const [signer] = signers;

  const forwarderFactoryFactory = new ForwarderFactory__factory(signer);
  const forwarderFactory = await forwarderFactoryFactory.deploy();
  await forwarderFactory.deployed();

  const erc20Factory = new MockERC20__factory(signer);
  const mockERC20 = await erc20Factory.deploy("CASH", "CASH", 18);
  await mockERC20.deployed();

  const vaultFactory = new MockERC4626__factory(signer);
  const yearnVault = await vaultFactory.deploy(mockERC20.address);
  await yearnVault.deployed();

  const termFactory = new ERC4626Term__factory(signer);
  // ERC20Forwarder contrat bytecode hash
  const linkHash = await forwarderFactory.ERC20LINK_HASH();
  const maxReserve = ethers.utils.parseEther("50000");
  const owner = signer.address;
  const term = await termFactory.deploy(
    yearnVault.address,
    linkHash,
    forwarderFactory.address,
    maxReserve,
    owner,
  );
  await term.deployed();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
