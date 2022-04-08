import { YieldTokenInfo } from "@elementfi/tokenlist";

export function formatYieldTokenShortSymbol(
  yieldToken: YieldTokenInfo,
): string {
  const { symbol } = yieldToken;
  // symbols look like: `eYyvCurveLUSD-12SEP21
  const splitSymbol = symbol.split("-");
  // remove the datestamp from the end
  splitSymbol.pop();

  return splitSymbol.join("-");
}
