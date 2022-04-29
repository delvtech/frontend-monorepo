import { InterestToken } from "@elementfi/core-typechain/dist/v1";
import { Web3Provider } from "@ethersproject/providers";
import { AbstractConnector } from "@web3-react/abstract-connector";
import tw from "efi-tailwindcss-classnames";
import { YieldTokenCard } from "ui/portfolio/YieldTokenCard/YieldTokenCard";
import { useTokensWithBalance } from "ui/token/hooks/useTokensWithBalance";
import { NoYieldTokensInWalletNonIdealState } from "ui/wallets/NoYieldTokensInWalletNonIdealState/NoYieldTokensInWalletNonIdealState";
import { ERC20Shim } from "elf/contracts/ERC20Shim";
import { interestTokenContracts } from "elf/interestToken/interestToken";
import React, { ReactElement } from "react";
import { t } from "ttag";

interface YieldTokenPortfolioProps {
  chainId: number | undefined;
  library: Web3Provider | undefined;
  connector: AbstractConnector | undefined;
  walletConnectionActive: boolean;
  account: string | null | undefined;
}

export function YieldTokenPortfolio({
  library,
  chainId,
  connector,
  walletConnectionActive,
  account,
}: YieldTokenPortfolioProps): ReactElement {
  const { yieldTokensWithBalance } = useYieldTokenTab(library, account);
  const hasInterestTokens = yieldTokensWithBalance?.length;

  let nonIdealStateContent = null;
  if (!account) {
    nonIdealStateContent = (
      <span>{t`Connect your wallet to view your portfolio`}</span>
    );
  } else if (!hasInterestTokens) {
    nonIdealStateContent = <NoYieldTokensInWalletNonIdealState />;
  }

  return (
    <div
      className={tw(
        "flex",
        "flex-1",
        "flex-wrap",
        "justify-center",
        "items-center",
      )}
    >
      {nonIdealStateContent ? (
        <div className={tw("flex", "flex-1", "justify-center", "items-center")}>
          {nonIdealStateContent}
        </div>
      ) : (
        yieldTokensWithBalance.map((interestToken) => [
          <YieldTokenCard
            chainId={chainId}
            library={library}
            connector={connector}
            walletConnectionActive={walletConnectionActive}
            key={interestToken.address}
            account={account}
            yieldToken={interestToken}
          />,
        ])
      )}
    </div>
  );
}

function useYieldTokenTab(
  library: Web3Provider | undefined,
  account: string | null | undefined,
) {
  const yieldTokensWithBalanceResults = useTokensWithBalance(
    account,
    interestTokenContracts as unknown as ERC20Shim[],
  );

  const yieldTokensWithBalance = yieldTokensWithBalanceResults.map(
    ({ token }) => token as unknown as InterestToken,
  );

  return {
    yieldTokensWithBalance,
  };
}
