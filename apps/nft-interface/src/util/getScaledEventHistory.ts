import { Event } from "ethers";
import { countBy, toPairs } from "lodash";
import moment from "moment";
import { scale } from "./scale";

export async function getScaledEventHistory(events: Event[]): Promise<
  {
    date: string;
    count: number;
  }[]
> {
  if (events.length === 0) {
    return [];
  }

  // Get earliest event timestamp
  const first = events[0];
  const firstTimestamp = (await first.getBlock()).timestamp;

  // Get latest event timestamp
  const last = events[events.length - 1];
  const lastTimestamp = (await last.getBlock()).timestamp;

  // Scale all events blockNumber over [first, last] timestamp domain
  // All new scaled timestamps are formatted using moment
  const scaledHistory = events.map((event) =>
    moment(
      scale(
        event.blockNumber,
        first.blockNumber,
        last.blockNumber,
        firstTimestamp * 1000,
        lastTimestamp * 1000,
      ),
    ).format("DD MMM h a"),
  );

  return toPairs(countBy(scaledHistory)).map((pair) => ({
    date: pair[0],
    count: pair[1],
  }));
}
