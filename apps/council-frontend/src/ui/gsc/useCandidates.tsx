import { delegates } from "src/delegates/delegates";
import { formatEther } from "ethers/lib/utils";
import { useGSCMembers } from "src/ui/gsc/useGSCMembers";
import { useMemo } from "react";
import {
  useVotingPowerByDelegates,
  VotePowerByDelegate,
} from "src/ui/gsc/useVotingPowerByDelegates";
import { useGSCVotePowerThreshold } from "./useGSCVotePowerThreshold";
import { BigNumber } from "ethers";
import { Delegate } from "@elementfi/council-delegates";

/**
 * Returns a list of candidates, sorted by highest to lowest voting power
 * @returns {Delegate[]} a list of candidates
 */
export function useGSCCandidates(): Delegate[] {
  const { data: members = [] } = useGSCMembers();
  const gscMemberAddresses = members.map(({ address }) => address);
  const { data: threshold } = useGSCVotePowerThreshold();

  const { data: votePowerByDelegates = {} } = useVotingPowerByDelegates();

  return useMemo(
    () =>
      threshold
        ? sortVotingPower(votePowerByDelegates, gscMemberAddresses, threshold)
        : ([] as Delegate[]),
    // Using the length here is a better hook dependency
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [gscMemberAddresses.length, votePowerByDelegates],
  );
}

/**
 * Returns a sorted list of delegates. Sorted by voting power.
 * @returns {Array<string>} a string array of delegate addresses.
 */
function sortVotingPower(
  votePowerByDelegates: VotePowerByDelegate,
  gscMembers: Array<string>,
  threshold: BigNumber,
) {
  const knownDelegates = delegates;

  return Object.entries(votePowerByDelegates)
    .sort((a, b) => Number(formatEther(b[1])) - Number(formatEther(a[1])))
    .filter(([address]) => {
      const votingPower = votePowerByDelegates[address];
      return !gscMembers.includes(address) && votingPower.lt(threshold);
    })
    .map(([address]) => {
      const knownDelegate = knownDelegates.find(
        (delegate) => address === delegate.address,
      );

      return knownDelegate ?? { address, createdAt: "" };
    })
    .slice(0, 20);
}
