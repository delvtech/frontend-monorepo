import {
  MockERC20YearnVault,
  MockERC20YearnVault__factory,
} from "@elementfi/core-v2-typechain";
import { Signer } from "ethers";
import { validateAddresses } from "src/utils";

// Deploys a mock yearn vault
// The vault is based off of ERC-20, no ERC-4626
// A ERC-4626 adaptor should be created to wrap the vault
export async function deployMockYearnVault(
  signer: Signer,
  tokenAddress: string,
): Promise<MockERC20YearnVault> {
  validateAddresses([tokenAddress]);

  const vaultFactory = new MockERC20YearnVault__factory(signer);
  const vault = await vaultFactory.deploy(tokenAddress);
  return await vault.deployed();
}
