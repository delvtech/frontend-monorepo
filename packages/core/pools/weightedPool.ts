import {
  WeightedPool,
  WeightedPool__factory,
} from "@elementfi/core-typechain/dist/v1";
import {
  TokenInfo,
  TokenTag,
  YieldPoolTokenInfo,
} from "@elementfi/core-tokenlist";
// TODO: stuff under packages/ should not have a default provider
import { defaultProvider } from "@elementfi/core/providers/providers";
import { tokenListJson } from "@elementfi/core/tokenlists/tokenlists";
import keyBy from "lodash.keyby";

// hard limit set by Balancer.  Cannot trade in/out more than 30% of the pool
export const MAX_WEIGHTED_POOL_PRICE_IMPACT = 0.3;

export enum WeightedPoolExitKind {
  EXACT_BPT_IN_FOR_ONE_TOKEN_OUT,
  EXACT_BPT_IN_FOR_TOKENS_OUT,
  BPT_IN_FOR_EXACT_TOKENS_OUT,
}

export const yieldPools: YieldPoolTokenInfo[] = tokenListJson.tokens.filter(
  (tokenInfo): tokenInfo is YieldPoolTokenInfo => isYieldPool(tokenInfo),
);

export const yieldPoolContracts = yieldPools.map(({ address }) =>
  WeightedPool__factory.connect(address, defaultProvider),
);

export const yieldPoolContractsByAddress = keyBy(
  yieldPoolContracts,
  (yieldPool) => yieldPool.address,
);

export function getPoolForYieldToken(
  yieldTokenAddress: string,
): WeightedPool | undefined {
  const yieldPool = yieldPools.find(
    ({ extensions: { interestToken } }) => interestToken === yieldTokenAddress,
  );

  // V1.1+ terms and don't have yield pools
  if (!yieldPool) {
    return undefined;
  }

  // V1 terms have yield pools
  return yieldPoolContractsByAddress[yieldPool.address];
}

export function getPoolInfoForYieldToken(
  yieldTokenAddress: string,
): YieldPoolTokenInfo | undefined {
  const yieldPoolInfo = yieldPools.find(
    ({ extensions: { interestToken } }) => interestToken === yieldTokenAddress,
  );

  // V1.1+ terms and don't have yield pools
  if (!yieldPoolInfo) {
    return undefined;
  }

  // V1 terms have yield pools
  return yieldPoolInfo;
}

export function isYieldPool(
  tokenInfo: TokenInfo,
): tokenInfo is YieldPoolTokenInfo {
  return !!tokenInfo.tags?.includes(TokenTag.WPOOL);
}
