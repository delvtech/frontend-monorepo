import {
  CurveLpTokenInfo,
  PrincipalTokenInfo,
  TokenInfo,
  TokenTag,
} from "@elementfi/core-tokenlist";
import { getTokenInfo } from "tokenlists/tokenlists";
export type CurvePoolTokenInfo = TokenInfo & {
  readonly CurvePoolToken: unique symbol;
};

export function isCurveLpToken(
  tokenInfo: TokenInfo,
): tokenInfo is CurveLpTokenInfo {
  return !!tokenInfo?.tags?.includes(TokenTag.CURVE);
}

export function getCurvePoolTokensByCurveLpToken(
  tokenInfo: CurveLpTokenInfo,
): TokenInfo[] {
  return tokenInfo.extensions.poolAssets.map(getTokenInfo);
}

/**
 *
 * Returns the constituent tokenInfos of the tokens which are members of curve
 * pools related to the underlying principal token address.
 *
 * Visually the hierarchy of principalToken - curvePoolToken relationship
 * follows three general cases:
 *
 *
 *
 * 1) CurveLpTokenA :: STECRV
 *      - CurvePoolTokenA :: ETH
 *      - CurvePoolTokenB :: STETH
 *
 * 2) CurveLpTokenA :: CRVTRICRYPTO
 *      - CurvePoolTokenA :: USDT
 *      - CurvePoolTokenB :: WBTC
 *      - CurvePoolTokenC :: ETH
 *
 * 3) CurveLpTokenA :: MIM-3LP
 *      - CurvePoolTokenA :: MIM
 *      - CurveLpTokenB   :: 3CRV
 *          - CurvePoolTokenB :: DAI
 *          - CurvePoolTokenC :: USDC
 *          - CurvePoolTokenD :: USDT
 *
 * @param principalTokenInfo - The principal token
 * @returns array of tokenInfos
 * */
export function getCurvePoolTokensForPrincipalToken(
  principalTokenInfo: PrincipalTokenInfo,
): TokenInfo[] {
  const underlyingTokenInfo = getTokenInfo(
    principalTokenInfo.extensions.underlying,
  );

  if (!isCurveLpToken(underlyingTokenInfo)) {return [];}

  const baseCurvePoolTokens =
    getCurvePoolTokensByCurveLpToken(underlyingTokenInfo);

  const metaCurvePoolTokens = baseCurvePoolTokens
    .filter(isCurveLpToken)
    .map(getCurvePoolTokensByCurveLpToken)
    .flat();

  return [...baseCurvePoolTokens, ...metaCurvePoolTokens];
}
