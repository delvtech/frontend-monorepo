import { ERC20 } from "@elementfi/core-typechain/dist/libraries";

/**
 * Tranche contracts are not quite ERC20s in that they do not have a
 * `totalSupply` property. This becomes a problem in dynamic contexts where
 * tranches and their base assets aren't disambiguated.
 */
export type ERC20Shim = ERC20 | undefined;
