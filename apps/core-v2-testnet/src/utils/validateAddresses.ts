import { ethers } from "hardhat";
import { throwInvalidAddressError } from "src/errors";

export function validateAddresses(addresses: string[]): void | never {
  addresses.forEach((address) => {
    const isAddress = ethers.utils.isAddress(address);
    if (!isAddress) {
      throwInvalidAddressError(address);
    }
  });
}
