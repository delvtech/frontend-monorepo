import { useQuery, UseQueryResult } from "react-query";

import {
  fetchYearnVaults,
  YearnVaultResult,
} from "integrations/yearn/fetchYearnVaults";

// TODO: use address when we go live on mainnet
export function useYearnVault(
  vaultSymbol: string | undefined,
  vaultAddress: string | undefined,
): UseQueryResult<YearnVaultResult> {
  return useQuery<YearnVaultResult>({
    queryKey: makeYearnAPYQueryKey(vaultAddress, vaultSymbol),
    queryFn: async () => {
      const result = await fetchYearnVaults();

      // try to match on the address exactly
      const addressResult = result.find(
        (result) => result.address === vaultAddress,
      ) as YearnVaultResult;

      // if we don't get a match on the exact address we're probably on goerli
      // so we should compare by symbol instead
      const possibleMatches = result.filter((result) => {
        return result.symbol === vaultSymbol && result.endorsed;
      }); // there will be many versions of vaults for some assets like USDC

      const symbolResult = possibleMatches[
        possibleMatches.length - 1 // the last element is the latest version
      ] as YearnVaultResult;

      return addressResult || symbolResult;
    },
    enabled: !!vaultSymbol,
  });
}

interface YearnAPYVariables {
  vaultSymbol: string | undefined;
  vaultAddress: string | undefined;
}

function makeYearnAPYQueryKey(
  vaultAddress: string | undefined,
  vaultSymbol: string | undefined,
): [string[], YearnAPYVariables] {
  return [["yearn", "/vaults/all"], { vaultSymbol, vaultAddress }];
}
