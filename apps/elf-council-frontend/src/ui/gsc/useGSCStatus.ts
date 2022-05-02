import { BigNumber } from "ethers";
import { formatUnits, parseEther } from "ethers/lib/utils";

import { useGSCVotePowerThreshold } from "src/ui/gsc/useGSCVotePowerThreshold";
import { useIsGSCMember } from "src/ui/gsc/useIsGSCMember";
import { useVotingPowerForAccountAtLatestBlock } from "src/ui/voting/useVotingPowerForAccount";
import { useIsMemberKicked } from "src/ui/gsc/useIsMemberKicked";

export enum EligibilityState {
  NotEligible, // Account can not join GSC
  Approaching, // Account is close to threshold
  Eligible, // Account can join GSC
  Expiring, // Account is in GSC but can be kicked
  Kicked, // Account has previously been in GSC but has been kicked
  Current, // Account currently in GSC
}

export interface GSCContext {
  status: EligibilityState;
  votingPower: string;
  threshold: BigNumber;
}

const APPROACHING_THRESHOLD_PERCENTAGE = 0.9;

export function useGSCStatus(account?: string | null): GSCContext {
  const votingPower = useVotingPowerForAccountAtLatestBlock(account);
  const { data: thresholdValue } = useGSCVotePowerThreshold();
  const { data: isOnGSC } = useIsGSCMember(account);
  const wasMemberKicked = useIsMemberKicked(account);
  const threshold = thresholdValue ?? BigNumber.from(0);

  const parsedVotingPower = parseEther(votingPower);
  const aboveThreshold = parsedVotingPower.gte(threshold);
  const approachingThreshold =
    +formatUnits(threshold, 10) * APPROACHING_THRESHOLD_PERCENTAGE;
  const isApproaching =
    !threshold.isZero() &&
    +formatUnits(parsedVotingPower, 10) > approachingThreshold &&
    !aboveThreshold;

  if (isOnGSC) {
    // Check if account has enough votes
    if (isOnGSC && !aboveThreshold) {
      return {
        status: EligibilityState.Expiring,
        votingPower,
        threshold,
      };
    } else {
      // Account is a GSC member is good standing
      return {
        status: EligibilityState.Current,
        votingPower,
        threshold,
      };
    }
  } else {
    // Account is eligible to join GSC
    if (aboveThreshold) {
      return {
        status: EligibilityState.Eligible,
        votingPower,
        threshold,
      };
    }

    // Account is not in GSC, but was previously
    // This takes precedence over Approaching state
    if (wasMemberKicked) {
      return {
        status: EligibilityState.Kicked,
        votingPower,
        threshold,
      };
    }

    // Account is close to being eligible
    if (isApproaching) {
      return {
        status: EligibilityState.Approaching,
        votingPower,
        threshold,
      };
    }

    // Account is not eligible or close to join GSC
    return {
      status: EligibilityState.NotEligible,
      votingPower,
      threshold,
    };
  }
}
