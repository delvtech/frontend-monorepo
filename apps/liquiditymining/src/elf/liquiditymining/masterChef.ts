import { defaultProvider } from "src/elf/providers/providers";
import { MCMod__factory } from "@elementfi/peripherals/typechain";

// TODO: Make a masterchef mainnet contract instance
export const MASTER_CHEF_GOERLI_ADDRESS =
  "0x97CBcFA11318c405F0b9804ce0c7574602c4F762";
export const masterChef = MCMod__factory.connect(
  MASTER_CHEF_GOERLI_ADDRESS,
  defaultProvider,
);
