import React, { ReactElement } from "react";

import { Provider } from "@ethersproject/providers";
import { Signer } from "ethers";
import { parseEther } from "ethers/lib/utils";
import { t } from "ttag";

import { getEtherscanAddress } from "src/elf-etherscan/domain";
import { BalanceWithLabel } from "src/ui/base/BalanceWithLabel/BalanceWithLabel";
import Card, { CardVariant } from "src/ui/base/Card/Card";
import ExternalLink from "src/ui/base/ExternalLink/ExternalLink";
import { useFormattedWalletAddress } from "src/ui/ethereum/useFormattedWalletAddress";
import { JoinGSCButton } from "src/ui/gsc/JoinGSCButton";
import { useGSCVotePowerThreshold } from "src/ui/gsc/useGSCVotePowerThreshold";
import { useIsGSCMember } from "src/ui/gsc/useIsGSCMember";
import { TooltipDefinition } from "src/ui/voting/tooltipDefinitions";
import { useVotingPowerForAccountAtLatestBlock } from "src/ui/voting/useVotingPowerForAccount";
import { useFeatureFlag } from "src/elf/featureFlag/useFeatureFlag";
import { FeatureFlag } from "src/elf/featureFlag/featureFlag";
import { ThresholdProgressBar } from "src/ui/gsc/ThresholdProgressBar";

interface PortfolioCardProps {
  active: boolean;
  account: string | undefined | null;
  provider?: Provider;
  signer?: Signer;
}

export function GSCPortfolioCard({
  active,
  account,
  provider,
  signer,
}: PortfolioCardProps): ReactElement {
  const formattedAddress = useFormattedWalletAddress(account, provider);
  const votingPower = useVotingPowerForAccountAtLatestBlock(account);

  return (
    <Card variant={CardVariant.GRADIENT} className="w-fit shadow-md lg:w-full">
      <div>
        <span className="text-md font-bold text-white lg:text-lg">{t`Governance Portfolio`}</span>
        {account && (
          <span className="ml-2 text-white">
            <ExternalLink
              href={getEtherscanAddress(account)}
              text={formattedAddress || ""}
              className="inline-flex text-xs font-light text-white xl:text-sm"
            />
          </span>
        )}
      </div>

      <div className="mb-4 flex min-h-full min-w-fit flex-row flex-wrap items-center">
        {/* Voting Power */}
        <BalanceWithLabel
          className="mt-4 mr-4 w-44 xl:mr-12"
          balance={votingPower}
          tooltipText={t`${TooltipDefinition.OWNED_VOTING_POWER}`}
          label={t`Voting Power`}
        />

        {/* GSC eligibility progress bar */}
        <div className="mt-4 mr-8 flex min-w-fit max-w-xs flex-grow items-center align-middle lg:w-44">
          <ThresholdProgressBar account={account} />
        </div>

        <div className="mt-4 mr-2 flex flex-row lg:ml-auto lg:mt-0 xl:mr-12">
          {/* GSC History */}
          <div className="mr-4 flex w-fit flex-col lg:mr-16 xl:mr-24">
            <span className="text-xl text-white">{t`GSC History`}</span>
            <span className="w-max text-sm text-white">{t`Member since 04/20/2022`}</span>
          </div>
          {/* TODO @cashd: Branch between Join/Leave GSC Button */}
          <JoinGSCButton active={active} account={account} signer={signer} />
        </div>
      </div>
    </Card>
  );
}

// TODO @cashd: Unused for now
function useShowJoinButton(account: string | null | undefined) {
  const hasGSCFlag = useFeatureFlag(FeatureFlag.GSC);
  const votePower = useVotingPowerForAccountAtLatestBlock(account);
  const { data: threshold, isSuccess } = useGSCVotePowerThreshold();
  const { data: isOnGSC } = useIsGSCMember(account);

  if (hasGSCFlag && isSuccess && !!Number(votePower) && !!threshold) {
    const hasEnoughToJoinGSC = parseEther(votePower).gte(threshold);
    const canLeaveGSC = isOnGSC && parseEther(votePower).lt(threshold);

    return hasEnoughToJoinGSC || canLeaveGSC;
  }
}
