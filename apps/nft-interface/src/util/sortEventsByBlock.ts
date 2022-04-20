import { Event } from "ethers";

export function sortEventsByBlock(events: Event[]): Event[] {
  return events.sort((event) => event.blockNumber);
}
