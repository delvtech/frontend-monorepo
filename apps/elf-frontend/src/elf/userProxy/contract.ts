import { UserProxy__factory } from "@elementfi/core-typechain/dist/v1";
import { AddressesJson } from "addresses/addresses";
import { defaultProvider } from "elf/providers/providers";

export const userProxyContract = UserProxy__factory.connect(
  AddressesJson.addresses.userProxyContractAddress,
  defaultProvider,
);
