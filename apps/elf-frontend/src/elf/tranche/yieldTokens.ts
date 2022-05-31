import { PrincipalTokenInfo, YieldTokenInfo } from "@elementfi/core-tokenlist";
import { getTokenInfo } from "tokenlists/tokenlists";

export function getPrincipalTokenForYieldToken(
  interestTokenAddress: string,
): PrincipalTokenInfo {
  const {
    extensions: { tranche },
  } = getTokenInfo<YieldTokenInfo>(interestTokenAddress);

  return getTokenInfo<PrincipalTokenInfo>(tranche);
}
