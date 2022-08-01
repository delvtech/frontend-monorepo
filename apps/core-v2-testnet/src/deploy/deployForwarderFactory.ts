import {
  ForwarderFactory__factory,
  ForwarderFactory,
} from "@elementfi/core-v2-typechain";
import { Signer } from "ethers";

export async function deployForwarderFactory(
  signer: Signer,
): Promise<ForwarderFactory> {
  const forwarderFactoryFactory = new ForwarderFactory__factory(signer);
  const forwarderFactory = await forwarderFactoryFactory.deploy();
  await forwarderFactory.deployed();

  return forwarderFactory;
}
