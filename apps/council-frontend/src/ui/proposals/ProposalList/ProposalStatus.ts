import { parseEther } from "ethers/lib/utils";
import { VotingPower } from "src/proposals/VotingPower";
import { t } from "ttag";

export enum ProposalStatus {
  IN_PROGRESS = "IN_PROGRESS",
  PASSING = "PASSING",
  FAILING = "FAILING",
  PASSED = "PASSED",
  FAILED = "FAILED",
  UNVERIFIED = "UNVERIFIED",
}

export const ProposalStatusLabels: Record<ProposalStatus, string> = {
  [ProposalStatus.IN_PROGRESS]: t`In progress`,
  [ProposalStatus.PASSING]: t`Passing`,
  [ProposalStatus.FAILING]: t`Failing`,
  [ProposalStatus.PASSED]: t`Passed`,
  [ProposalStatus.FAILED]: t`Failed`,
  [ProposalStatus.UNVERIFIED]: t`Unverified`,
};

export function getProposalStatus(
  isVotingOpen: boolean,
  isExecuted: boolean,
  quorum: string, // in 18 decimal format: "1.0" = 1x10^18
  votingPower: VotingPower | undefined,
): ProposalStatus | undefined {
  // if there are enough yes votes to pass quorum
  const hasEnoughYes =
    votingPower?.[0]?.gte(parseEther(quorum || "0")) || false;
  // if there are enough no votes to pass quorum
  const hasEnoughNo = votingPower?.[1]?.gte(parseEther(quorum || "0")) || false;

  if (!quorum) {
    return ProposalStatus.UNVERIFIED;
  }

  return proposalStatus(
    !!votingPower,
    isVotingOpen,
    isExecuted,
    hasEnoughYes,
    hasEnoughNo,
  );
}

export function getGSCProposalStatus(
  isVotingOpen: boolean,
  isExecuted: boolean,
  quorum: string, // number format: "1" = 1.
  votingPower: VotingPower | undefined,
): ProposalStatus | undefined {
  // if there are enough yes votes to pass quorum
  const hasEnoughYes = votingPower?.[0]?.gte(+quorum || "0") || false;
  // if there are enough no votes to pass quorum
  const hasEnoughNo = votingPower?.[1]?.gte(+quorum || "0") || false;

  if (!quorum) {
    return ProposalStatus.UNVERIFIED;
  }

  return proposalStatus(
    !!votingPower,
    isVotingOpen,
    isExecuted,
    hasEnoughYes,
    hasEnoughNo,
  );
}

function proposalStatus(
  hasVotingPowerResult: boolean,
  isVotingOpen: boolean,
  isExecuted: boolean,
  hasEnoughYes: boolean,
  hasEnoughNo: boolean,
) {
  // special case here once a proposal is executed, it is deleted, so there is no votePower.
  // however, if it has NOT been executed, and there is no vote power, then it is probably still
  // loading, so we should show no status until it loads.
  // if the proposal is executed
  if (!hasVotingPowerResult && !isExecuted) {
    return undefined;
  }

  if (!isVotingOpen) {
    if (isExecuted) {
      return ProposalStatus.PASSED;
    }

    if (hasEnoughYes) {
      return ProposalStatus.PASSING;
    }

    // voting is closed and there weren't enough yes votes means it failed.
    return ProposalStatus.FAILED;
  }

  if (hasEnoughYes) {
    return ProposalStatus.PASSING;
  }

  if (hasEnoughNo) {
    return ProposalStatus.FAILING;
  }

  return ProposalStatus.IN_PROGRESS;
}
