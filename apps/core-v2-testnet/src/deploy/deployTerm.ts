import {
  ERC4626Term,
  ERC4626Term__factory,
} from "@elementfi/core-v2-typechain";
import { Signer, BigNumberish } from "ethers";
import { ethers } from "hardhat";
import { throwInvalidAddressError } from "src/errors";

export async function deployTerm(
  signer: Signer,
  vaultAddress: string,
  linkHash: string,
  forwarderFactoryAddress: string,
  maxReserve: BigNumberish,
  owner: string,
): Promise<ERC4626Term> {
  if (!ethers.utils.isAddress(vaultAddress)) {
    throwInvalidAddressError(vaultAddress);
  }
  if (!ethers.utils.isAddress(forwarderFactoryAddress)) {
    throwInvalidAddressError(forwarderFactoryAddress);
  }

  const termFactory = new ERC4626Term__factory(signer);
  const term = await termFactory.deploy(
    vaultAddress,
    linkHash,
    forwarderFactoryAddress,
    maxReserve,
    owner,
  );
  await term.deployed();
  return term;
}
