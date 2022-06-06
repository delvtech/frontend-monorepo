import { ERC20 } from "@elementfi/core-typechain/dist/libraries";
import { useCurrencyPref } from "ui/prefs/useCurrency/useCurencyPref";
import { fetchTokenPrice } from "elf/token/fetchTokenPrice";
import { fetchTotalValueLockedForTerm } from "elf/tranche/fetchTotalValueLockedForTerm";
import { principalTokenInfos } from "elf/tranche/tranches";
import { underlyingContractsByAddress } from "elf/underlying/underlying";
import { useQuery } from "react-query";
import { Money } from "ts-money";

export function useTotalValueLockedForPlatform(): Money {
  const { currency } = useCurrencyPref();

  const { data: results = [] } = useQuery({
    queryFn: async () => {
      const results = await Promise.all(
        principalTokenInfos.map(async (tokenInfo) => {
          const baseAssetContract =
            underlyingContractsByAddress[tokenInfo.extensions.underlying];
          const baseAssetPrice = await fetchTokenPrice(
            baseAssetContract as ERC20,
            currency,
          );
          return fetchTotalValueLockedForTerm(tokenInfo, baseAssetPrice);
        }),
      );
      return results;
    },
  });

  let totalValueLocked = Money.fromDecimal(0, currency);
  results.forEach(
    (result) => (totalValueLocked = totalValueLocked.add(result)),
  );

  return totalValueLocked;
}
