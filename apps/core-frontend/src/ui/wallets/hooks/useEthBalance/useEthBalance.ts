import { QueryObserverResult, useQuery } from "react-query";

import { Web3Provider } from "@ethersproject/providers";
import { BigNumber } from "ethers";

import { fetchEthBalance } from "elf/coins/ether/fetchEthBalance";

export const ETH_BALANCE_QUERY_KEY = ["ethereum", "balanceOf"];

export function useEthBalance(
  library: Web3Provider | undefined,
  account: string | null | undefined,
): QueryObserverResult<BigNumber | undefined> {
  const etherBalanceResult = useQuery({
    queryKey: ETH_BALANCE_QUERY_KEY,
    queryFn: () => {
      return fetchEthBalance(library as Web3Provider, account as string);
    },
    enabled: !!library && !!account,
  });

  return etherBalanceResult;
}
