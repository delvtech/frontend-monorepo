import { TrancheFactory__factory } from "@elementfi/core-typechain/dist/v1";
import { AddressesJson } from "addresses/addresses";
import { defaultProvider } from "elf/providers/providers";

export const trancheFactoryContract = TrancheFactory__factory.connect(
  AddressesJson.addresses.trancheFactoryAddress,
  defaultProvider,
);
