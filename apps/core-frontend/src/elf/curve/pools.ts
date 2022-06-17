import {
  CurveContract__factory,
  CurveStethPool__factory,
} from "@elementfi/core-typechain/dist/libraries";
import { CurvePool1 } from "@elementfi/core-typechain/dist/libraries/CurvePool1";
import { CurvePool2 } from "@elementfi/core-typechain/dist/libraries/CurvePool2";
import { CurvePool3 } from "@elementfi/core-typechain/dist/libraries/CurvePool3";
import { CurvePool1__factory } from "@elementfi/core-typechain/dist/libraries/factories/CurvePool1__factory";
import { CurvePool2__factory } from "@elementfi/core-typechain/dist/libraries/factories/CurvePool2__factory";
import { CurvePool3__factory } from "@elementfi/core-typechain/dist/libraries/factories/CurvePool3__factory";
import { CurveLpTokenInfo } from "@elementfi/core-tokenlist";
import { defaultProvider } from "elf/providers/providers";

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

export type CurvePool = CurvePool1 | CurvePool2 | CurvePool3;

/**
 * The CurvePool type is an attempt to generalise across curve pool behaviour.
 * Unfortunately there is a variance in contract implementation for many of the
 * curve pools and so the getCurvePoolContract function is intended to abstract
 * across the necessary pool implementations.
 *
 * We only need two functions on any given curve pool contract for estimating
 * interactions on that pool
 *
 * - calc_token_amount        :: Amount of LP tokens for curve pool tokens
 * - calc_withdraw_one_coin   :: Amount of curve pool tokens for LP tokens
 *
 * The CurvePool type is a union across CurvePool1, CurvePool2 and CurvePool3.
 * The numbers of each have no significance and are only representative of the
 * variation in signature implementation of calc_token_amount and
 * calc_withdraw_one_coin. Here are the variations:
 *
 * CurvePool1:
 *  - calc_token_amount(uint256[2],bool)
 *  - calc_withdraw_one_coin(uint256,int128)
 *
 * CurvePool2:
 *  - calc_token_amount(uint256[3],bool)
 *  - calc_withdraw_one_coin(uint256,int128)
 *
 * CurvePool3:
 *  - calc_token_amount(uint256[3],bool)
 *  - calc_withdraw_one_coin(uint256,uint256)
 *
 * The getCurvePoolContract primarily will return a CurvePool1 or CurvePool2
 * instance dependent on the size of the curve pool the input curveLpToken
 * corresponds to. There are only two variations of length of poolAssets defined
 * in the curveLpToken extension, 2 and 3.
 *
 * The other cases, the crv3Crypto and crvTriCrypto are explictly defined as the
 * curve pool address in their respective "pool" extension targets custom zap
 * contracts for using ETH over WETH. This is an important factor for the
 * zapSwapCurve contract and so for the case of the "calc" functions we wish to
 * call, we must target the original curve pool addresses which are statically
 * defined above
 *
 * Also to note, as we are generalising across the CurvePool types, type
 * conflicts will emerge on the calc_token_amount function as the array
 * parameter will conflict. A suggestion is to type assert as never but to
 * reference this comment why this is the case
 *
 * @param curveLpToken
 * @returns CurvePool
 * */
export function getCurvePoolContract(
  curveLpToken: CurveLpTokenInfo,
): CurvePool {
  const isCrv3Crypto = curveLpToken.symbol === "crv3crypto";
  const isCrvTriCrypto = curveLpToken.symbol === "crvTricrypto";

  if (isCrv3Crypto)
    {return CurvePool3__factory.connect(CRV3CrytoPoolAddress, defaultProvider);}

  if (isCrvTriCrypto)
    {return CurvePool3__factory.connect(CRVTriCrytoPoolAddress, defaultProvider);}

  return curveLpToken.extensions.poolAssets.length === 2
    ? CurvePool1__factory.connect(curveLpToken.extensions.pool, defaultProvider)
    : CurvePool2__factory.connect(
        curveLpToken.extensions.pool,
        defaultProvider,
      );
}
