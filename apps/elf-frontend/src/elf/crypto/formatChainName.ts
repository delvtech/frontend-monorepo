import { t } from "ttag";

import { ChainId, ChainNames } from "base/ethereum/ethereum";

export function formatChainName(
  active: boolean,
  chainId: ChainId | undefined,
): string {
  if (!active) {
    return t`Not connected`;
  }

  const chainName = chainId ? ChainNames[chainId as ChainId] : t`Unknown`;

  return chainName;
}
