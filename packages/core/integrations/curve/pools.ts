import {
  CurveContract__factory,
  CurveStethPool__factory,
} from "@elementfi/core-typechain/dist/libraries";
// TODO: stuff under packages/ should not have a default provider
import { defaultProvider } from "@elementfi/core/providers/providers";

/*
 * Curve pools that aren't strictly stablecoins are architected such that the LP
 * token (like what is used for minting in Element) is separate from the pool
 * contract that deals with trading and pricing.
 *
 * To price one of these assets, use the `withdraw_one_coin` method to price one
 * of the assets in the pool against an external price sensor, ie: coingecko.
 *
 * NOTE: You can find the pool addresses on curve's website at the bottom of a
 * pool page.
 */
const CRVTriCrytoPoolAddress = "0x80466c64868e1ab14a1ddf27a676c3fcbe638fe5";
export const crvTriCryptoPoolContract = CurveContract__factory.connect(
  CRVTriCrytoPoolAddress,
  defaultProvider,
);

const CRV3CrytoPoolAddress = "0xD51a44d3FaE010294C616388b506AcdA1bfAAE46";
export const crv3CryptoPoolContract = CurveContract__factory.connect(
  CRV3CrytoPoolAddress,
  defaultProvider,
);

const steCRVPoolAddress = "0xDC24316b9AE028F1497c275EB9192a3Ea0f67022";
export const steCrvPoolContract = CurveStethPool__factory.connect(
  steCRVPoolAddress,
  defaultProvider,
);
