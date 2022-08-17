import { CRVLUSD__factory } from "@elementfi/core-typechain/dist/libraries";
import { AddressesJson } from "addresses/addresses";
import { defaultProvider } from "elf/providers/providers";

/**
 * Curve stable pools provide a `get_virtual_price` method for getting the price.
 */
const {
  addresses: {
    "alusd3crv-fAddress": crvalusdAddress,
    "lusd3crv-fAddress": crvlusdAddress,
    "mim-3lp3crv-fAddress": crvMimAddress,
    eurscrvAddress,
  },
} = AddressesJson;

const crvalusdContract = CRVLUSD__factory.connect(
  // Note: the CRVLUSD_factory is the same, so it can handle both alusd and lusd pools.
  crvalusdAddress || "0x0000000000000000000000000000000000000000",
  defaultProvider,
);

const crvlusdContract = CRVLUSD__factory.connect(
  crvlusdAddress,
  defaultProvider,
);

const crvMimContract = CRVLUSD__factory.connect(
  // Note: the CRVLUSD_factory is the same, so it can handle both lusd and mim pools.
  crvMimAddress,
  defaultProvider,
);

const crvEursContract = CRVLUSD__factory.connect(
  // Note: the CRVLUSD_factory is the same, so it can handle both lusd and mim pools.
  // Note: this is the pool contract address, the eurscrvAddress is the token contract address.
  // This is inconsistent with the other stable pool addresses passed down from elf-deploy and
  // elf-tokenlist which all pass down the pool contract address.
  // TODO: fix the above inconsistency
  "0x0Ce6a5fF5217e38315f87032CF90686C96627CAA",
  defaultProvider,
);

export const curveVirtualPriceContractsByAddress = {
  [crvalusdAddress]: crvalusdContract,
  [crvlusdAddress]: crvlusdContract,
  [crvMimAddress]: crvMimContract,
  [eurscrvAddress]: crvEursContract,
};

export function isCurveStablePool(address: string): boolean {
  return [
    crvalusdAddress,
    crvlusdAddress,
    crvMimAddress,
    eurscrvAddress,
  ].includes(address);
}
