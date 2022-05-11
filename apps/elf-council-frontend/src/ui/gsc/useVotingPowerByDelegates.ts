import { BigNumber, Event } from "ethers";
import { useSmartContractEvents } from "@elementfi/react-query-typechain";
import { lockingVaultContract, vestingContract } from "src/elf/contracts";
import { useMemo } from "react";
import { getFromBlock } from "src/elf-council-addresses/getFromBlock";

export type VotePowerByDelegate = Record<string, BigNumber>;

export function useVotingPowerByDelegates(): VotePowerByDelegate {
  const { data: vestingVaultEvents = [] } = useSmartContractEvents(
    vestingContract,
    "VoteChange",
    {
      fromBlock: getFromBlock(),
    },
  );

  const { data: lockingVaultEvents = [] } = useSmartContractEvents(
    lockingVaultContract,
    "VoteChange",
    {
      fromBlock: getFromBlock(),
    },
  );

  const events = [...lockingVaultEvents, ...vestingVaultEvents];
  // Using the length here is a better hook dependency
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(() => getVotePowerByDelegate(events), [events.length]);
}

/**
 * Returns a record of all delegates and their respective voting power
 * @returns {VotePowerByDelegate} a mapping between delegate address -> voting power
 */
function getVotePowerByDelegate(events: Event[]): VotePowerByDelegate {
  const votePowerByDelegates: VotePowerByDelegate = {};

  events.forEach((event) => {
    const [, delegate, amount]: [string, string, BigNumber] = event.args as [
      string,
      string,
      BigNumber,
    ];

    if (delegate in votePowerByDelegates) {
      votePowerByDelegates[delegate] =
        votePowerByDelegates[delegate].add(amount);
    } else {
      votePowerByDelegates[delegate] = amount;
    }
  });

  return votePowerByDelegates;
}
