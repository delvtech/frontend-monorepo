import {
  MockYieldAdapter,
  MockYieldAdapter__factory,
} from "@elementfi/core-v2-typechain";
import { Signer } from "ethers";
import { validateAddresses } from "@elementfi/base";

export async function deployMockYieldAdapter(
  signer: Signer,
  vaultAddress: string,
  governanceAddress: string,
  linkHash: string,
  forwarderFactoryAddress: string,
  tokenAddress: string,
): Promise<MockYieldAdapter> {
  validateAddresses([
    vaultAddress,
    governanceAddress,
    forwarderFactoryAddress,
    tokenAddress,
  ]);

  const yieldAdapterFactory = new MockYieldAdapter__factory(signer);
  const yieldAdapter = await yieldAdapterFactory.deploy(
    vaultAddress,
    governanceAddress,
    linkHash,
    forwarderFactoryAddress,
    tokenAddress,
  );
  return await yieldAdapter.deployed();
}
