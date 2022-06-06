import { ERC20 } from "@elementfi/core-typechain/dist/libraries";
import { getQueriesData } from "ui/base/queryResults";
import { getQueryCombinedStatus } from "ui/query/getQueryCombinedStatus";
import { useTokenBalanceOfMulti } from "ui/token/hooks/useTokenBalanceOf";
import { EMPTY_ARRAY } from "base/emptyArray";
import { BigNumber } from "ethers";
import zip from "lodash.zip";

interface TokenWithBalance<TContract> {
  token: TContract;
  balanceOf: BigNumber;
}

export function useTokensWithBalance<TContract extends ERC20>(
  account: string | null | undefined,
  tokens: (TContract | undefined)[],
): TokenWithBalance<TContract>[] {
  const tokenBalanceOfResults = useTokenBalanceOfMulti(tokens, account);
  const status = getQueryCombinedStatus(tokenBalanceOfResults);

  const loadedData = zip(tokens, getQueriesData(tokenBalanceOfResults)).filter(
    (values): values is [TContract, BigNumber] =>
      values.every((value) => !!value),
  );

  if (status === "loading") {
    return EMPTY_ARRAY as { token: TContract; balanceOf: BigNumber }[];
  }

  const tokensWithBalance = loadedData
    .filter(([, balanceOf]) => balanceOf.gt(0))
    .map(([token, balanceOf]) => ({ token, balanceOf }));

  return tokensWithBalance as TokenWithBalance<TContract>[];
}
