import { includes } from "lodash";
import { SonraCategoryInfo, zx } from "sonra";
import { elementModel, ElementModel } from ".";
import { ConvergentPoolFactory__factory } from "../typechain";
import { ccPoolFactoryV1Address, ccPoolFactoryV1_1Address } from "./constants";
import { provider } from "./provider";
import { log } from "./utils";

export type ConvergentPoolFactoryInfo = SonraCategoryInfo<
  ElementModel,
  "convergentPoolFactory"
>;

const mainnet_addresses = require("./mainnet.addresses.json") as {
  safelist: string[];
};

export type ConvergentPoolFactoryEvent =
  ConvergentPoolFactoryInfo["metadata"][zx.Address]["events"][number];

async function buildConvergentPoolFactoryMetadataEntry(
  factory: zx.Address,
): Promise<ConvergentPoolFactoryInfo["metadata"][zx.Address]> {
  const convergentCurvePoolFactory = ConvergentPoolFactory__factory.connect(
    factory,
    provider,
  );

  const filter = convergentCurvePoolFactory.filters.CCPoolCreated(null, null);
  const convergentCurvePoolCreatedEvents =
    await convergentCurvePoolFactory.queryFilter(filter);

  const events: ConvergentPoolFactoryEvent[] = await Promise.all(
    convergentCurvePoolCreatedEvents.map(async (event) => {
      const convergentCurvePool = zx.address().parse(event.args.pool);
      const bond = zx.address().parse(event.args.bondToken);
      const blockNumber = event.blockNumber;

      const blockTimestamp = new Date(
        (await event.getBlock()).timestamp * 1000,
      );

      return {
        convergentCurvePool,
        bond,
        blockNumber,
        blockTimestamp,
        factory,
      };
    }),
  );

  const certifiedEvents: ConvergentPoolFactoryEvent[] = [];
  const invalidEvents: ConvergentPoolFactoryEvent[] = [];

  for (const event of events) {
    if (includes(mainnet_addresses.safelist, event.convergentCurvePool)) {
      certifiedEvents.push(event);
    } else {
      invalidEvents.push(event);
    }
  }

  return {
    events,
    certifiedEvents,
    invalidEvents,
    version: factory === ccPoolFactoryV1_1Address ? "v1.1" : "v1",
  };
}

export async function buildConvergentCurvePoolFactoryInfo(): Promise<ConvergentPoolFactoryInfo> {
  log("Building convergentPoolFactory...");
  const addresses = zx
    .address()
    .array()
    .nonempty()
    .parse([ccPoolFactoryV1_1Address, ccPoolFactoryV1Address]);

  const metadata = zx.addressRecord(elementModel.convergentPoolFactory).parse(
    Object.fromEntries(
      await Promise.all(
        addresses.map(async (address) => {
          const convergentCurvePoolMetadataEntry =
            await buildConvergentPoolFactoryMetadataEntry(address);
          return [address, convergentCurvePoolMetadataEntry];
        }),
      ),
    ),
  );

  log("Finished building convergentPoolFactory...");
  return { addresses, metadata };
}
