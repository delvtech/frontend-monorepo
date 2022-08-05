import {
  ERC4626Term,
  ERC4626Term__factory,
} from "@elementfi/core-v2-typechain";
import { Signer, BigNumberish } from "ethers";
import { validateAddresses } from "@elementfi/base";

export async function deploy4626Term(
  signer: Signer,
  vaultAddress: string,
  linkHash: string,
  forwarderFactoryAddress: string,
  maxReserve: BigNumberish,
  owner: string,
): Promise<ERC4626Term> {
  validateAddresses([vaultAddress, forwarderFactoryAddress]);

  const termFactory = new ERC4626Term__factory(signer);
  const term = await termFactory.deploy(
    vaultAddress,
    linkHash,
    forwarderFactoryAddress,
    maxReserve,
    owner,
  );
  return await term.deployed();
}
