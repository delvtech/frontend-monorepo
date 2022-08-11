import React, { ReactElement } from "react";

import { Provider } from "@ethersproject/providers";
import { Signer } from "ethers";
import { t } from "ttag";

import { getEtherscanAddress } from "src/integrations/etherscan";
import { MerkleRewardType, useMerkleInfo } from "src/ui/merkle/useMerkleInfo";
import { useUnclaimedAirdrop } from "src/ui/airdrop/useUnclaimedAirdrop";
import { BalanceWithLabel } from "src/ui/base/BalanceWithLabel/BalanceWithLabel";
import LinkButton from "src/ui/base/Button/LinkButton";
import { ButtonVariant } from "src/ui/base/Button/styles";
import Card, { CardVariant } from "src/ui/base/Card/Card";
import ExternalLink from "src/ui/base/ExternalLink/ExternalLink";
import { useFormattedWalletAddress } from "src/ui/ethereum/useFormattedWalletAddress";
import { JoinGSCButton, LeaveGSCButton } from "src/ui/gsc/GSCButtons";
import { TooltipDefinition } from "src/ui/voting/tooltipDefinitions";
import { useGSCStatus, EligibilityState } from "src/ui/gsc/useGSCStatus";
import { ThresholdProgressBar } from "src/ui/gsc/ThresholdProgressBar";
import { useGetPortfolioCardDataQuery } from "src/graphql/generated";
import { addressesJson } from "src/addresses";

interface PortfolioCardProps {
  account: string | undefined | null;
  provider?: Provider;
  signer: Signer | null | undefined;
}

export function PortfolioCard(props: PortfolioCardProps): ReactElement {
  const { account, provider, signer } = props;
  const { data } = useGetPortfolioCardDataQuery({
    variables: {
      account: account as string,
      coreVotingAddress: addressesJson.addresses.coreVoting,
    },
    skip: !account,
  });

  const balance = data?.votingContract?.balance;
  const votingPower = data?.votingContract?.votingPower?.value;
  const formattedAddress = useFormattedWalletAddress(account, provider);

  const { data: merkleInfo } = useMerkleInfo(account, MerkleRewardType.RETRO);
  const unclaimedAirdrop = useUnclaimedAirdrop(account, merkleInfo);

  const { status } = useGSCStatus(account);
  const canJoinGSC = status === EligibilityState.Eligible;
  const canLeaveGSC = status === EligibilityState.Expiring;

  return (
    <Card
      variant={CardVariant.GRADIENT}
      className="w-full shadow-md xl:max-w-[512px]"
    >
      <div>
        <span className="text-xl font-bold tracking-widest text-white">{t`Portfolio`}</span>
        {account && (
          <span className="ml-2 text-white">
            (
            <ExternalLink
              href={getEtherscanAddress(account)}
              text={formattedAddress || ""}
              className="inline-flex text-sm font-light text-white"
            />
            )
          </span>
        )}
      </div>
      <div className="mb-8 flex min-h-full flex-col align-bottom">
        <BalanceWithLabel
          className="mt-8 w-full"
          balance={balance || "0"}
          tooltipText={t`${TooltipDefinition.OWNED_ELFI}`}
          label={t`ELFI`}
        />
        <BalanceWithLabel
          className="mt-8 w-full"
          balance={votingPower || "0"}
          tooltipText={t`${TooltipDefinition.OWNED_VOTING_POWER}`}
          label={t`Your Voting Power`}
        />
        {!!Number(unclaimedAirdrop) && (
          <div className="mt-4 flex items-center justify-between border-t border-white pt-4">
            <BalanceWithLabel
              balance={unclaimedAirdrop}
              label={t`Unclaimed ELFI`}
            />
            <LinkButton
              link="/airdrop"
              className="mb-5 self-end"
              variant={ButtonVariant.OUTLINE_WHITE}
            >{t`Claim`}</LinkButton>
          </div>
        )}
        <div className="mt-4 flex items-center align-middle">
          <div className="mr-8 basis-96">
            <ThresholdProgressBar account={account} />
          </div>
          {canLeaveGSC ? (
            <LeaveGSCButton account={account} signer={signer} />
          ) : (
            <JoinGSCButton
              account={account}
              signer={signer}
              disabled={!canJoinGSC || !account}
            />
          )}
        </div>
      </div>
    </Card>
  );
}
