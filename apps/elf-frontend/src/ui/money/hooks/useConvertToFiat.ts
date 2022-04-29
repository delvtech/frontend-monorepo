import { useMemo } from "react";

import { BigNumber } from "ethers";
import { Money } from "ts-money";

import { convertToFiatBalance } from "elf/money/convertToFiatBalance";

/**
 * Converts a cryptocurrency balance to the user's preferred fiat balance.
 */

export function useConvertToFiat(
  fiatPrice: Money | undefined,
  balance: BigNumber | undefined,
  decimals: number | undefined,
): Money | undefined {
  return useMemo(() => {
    if (!fiatPrice || !balance || !decimals) {
      return;
    }

    return convertToFiatBalance(fiatPrice, balance, decimals);
  }, [balance, decimals, fiatPrice]);
}
