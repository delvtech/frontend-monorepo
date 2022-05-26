import { BigNumber } from "ethers";
import { lockingVaultContract, vestingContract } from "src/elf/contracts";
import { getFromBlock } from "src/elf-council-addresses/getFromBlock";
import { useQuery, UseQueryResult } from "react-query";

const oneAddress =
  "0x0000000000000000000000000000000000000000000000000000000000000001";

export type VotePowerByDelegate = Record<string, BigNumber>;

/**
 * Returns a record of all delegates and their respective voting power
 * @returns {Promise<VotePowerByDelegate>} a mapping between delegate address -> voting power
 */
async function getVotingPowerByDelegates(): Promise<VotePowerByDelegate> {
  // Filters for all vote change events
  const lockingFilter = lockingVaultContract.filters.VoteChange(
    null,
    null,
    null,
  );
  const vestingFilter = vestingContract.filters.VoteChange(null, null, null);

  // Query for events
  const lockingEvents = await lockingVaultContract.queryFilter(
    lockingFilter,
    getFromBlock(),
  );

  const vestingEvents = await vestingContract.queryFilter(
    vestingFilter,
    getFromBlock(),
  );

  const allEvents = lockingEvents.concat(vestingEvents);
  const sortedEvents = allEvents.sort(
    (eventA, eventB) => eventA.blockNumber - eventB.blockNumber,
  );

  const votePowerByDelegate: VotePowerByDelegate = {};

  // Compute total voting power state of voting vaults
  sortedEvents.forEach((event) => {
    if (event.args) {
      const from = event.args.from;
      const to = event.args.to;
      const amount = event.args.amount;

      // Disregard events to and from one address. This is a reserved address for certain vesting vault events.
      if (to === oneAddress || from === oneAddress) {
        return;
      }

      if (to in votePowerByDelegate) {
        votePowerByDelegate[to] = votePowerByDelegate[to].add(amount);
      } else {
        votePowerByDelegate[to] = amount;
      }
    }
  });

  return votePowerByDelegate;
}

export function useVotingPowerByDelegates(): UseQueryResult<VotePowerByDelegate> {
  return useQuery("voting-power-delegates", async () => {
    return await getVotingPowerByDelegates();
  });
}
