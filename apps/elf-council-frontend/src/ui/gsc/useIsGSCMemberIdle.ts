import { useSmartContractEvents } from "@elementfi/react-query-typechain";
import getFromBlock from "src/elf-council-addresses/getFromBlock";
import { gscVaultContract } from "src/elf/contracts";
import { useBlockAtBlockHashOrBlockTag } from "src/ui/ethereum/useBlockAtBlockHashOrBlockTag";
import { useGSCIdleDuration } from "./useGSCIdleDuration";

export function useIsGSCMemberIdle(
  account: string | null | undefined,
): boolean {
  const { data: idleDuration = 0 } = useGSCIdleDuration();
  const { data: events = [] } = useSmartContractEvents(
    gscVaultContract,
    "MembershipProved",
    { fromBlock: getFromBlock() },
  );

  const accountEvents = events
    .filter(({ args }) => {
      if (!args || !account) {
        return false;
      }

      return args[0] === account;
    })
    .sort((a, b) => b.blockNumber - a.blockNumber);

  const latestEvent = accountEvents[0];
  const { data: block } = useBlockAtBlockHashOrBlockTag(latestEvent?.blockHash);

  // if we can't determine if they are idle, assume that they are to prevent voting with zero power.
  if (!block) {
    return true;
  }

  const currentTimestampInSeconds = Math.floor(Date.now() / 1000);
  const joined = block.timestamp;
  // if the member joined recently, they must wait for the idle duration before voting.  i.e. if
  // idle duration is 10s, the user joined at timestamp 10s, then they must wait until the current
  // timestamp is 20s to vote.
  const isIdle = currentTimestampInSeconds < joined + idleDuration;

  return isIdle;
}
