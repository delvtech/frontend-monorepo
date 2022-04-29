import { InterestToken__factory } from "@elementfi/core-typechain/dist/v1";
import { TokenInfo, TokenTag, YieldTokenInfo } from "@elementfi/tokenlist";
import { defaultProvider } from "elf/providers/providers";
import { tokenListJson } from "tokenlists/tokenlists";
import keyBy from "lodash.keyby";

/**
 * The list of all yield tokens
 */
export const yieldTokenInfos: YieldTokenInfo[] = tokenListJson.tokens.filter(
  (tokenInfo): tokenInfo is YieldTokenInfo => isYieldToken(tokenInfo),
);
export const interestTokenContracts = yieldTokenInfos.map(({ address }) =>
  InterestToken__factory.connect(address, defaultProvider),
);
export const interestTokenContractsByAddress = keyBy(
  interestTokenContracts,
  (interestToken) => interestToken.address,
);

export function isYieldToken(
  tokenInfo: TokenInfo,
): tokenInfo is YieldTokenInfo {
  return !!tokenInfo?.tags?.includes(TokenTag.YIELD);
}
