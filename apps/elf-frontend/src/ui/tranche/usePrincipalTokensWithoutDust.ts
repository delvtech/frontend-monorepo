import { ERC20 } from "@elementfi/core-typechain/dist/libraries";
import { PrincipalTokenInfo } from "@elementfi/tokenlist";
import { useTokensWithBalance } from "ui/token/hooks/useTokensWithBalance";
import { isDust } from "elf/coins/isDust";
import { getTokenInfo } from "tokenlists/tokenlists";
import { trancheContracts } from "elf/tranche/tranches";
import { BigNumber } from "ethers";
import zip from "lodash.zip";

/**
 * Returns the list of principal token infos that have a non-dust balance for
 * the given account.
 */
export function usePrincipalTokensWithoutDust(
  account: string | null | undefined,
): PrincipalTokenInfo[] {
  const principalTokensWithBalanceResults = useTokensWithBalance(
    account,
    // Note: we're checking all tranche contracts in the system for a balance
    trancheContracts as unknown as ERC20[],
  );

  const principalTokenInfosWithBalance = principalTokensWithBalanceResults.map(
    ({ token }) => getTokenInfo<PrincipalTokenInfo>(token.address),
  );

  // filter out dust, because redeeming a PT can leave a small amount of dust in
  // the user's account
  const principalTokensWithoutDust = zip(
    principalTokensWithBalanceResults,
    principalTokenInfosWithBalance,
  )
    .filter(
      (
        zipped,
      ): zipped is [
        { token: ERC20; balanceOf: BigNumber },
        PrincipalTokenInfo,
      ] => zipped.every((v) => !!v),
    )
    .filter(
      ([{ balanceOf }, principalTokenInfo]) =>
        !isDust(balanceOf, principalTokenInfo.decimals),
    )
    .map(([, principalTokenInfo]) => principalTokenInfo);

  return principalTokensWithoutDust;
}
