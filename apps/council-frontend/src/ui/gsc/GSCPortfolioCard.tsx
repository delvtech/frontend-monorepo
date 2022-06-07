import React, { ReactElement } from "react";

import { Provider } from "@ethersproject/providers";
import { Signer } from "ethers";
import { t } from "ttag";

import { getEtherscanAddress } from "src/integrations/etherscan";
import { BalanceWithLabel } from "src/ui/base/BalanceWithLabel/BalanceWithLabel";
import Card, { CardVariant } from "src/ui/base/Card/Card";
import ExternalLink from "src/ui/base/ExternalLink/ExternalLink";
import { useFormattedWalletAddress } from "src/ui/ethereum/useFormattedWalletAddress";
import { JoinGSCButton, LeaveGSCButton } from "src/ui/gsc/GSCButtons";
import { TooltipDefinition } from "src/ui/voting/tooltipDefinitions";
import { ThresholdProgressBar } from "src/ui/gsc/ThresholdProgressBar";
import { useGSCStatus, EligibilityState } from "src/ui/gsc/useGSCStatus";
import { GSCHistory } from "src/ui/gsc/GSCHistory";
import { useGSCVotePowerThreshold } from "src/ui/gsc/useGSCVotePowerThreshold";

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
  const { data: thresholdValue } = useGSCVotePowerThreshold();
  const { status, votingPower } = useGSCStatus(account);
  const canJoinGSC = status === EligibilityState.Eligible;
  const canLeaveGSC = status === EligibilityState.Expiring;
  const isGSC = status === EligibilityState.Current;

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

      <div className="mt-4 mb-4 flex min-h-full min-w-fit flex-row flex-wrap items-center space-y-6 xl:space-y-0">
        {/* GSC eligibility progress bar */}
        <div className="flex grow-[2] basis-[34rem] flex-wrap md:flex-nowrap lg:space-y-0">
          {/* Voting Power */}
          <BalanceWithLabel
            className="mb-6 mr-4 basis-52 sm:mb-0"
            balance={votingPower}
            tooltipText={t`${TooltipDefinition.OWNED_VOTING_POWER}`}
            label={t`Voting Power`}
          />
          <div className="flex max-w-md grow items-center align-middle sm:mr-8">
            <ThresholdProgressBar account={account} gscStatus={status} />
          </div>
        </div>

        <div className="flex grow basis-72 flex-row items-center sm:mr-4 lg:ml-auto">
          {/* GSC History */}
          <div className="w-3/4gs flex flex-col sm:w-fit">
            <GSCHistory
              status={status}
              threshold={thresholdValue?.toString() ?? "0"}
            />
          </div>
          <div className="ml-6">
            {canLeaveGSC ? (
              <LeaveGSCButton account={account} signer={signer} />
            ) : (
              <JoinGSCButton
                account={account}
                signer={signer}
                disabled={!canJoinGSC || !account}
                isGSC={isGSC}
              />
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
