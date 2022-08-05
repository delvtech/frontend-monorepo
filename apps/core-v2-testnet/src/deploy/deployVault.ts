import {
  MockERC4626,
  MockERC4626__factory,
} from "@elementfi/core-v2-typechain";
import { Signer } from "ethers";
import { validateAddresses } from "@elementfi/base";

export async function deployVault(
  signer: Signer,
  tokenAddress: string,
): Promise<MockERC4626> {
  validateAddresses([tokenAddress]);

  const vaultFactory = new MockERC4626__factory(signer);
  const vault = await vaultFactory.deploy(tokenAddress);
  return await vault.deployed();
}
