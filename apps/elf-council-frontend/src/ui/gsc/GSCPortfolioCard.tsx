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
  const canLeaveGSC = status === EligibilityState.Expiring;

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

      <div className="mt-4 mb-4 flex min-h-full min-w-fit flex-row flex-wrap items-center space-y-3 lg:space-y-0">
        {/* Voting Power */}
        <BalanceWithLabel
          className="mr-4 basis-40"
          balance={votingPower}
          tooltipText={t`${TooltipDefinition.OWNED_VOTING_POWER}`}
          label={t`Voting Power`}
        />

        {/* GSC eligibility progress bar */}
        <div className="flex-shrink-0 grow-[2] basis-72">
          <div className="mr-8 flex max-w-md items-center align-middle">
            <ThresholdProgressBar account={account} />
          </div>
        </div>

        <div className="mr-2 flex grow basis-72 flex-row items-center lg:ml-auto">
          {/* GSC History */}
          <div className="mr-auto flex w-fit flex-col">
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
