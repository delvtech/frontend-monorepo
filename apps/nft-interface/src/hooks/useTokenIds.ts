import { BigNumber, Event } from "ethers";
import { sortEventsByBlock } from "src/util/sortEventsByBlock";
import { useTransferEvents } from "./useTransferEvents";

type TransferEventArgs = [string, string, BigNumber];

export function useTokenIds(address: string | null | undefined): BigNumber[] {
  const { data: toEvents } = useTransferEvents(undefined, address);
  const { data: fromEvents } = useTransferEvents(address, undefined);

  if (toEvents && fromEvents) {
    const tokenIds = reconcileTransferEvents(address, toEvents, fromEvents);
    return Array.from(tokenIds);
  }

  return [];
}

// Reconciles token in and out events into a set of tokens that the provided address owns
function reconcileTransferEvents(
  address: string | null | undefined,
  toEvents: Event[],
  fromEvents: Event[],
): Set<BigNumber> {
  const sortedEvents = sortEventsByBlock([...toEvents, ...fromEvents]);
  const tokenIds = new Set<BigNumber>([]);

  sortedEvents.forEach((event) => {
    const eventArgs = event.args as TransferEventArgs;
    if (eventArgs) {
      const from = eventArgs[0];
      const to = eventArgs[1];
      const tokenId = eventArgs[2];

      if (to === address) {
        tokenIds.add(tokenId);
      }

      if (from === address) {
        tokenIds.delete(tokenId);
      }
    }
  });

  return tokenIds;
}
