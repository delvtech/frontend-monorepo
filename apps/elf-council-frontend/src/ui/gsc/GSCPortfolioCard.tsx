import React, { ReactElement } from "react";

import { Provider } from "@ethersproject/providers";
import { Signer } from "ethers";
import { commify, formatEther, parseEther } from "ethers/lib/utils";
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
import { ProgressBar } from "src/ui/base/ProgressBar/ProgressBar";

interface PortfolioCardProps {
  account: string | undefined | null;
  provider?: Provider;
  signer?: Signer;
}

export function GSCPortfolioCard({
  account,
  provider,
  signer,
}: PortfolioCardProps): ReactElement {
  const formattedAddress = useFormattedWalletAddress(account, provider);
  const votingPower = useVotingPowerForAccountAtLatestBlock(account);

  return (
    <Card variant={CardVariant.GRADIENT} className="w-full shadow-md">
      <div>
        <span className="text-lg font-bold text-white">{t`Governance Portfolio`}</span>
        {account && (
          <span className="ml-2 text-white">
            <ExternalLink
              href={getEtherscanAddress(account)}
              text={formattedAddress || ""}
              className="inline-flex text-sm font-light text-white"
            />
          </span>
        )}
      </div>

      <div className="mb-8 flex min-h-full min-w-fit flex-row items-center">
        {/* Voting Power */}
        <BalanceWithLabel
          className="mt-4 mr-12 w-44"
          balance={votingPower}
          tooltipText={t`${TooltipDefinition.OWNED_VOTING_POWER}`}
          label={t`Voting Power`}
        />

        {/* GSC eligibility progress bar */}
        <div className="mt-4 mr-12 flex w-1/3 min-w-fit items-center align-middle">
          <ThresholdProgressBar account={account} />
        </div>

        <div className="ml-auto mr-12 flex flex-row">
          {/* GSC History */}
          <div className="mr-24 flex w-48 flex-col">
            <span className="text-xl text-white">{t`GSC History`}</span>
            <span className="w-max text-sm text-white">{t`Member since 04/20/2022`}</span>
          </div>

          <JoinGSCButton account={account} signer={signer} />
        </div>
      </div>
    </Card>
  );
}

interface ThresholdProgressBarProps {
  account: string | null | undefined;
}
function ThresholdProgressBar({
  account,
}: ThresholdProgressBarProps): ReactElement {
  const { data: thresholdValue } = useGSCVotePowerThreshold();
  const threshold = formatEther(thresholdValue || 0);

  const votingPower = useVotingPowerForAccountAtLatestBlock(account);
  const votingPercent = Math.floor((+votingPower / +threshold) * 100);

  return (
    <div className="mr-3 w-full space-y-1 text-white">
      <div>
        <span className="text-lg">{t`GSC Eligibility`}</span>
      </div>
      <ProgressBar progress={+votingPower / +threshold} />
      <div>
        <span className="text-sm">
          {`${votingPercent}%`} ({commify(votingPower)} / {commify(threshold)} ){" "}
        </span>
        <span className="text-sm">{t`required to join GSC`}</span>
      </div>
    </div>
  );
}

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
