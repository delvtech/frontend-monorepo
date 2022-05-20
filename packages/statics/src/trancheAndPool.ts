import { zx } from "sonra";
import { invariant } from "ts-invariant";
import {
  ConvergentPoolFactory__factory,
  TrancheFactory__factory,
} from "../typechain";
import {
  ccPoolFactoryV1Address,
  ccPoolFactoryV1_1Address,
  trancheFactoryAddress,
} from "./constants";
import { provider } from "./provider";
import { includes } from "lodash";

const mainnet_addresses = require("./mainnet.addresses.json") as {
  safelist: string[];
};

export interface ConvergentCurvePoolCreatedEvent {
  convergentCurvePoolAddress: zx.Address;
  bond: zx.CategorisedAddress<"principalToken">;
  factory: zx.Address;
  blockNumber: number;
  blockTimestamp: Date;
}

async function getConvergentCurvePoolCreatedEvents(
  convergentCurvePoolFactoryAddress: zx.Address,
): Promise<ConvergentCurvePoolCreatedEvent[]> {
  const convergentCurvePoolFactory = ConvergentPoolFactory__factory.connect(
    convergentCurvePoolFactoryAddress,
    provider,
  );

  const filter = convergentCurvePoolFactory.filters.CCPoolCreated(null, null);
  const convergentCurvePoolCreatedEvents =
    await convergentCurvePoolFactory.queryFilter(filter);

  return await Promise.all(
    convergentCurvePoolCreatedEvents.map(async (event) => {
      const convergentCurvePoolAddress = zx.address().parse(event.args.pool);
      const bond = zx
        .address()
        .category("principalToken")
        .conform()
        .parse(event.args.bondToken);
      const blockNumber = event.blockNumber;

      const blockTimestamp = new Date(
        (await event.getBlock()).timestamp * 1000,
      );

      return {
        convergentCurvePoolAddress,
        bond,
        blockNumber,
        blockTimestamp,
        factory: convergentCurvePoolFactoryAddress,
      };
    }),
  );
}

export interface TrancheCreatedEvent {
  trancheAddress: zx.Address;
  wrappedPositionAddress: zx.CategorisedAddress<"wrappedPosition">;
  expiration: Date;
  blockNumber: number;
  blockTimestamp: Date;
}

async function getTrancheCreatedEvents(
  trancheFactoryAddress: zx.Address,
): Promise<TrancheCreatedEvent[]> {
  const trancheFactory = TrancheFactory__factory.connect(
    trancheFactoryAddress,
    provider,
  );

  const filter = trancheFactory.filters.TrancheCreated(null, null, null);
  const trancheCreatedEvents = await trancheFactory.queryFilter(filter);

  return await Promise.all(
    trancheCreatedEvents.map(async (event) => {
      const trancheAddress = zx.address().parse(event.args.trancheAddress);

      const expiration = new Date(event.args.expiration.toNumber() * 1000);
      const wrappedPositionAddress = zx
        .address()
        .category("wrappedPosition")
        .conform()
        .parse(event.args.wpAddress);
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
}

interface TrancheAndPoolEventInfo {
  convergentCurvePoolCreatedEvents: ConvergentCurvePoolCreatedEvent[];
  trancheCreatedEvents: TrancheCreatedEvent[];
}

export async function buildTrancheAndPoolEventInfo(): Promise<TrancheAndPoolEventInfo> {
  let [
    convergentCurvePoolV1Events,
    convergentCurvePoolV1_1Events,
    trancheCreatedEvents,
  ] = await Promise.all([
    getConvergentCurvePoolCreatedEvents(ccPoolFactoryV1Address),
    getConvergentCurvePoolCreatedEvents(ccPoolFactoryV1_1Address),
    getTrancheCreatedEvents(trancheFactoryAddress),
  ]);

  let convergentCurvePoolCreatedEvents = [
    ...convergentCurvePoolV1_1Events,
    ...convergentCurvePoolV1Events,
  ].filter(({ convergentCurvePoolAddress }) =>
    includes(mainnet_addresses.safelist, convergentCurvePoolAddress),
  );

  trancheCreatedEvents = trancheCreatedEvents.filter(({ trancheAddress }) =>
    includes(mainnet_addresses.safelist, trancheAddress),
  );

  invariant(
    convergentCurvePoolCreatedEvents.length === trancheCreatedEvents.length,
    "convergentCurvePoolEvents and trancheCreatedEvents should match each other",
  );

  return {
    convergentCurvePoolCreatedEvents,
    trancheCreatedEvents,
  };
}
