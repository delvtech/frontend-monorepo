import { PrincipalTokenInfo, TokenInfo } from "@elementfi/core-tokenlist";
import { getCurvePoolTokensForPrincipalToken } from "elf/curve/tokens";
import { getTokenInfo } from "tokenlists/tokenlists";

export function getFixedRateInputTokens(
  principalTokenInfo: PrincipalTokenInfo,
): TokenInfo[] {
  const underlyingTokenInfo = getTokenInfo(
    principalTokenInfo.extensions.underlying,
  );
  const curvePoolTokenInfos =
    getCurvePoolTokensForPrincipalToken(principalTokenInfo);

  return [underlyingTokenInfo, ...curvePoolTokenInfos];
}
