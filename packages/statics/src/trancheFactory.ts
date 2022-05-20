import { includes } from "lodash";
import { SonraCategoryInfo, zx } from "sonra";
import { elementModel, ElementModel } from ".";
import { TrancheFactory__factory } from "../typechain";
import { trancheFactoryAddress } from "./constants";
import { provider } from "./provider";
import { log } from "./utils";

export type TrancheFactoryInfo = SonraCategoryInfo<
  ElementModel,
  "trancheFactory"
>;

const mainnet_addresses = require("./mainnet.addresses.json") as {
  safelist: string[];
};

export type TrancheFactoryEvent =
  TrancheFactoryInfo["metadata"][zx.Address]["events"][number];

async function buildTrancheFactoryMetadataEntry(
  factory: zx.Address,
): Promise<TrancheFactoryInfo["metadata"][zx.Address]> {
  const trancheFactory = TrancheFactory__factory.connect(factory, provider);

  const filter = trancheFactory.filters.TrancheCreated(null, null, null);
  const trancheCreatedEvents = await trancheFactory.queryFilter(filter);

  const events = await Promise.all(
    trancheCreatedEvents.map(async (event) => {
      const trancheAddress = zx.address().parse(event.args.trancheAddress);

      const expiration = new Date(event.args.expiration.toNumber() * 1000);
      const wrappedPositionAddress = zx.address().parse(event.args.wpAddress);
      const blockNumber = event.blockNumber;
      const blockTimestamp = new Date(
        (await event.getBlock()).timestamp * 1000,
      );
      return {
        trancheAddress,
        expiration,
        wrappedPositionAddress,
        blockTimestamp,
        blockNumber,
      };
    }),
  );

  const certifiedEvents: TrancheFactoryEvent[] = [];
  const invalidEvents: TrancheFactoryEvent[] = [];

  for (const event of events) {
    if (includes(mainnet_addresses.safelist, event.trancheAddress)) {
      certifiedEvents.push(event);
    } else {
      invalidEvents.push(event);
    }
  }

  return { events, certifiedEvents, invalidEvents };
}

export async function buildTrancheFactoryInfo(): Promise<TrancheFactoryInfo> {
  log("Building trancheFactory...");
  const addresses = zx
    .address()
    .array()
    .nonempty()
    .parse([trancheFactoryAddress]);

  const metadata = zx.addressRecord(elementModel.trancheFactory).parse(
    Object.fromEntries(
      await Promise.all(
        addresses.map(async (address) => {
          const trancheFactoryMetadataEntry =
            await buildTrancheFactoryMetadataEntry(address);
          return [address, trancheFactoryMetadataEntry];
        }),
      ),
    ),
  );

  log("Finished building trancheFactory...");
  return { addresses, metadata };
}
