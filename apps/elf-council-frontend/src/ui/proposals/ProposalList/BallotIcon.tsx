import React, { ReactElement } from "react";
import {
  ThumbDownIcon,
  ThumbUpIcon,
  XCircleIcon,
} from "@heroicons/react/solid";
import { formatEther } from "ethers/lib/utils";
import { t } from "ttag";
import Tooltip from "src/ui/base/Tooltip/Tooltip";
import { Ballot } from "src/ui/voting/Ballot";
import { useBallot } from "src/ui/voting/useBallot";
import { useGSCBallot } from "src/ui/voting/useGSCBallot";

interface BallotIconProps {
  account: string | null | undefined;
  proposalId: string;
  isGSCProposal?: boolean;
}
export function BallotIcon({
  account,
  proposalId,
  isGSCProposal,
}: BallotIconProps): ReactElement | null {
  const { data: ballot } = useBallot(account, proposalId);
  const { data: gscBallot } = useGSCBallot(account, proposalId);

  if (!isGSCProposal && ballot === undefined) {
    return null;
  }
  if (isGSCProposal && gscBallot === undefined) {
    return null;
  }

  const [votingPowerBN, coreCastBallot] = ballot ?? [];
  const [gscVotingPowerBN, gscCastBallot] = gscBallot ?? [];
  let castBallot = coreCastBallot;
  let votingPower = Number(formatEther(votingPowerBN || 0));
  if (isGSCProposal) {
    votingPower = gscVotingPowerBN?.toNumber() || 0;
    castBallot = gscCastBallot;
  }

  if (votingPower && castBallot === Ballot.YES) {
    return (
      <div className="h-4 w-4 text-green-500">
        <Tooltip content={t`Voted yes`}>
          <ThumbUpIcon height="18" />
        </Tooltip>
      </div>
    );
  }

  if (votingPower && castBallot === Ballot.NO) {
    return (
      <div className="h-4 w-4 text-red-500">
        <Tooltip content={t`Voted no`}>
          <ThumbDownIcon height="18" />
        </Tooltip>
      </div>
    );
  }

  if (votingPower && castBallot === Ballot.MAYBE) {
    return (
      <div className="text-principalRoyalBlue h-4 w-4">
        <Tooltip content={t`Voted abstain`}>
          <XCircleIcon height="18" />
        </Tooltip>
      </div>
    );
  }

  return null;
}
