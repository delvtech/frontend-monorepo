import React, { ReactElement } from "react";

import { Provider } from "@ethersproject/providers";
import { Signer } from "ethers";
import { t } from "ttag";

import { getEtherscanAddress } from "src/elf-etherscan/domain";
import { BalanceWithLabel } from "src/ui/base/BalanceWithLabel/BalanceWithLabel";
import Card, { CardVariant } from "src/ui/base/Card/Card";
import ExternalLink from "src/ui/base/ExternalLink/ExternalLink";
import { useFormattedWalletAddress } from "src/ui/ethereum/useFormattedWalletAddress";
import { JoinGSCButton, LeaveGSCButton } from "src/ui/gsc/GSCButtons";
import { TooltipDefinition } from "src/ui/voting/tooltipDefinitions";
import { ThresholdProgressBar } from "src/ui/gsc/ThresholdProgressBar";
import { useGSCStatus, EligibilityState } from "src/ui/gsc/useGSCStatus";
import { GSCHistory } from "./GSCHistory";

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

  const { status, votingPower } = useGSCStatus(account);
  const canJoinGSC = status === EligibilityState.Eligible;
  const canLeaveGSC =
    status === EligibilityState.Expiring || status === EligibilityState.Current;

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

        <div className="mt-4 mr-2 flex flex-row items-center lg:ml-auto lg:mt-0 xl:mr-12">
          {/* GSC History */}
          <div className="mr-4 flex w-fit flex-col lg:mr-16 xl:mr-36">
            <GSCHistory status={status} />
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
