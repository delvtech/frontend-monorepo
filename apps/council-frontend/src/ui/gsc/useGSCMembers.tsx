import { QueryObserverResult, useQuery } from "react-query";
import { useSmartContractEvents } from "@elementfi/react-query-typechain/src/hooks/useSmartContractEvents/useSmartContractEvents";
import { BigNumber } from "ethers";
import { gscVaultContract } from "src/contracts";
import zip from "lodash.zip";
import { Delegate } from "src/elf-council-delegates/delegates";

export function useGSCMembers(): QueryObserverResult<Delegate[]> {
  // grab membership approved events
  const { data: events } = useSmartContractEvents(
    gscVaultContract,
    "MembershipProved",
  );

  // now look to see if the member is *still* in the GSC.  they could have been kicked so we look at
  // the members property and make sure there is an entry.
  return useQuery({
    queryFn: async () => {
      const membersSet = new Set<string>();
      events?.forEach((event) => {
        const [member]: [string] = event.args as [string];
        membersSet.add(member);
      });

      // events are sometimes out of order, sort to prevent useQuery cache busting
      const membersArray = Array.from(membersSet).sort();

      // timestamps in seconds when user joined.  If the user doesn't exist, 0 is returned
      const timeStamps = await Promise.all(
        membersArray.map((member) => {
          return gscVaultContract.members(member);
        }),
      );

      // TODO: query the vote power of each gsc member so we sort descending
      const validMembers = zip<string, BigNumber>(membersArray, timeStamps)
        // 0 value for timestamp means no entry, so we filter
        .filter(([unusedMember, timeStamp]) => !!timeStamp?.toNumber())
        .map(([address]) => address) // only care about the addressthrow away the timestamp now
        .filter((address): address is string => !!address); // typeguard so (string | undefined)[] -> string[]

      return validMembers.map((address) => ({
        address,
      }));
    },
    queryKey: ["gsc-members"],
    enabled: !!events?.length,
  });
}
