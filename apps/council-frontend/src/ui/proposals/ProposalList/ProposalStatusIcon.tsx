import React, { ReactElement } from "react";

import { Signer } from "@ethersproject/abstract-signer";
import { Proposal } from "@elementfi/council-proposals";
import { t } from "ttag";

import { getIsVotingOpen } from "src/proposals";
import { Intent } from "src/ui/base/Intent";
import { useLatestBlockNumber } from "src/ui/ethereum/useLatestBlockNumber";
import { useVotingPowerForProposal } from "src/ui/proposals/useVotingPowerForProposal";

import {
  getGSCProposalStatus,
  getProposalStatus,
  ProposalStatus,
} from "src/ui/proposals/ProposalList/ProposalStatus";
import { useProposalExecuted } from "src/ui/proposals/useProposalExecuted";
import classNames from "classnames";
import Tooltip from "src/ui/base/Tooltip/Tooltip";
import { useVotingPowerForGSCProposal } from "src/ui/proposals/useVotingPowerForGSCProposal";

const StatusLabels: Record<ProposalStatus, string> = {
  [ProposalStatus.IN_PROGRESS]: t`In progress`,
  [ProposalStatus.PASSING]: t`Passing`,
  [ProposalStatus.FAILING]: t`Failing`,
  [ProposalStatus.PASSED]: t`Passed`,
  [ProposalStatus.FAILED]: t`Failed`,
  [ProposalStatus.UNVERIFIED]: t`Unverified`,
};

const StatusTagIntents: Record<ProposalStatus, Intent> = {
  [ProposalStatus.IN_PROGRESS]: Intent.PRIMARY,
  [ProposalStatus.PASSING]: Intent.SUCCESS,
  [ProposalStatus.FAILING]: Intent.ERROR,
  [ProposalStatus.PASSED]: Intent.SUCCESS,
  [ProposalStatus.FAILED]: Intent.ERROR,
  [ProposalStatus.UNVERIFIED]: Intent.BLANK,
};

interface ProposalStatusIconProps {
  signer: Signer | null | undefined;
  proposal: Proposal;
  disableTooltip?: boolean;
  isGSCProposal?: boolean;
}

export function ProposalStatusIcon({
  proposal,
  disableTooltip = false,
  isGSCProposal = false,
}: ProposalStatusIconProps): ReactElement | null {
  const { data: currentBlockNumber = 0 } = useLatestBlockNumber();
  const { proposalId, quorum } = proposal;
  const isVotingOpen = getIsVotingOpen(proposal, currentBlockNumber);
  const isExecuted = useProposalExecuted(proposalId);
  const votingPower = useVotingPowerForProposal(proposalId);
  const gscVotingPower = useVotingPowerForGSCProposal(proposalId);

  let status = getProposalStatus(isVotingOpen, isExecuted, quorum, votingPower);
  if (isGSCProposal) {
    status = getGSCProposalStatus(
      isVotingOpen,
      isExecuted,
      quorum,
      gscVotingPower,
    );
  }

  if (!status) {
    return null;
  }

  return disableTooltip ? (
    <div
      className={classNames(
        "flex items-center space-x-8",
        intentTextColors[StatusTagIntents[status]],
      )}
    >
      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 8 8">
        <circle cx={4} cy={4} r={3} />
      </svg>
    </div>
  ) : (
    <Tooltip content={StatusLabels[status]}>
      <div
        className={classNames(
          "flex items-center space-x-8",
          intentTextColors[StatusTagIntents[status]],
        )}
      >
        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 8 8">
          <circle cx={4} cy={4} r={3} />
        </svg>
      </div>
    </Tooltip>
  );
}

const intentTextColors: Record<Intent, string> = {
  [Intent.WARNING]: classNames("text-orange"),
  [Intent.PRIMARY]: classNames("text-principalRoyalBlue"),
  [Intent.PRIMARY_SOLID]: classNames("text-white"),
  [Intent.SUCCESS]: classNames("text-green-500"),
  [Intent.ERROR]: classNames("text-red-500"),
  [Intent.BLANK]: classNames("text-gray-500"),
};
