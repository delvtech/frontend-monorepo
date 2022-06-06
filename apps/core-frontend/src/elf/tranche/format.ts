import { PrincipalTokenInfo } from "@elementfi/core-tokenlist";
import { YieldTokenInfo } from "@elementfi/core-tokenlist";
import warning from "warning";

import { formatYieldTokenShortSymbol } from "elf/interestToken/formatYieldTokenShortSymbol";
import { isYieldToken } from "elf/interestToken/interestToken";
import { isPrincipalToken } from "elf/tranche/tranches";

export function formatPrincipalTokenShortSymbol(
  principalToken: PrincipalTokenInfo,
): string {
  const { symbol } = principalToken;
  // symbols look like: ePyvCurveLUSD-12SEP21
  const splitSymbol = symbol.split("-");
  // remove the datestamp from the end
  splitSymbol.pop();

  return splitSymbol.join("-");
}

export function formatTermAssetShortSymbol(
  termTokenInfo: PrincipalTokenInfo | YieldTokenInfo,
): string {
  // note that the principal tokens are built into the same contract as the tranches

  if (isPrincipalToken(termTokenInfo)) {
    return formatPrincipalTokenShortSymbol(termTokenInfo);
  }

  if (isYieldToken(termTokenInfo)) {
    return formatYieldTokenShortSymbol(termTokenInfo);
  }

  // shouldn't happen
  warning(
    true,
    "tried to get the short symbol on a token that is not a principal or yield token.",
  );
  return "";
}
