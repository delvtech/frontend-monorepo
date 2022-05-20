import { SonraCategoryInfo, zx } from "sonra";
import { elementModel, ElementModel } from ".";
import {
  ConvergentCurvePoolV1__factory,
  ConvergentCurvePool__factory,
} from "../typechain";
import { ccPoolFactoryV1Address, ccPoolFactoryV1_1Address } from "./constants";
import {
  ConvergentPoolFactoryEvent,
  ConvergentPoolFactoryInfo,
} from "./convergentPoolFactory";
import { provider } from "./provider";
import { log } from "./utils";

export type ConvergentCurvePoolV1Info = SonraCategoryInfo<
  ElementModel,
  "convergentCurvePoolV1"
>;

const buildConvergentCurvePoolV1MetadataEntry = async ({
  convergentCurvePool: address,
  bond,
  factory: convergentPoolFactory,
  blockTimestamp: start,
}: ConvergentPoolFactoryEvent): Promise<
  ConvergentCurvePoolV1Info["metadata"][zx.Address]
> => {
  const convergentCurvePool = ConvergentCurvePoolV1__factory.connect(
    address,
    provider,
  );
  const [
    poolId,
    underlying,
    end,
    governance,
    feesUnderlying,
    feesBond,
    percentFee,
    percentFeeGov,
  ] = await Promise.all([
    convergentCurvePool.getPoolId(),
    convergentCurvePool
      .underlying()
      .then(zx.address().category("baseToken").conform().parse),
    convergentCurvePool
      .expiration()
      .then((expiration) => new Date(expiration.toNumber() * 1000)),
    convergentCurvePool.governance().then(zx.address().parse),
    convergentCurvePool.feesUnderlying(),
    convergentCurvePool.feesBond(),
    convergentCurvePool.percentFee(),
    convergentCurvePool.percentFeeGov(),
  ]);

  const duration = (end.getTime() - start.getTime()) / 1000;

  const tranche = zx.address().category("principalToken").conform().parse(bond);
  const factory = zx
    .address()
    .category("convergentPoolFactory")
    .conform()
    .parse(convergentPoolFactory);

  return {
    poolId,
    tranche,
    underlying,
    governance,
    fees: {
      feesUnderlying,
      feesBond,
      percentFee,
      percentFeeGov,
    },
    term: {
      start,
      end,
      duration,
    },
    factory,
  };
};

export const buildConvergentCurvePoolV1Info = async (
  convergentPoolFactoryInfo: ConvergentPoolFactoryInfo,
): Promise<ConvergentCurvePoolV1Info> => {
  log("Building convergentCurvePoolV1...");
  const allCertifiedEvents = convergentPoolFactoryInfo.addresses
    .map(
      (address) => convergentPoolFactoryInfo.metadata[address].certifiedEvents,
    )
    .flat()
    .filter(({ factory }) => factory === ccPoolFactoryV1Address);

  const addresses = zx
    .address()
    .array()
    .nonempty()
    .parse(
      allCertifiedEvents.map(({ convergentCurvePool }) => convergentCurvePool),
    );

  const metadata = zx.addressRecord(elementModel.convergentCurvePoolV1).parse(
    Object.fromEntries(
      await Promise.all(
        allCertifiedEvents.map(async (event) => {
          const convergentCurvePoolV1MetadataEntry =
            await buildConvergentCurvePoolV1MetadataEntry(event);
          return [
            event.convergentCurvePool,
            convergentCurvePoolV1MetadataEntry,
          ];
        }),
      ),
    ),
  );

  log("Building convergentCurvePoolV1_1...");
  return { metadata, addresses };
};

export type ConvergentCurvePoolV1_1Info = SonraCategoryInfo<
  ElementModel,
  "convergentCurvePoolV1_1"
>;

const buildConvergentCurvePoolV1_1MetadataEntry = async (
  event: ConvergentPoolFactoryEvent,
): Promise<ConvergentCurvePoolV1_1Info["metadata"][zx.Address]> => {
  const convergentCurvePool = ConvergentCurvePool__factory.connect(
    event.convergentCurvePool,
    provider,
  );

  const [governanceFeesUnderlying, governanceFeesBond, restOfMetadata] =
    await Promise.all([
      convergentCurvePool.governanceFeesUnderlying(),
      convergentCurvePool.governanceFeesBond(),
      buildConvergentCurvePoolV1MetadataEntry(event),
    ]);

  return {
    ...restOfMetadata,
    fees: {
      ...restOfMetadata.fees,
      governanceFeesUnderlying,
      governanceFeesBond,
    },
  };
};

export const buildConvergentCurvePoolV1_1Info = async (
  convergentPoolFactoryInfo: ConvergentPoolFactoryInfo,
): Promise<ConvergentCurvePoolV1_1Info> => {
  log("Building convergentCurvePoolV1_1...");
  const allCertifiedEvents = convergentPoolFactoryInfo.addresses
    .map(
      (address) => convergentPoolFactoryInfo.metadata[address].certifiedEvents,
    )
    .flat()
    .filter(({ factory }) => factory === ccPoolFactoryV1_1Address);

  const addresses = zx
    .address()
    .array()
    .nonempty()
    .parse(
      allCertifiedEvents.map(({ convergentCurvePool }) => convergentCurvePool),
    );

  const metadata = zx.addressRecord(elementModel.convergentCurvePoolV1_1).parse(
    Object.fromEntries(
      await Promise.all(
        allCertifiedEvents.map(async (event) => {
          const convergentCurvePoolV1_1MetadataEntry =
            await buildConvergentCurvePoolV1_1MetadataEntry(event);
          return [
            event.convergentCurvePool,
            convergentCurvePoolV1_1MetadataEntry,
          ];
        }),
      ),
    ),
  );

  log("Finished building convergentCurvePoolV1_1...");
  return { metadata, addresses };
};
