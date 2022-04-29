import { AddressesJson } from "addresses/addresses";
import { defaultProvider } from "elf/providers/providers";
import { Vault__factory } from "@elementfi/core-typechain/dist/v1";

export const balancerVaultContract = Vault__factory.connect(
  AddressesJson.addresses.balancerVaultAddress,
  defaultProvider,
);
