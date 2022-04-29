import { ConvergentCurvePool__factory as ConvergentCurvePool__factoryV1_1 } from "@elementfi/core-typechain/dist/v1.1";
import {
  ConvergentCurvePool,
  ConvergentCurvePool__factory as ConvergentCurvePool__factoryV1,
} from "@elementfi/core-typechain/dist/v1";
import {
  PrincipalPoolTokenInfo,
  TokenInfo,
  TokenTag,
} from "@elementfi/tokenlist";
import { defaultProvider } from "elf/providers/providers";
import { tokenListJson } from "tokenlists/tokenlists";
import keyBy from "lodash.keyby";
import { AddressesJson } from "addresses/addresses";

/**
 * The list of all principal token pools. This includes pools with mature
 * principal tokens.
 */
export const principalPools: PrincipalPoolTokenInfo[] =
  tokenListJson.tokens.filter(
    (tokenInfo): tokenInfo is PrincipalPoolTokenInfo =>
      isPrincipalPool(tokenInfo),
  );

export const principalPoolContracts = principalPools.map(
  ({ address, extensions: { convergentPoolFactory } }) => {
    if (
      convergentPoolFactory ===
      AddressesJson.addresses.convergentPoolFactoryAddress.v1
    ) {
      return ConvergentCurvePool__factoryV1.connect(address, defaultProvider);
    }
    return ConvergentCurvePool__factoryV1_1.connect(address, defaultProvider);
  },
);

export const principalPoolContractsByAddress = keyBy(
  principalPoolContracts,
  (poolContract) => poolContract.address,
);

export function isPrincipalPool(
  tokenInfo: TokenInfo,
): tokenInfo is PrincipalPoolTokenInfo {
  return !!tokenInfo.tags?.includes(TokenTag.CCPOOL);
}
export function getPoolInfoForPrincipalToken(
  principalTokenAddress: string,
): PrincipalPoolTokenInfo {
  return principalPools.find(
    ({ extensions: { bond } }) => bond === principalTokenAddress,
  ) as PrincipalPoolTokenInfo;
}

export function getPrincipalPoolContractForTranche(
  trancheAddress: string,
): ConvergentCurvePool {
  const pool = getPoolInfoForPrincipalToken(trancheAddress);
  const poolContract = principalPoolContractsByAddress[pool.address];
  return poolContract;
}
