import {
  MockERC4626,
  MockERC4626__factory,
} from "@elementfi/core-v2-typechain";
import { Signer } from "ethers";
import { ethers } from "hardhat";
import { throwInvalidAddressError } from "src/errors";

export async function deployVault(
  signer: Signer,
  tokenAddress: string,
): Promise<MockERC4626> {
  if (!ethers.utils.isAddress(tokenAddress)) {
    throwInvalidAddressError(tokenAddress);
  }

  const vaultFactory = new MockERC4626__factory(signer);
  const vault = await vaultFactory.deploy(tokenAddress);
  await vault.deployed();
  return vault;
}
