import { SonraCategoryInfo, zx } from "sonra";
import { ElementModel } from ".";
import {
  ConvergentCurvePoolV1__factory,
  ConvergentCurvePool__factory
} from "../typechain";
import {
  ccPoolFactoryV1Address,
  ccPoolFactoryV1_1Address
} from "./constants";
import { provider } from "./provider";
import {
  ConvergentCurvePoolCreatedEvent
} from "./trancheAndPool";

export type ConvergentCurvePoolV1Info = SonraCategoryInfo<
  ElementModel,
  "convergentCurvePoolV1"
>;

export type ConvergentCurvePoolV1_1Info = SonraCategoryInfo<
  ElementModel,
  "convergentCurvePoolV1_1"
>;

export const buildConvergentCurvePoolV1Info = async (
  convergentCurvePoolCreatedEvents: ConvergentCurvePoolCreatedEvent[],
): Promise<ConvergentCurvePoolV1Info> => {
  const convergentCurvePoolV1CreatedEvents =
    convergentCurvePoolCreatedEvents.filter(
      ({ factory }) => factory === ccPoolFactoryV1Address,
    );

  const addresses = zx
    .address()
    .array()
    .nonempty()
    .parse(
      convergentCurvePoolV1CreatedEvents.map(
        ({ convergentCurvePoolAddress }) => convergentCurvePoolAddress,
      ),
    );

  const metadata: ConvergentCurvePoolV1Info["metadata"] = {};

  for (const {
    convergentCurvePoolAddress: address,
    bond,
    factory,
    blockTimestamp: start,
  } of convergentCurvePoolV1CreatedEvents) {
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

    metadata[address] = {
      poolId,
      bond,
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
      factory: zx
        .address()
        .category("convergentCurvePoolFactoryV1")
        .conform()
        .parse(factory),
    };
  }

  return { metadata, addresses };
};

export const buildConvergentCurvePoolV1_1Info = async (
  convergentCurvePoolCreatedEvents: ConvergentCurvePoolCreatedEvent[],
): Promise<ConvergentCurvePoolV1_1Info> => {
  const convergentCurvePoolV1CreatedEvents =
    convergentCurvePoolCreatedEvents.filter(
      ({ factory }) => factory === ccPoolFactoryV1_1Address,
    );

  const addresses = zx
    .address()
    .array()
    .nonempty()
    .parse(
      convergentCurvePoolV1CreatedEvents.map(
        ({ convergentCurvePoolAddress }) => convergentCurvePoolAddress,
      ),
    );

  const metadata: ConvergentCurvePoolV1_1Info["metadata"] = {};

  for (const {
    convergentCurvePoolAddress: address,
    bond,
    factory,
    blockTimestamp: start,
  } of convergentCurvePoolV1CreatedEvents) {
    const convergentCurvePool = ConvergentCurvePool__factory.connect(
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
      governanceFeesUnderlying,
      governanceFeesBond,
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
      convergentCurvePool.governanceFeesUnderlying(),
      convergentCurvePool.governanceFeesBond(),
    ]);

    const duration = (end.getTime() - start.getTime()) / 1000;

    metadata[address] = {
      poolId,
      bond,
      underlying,
      governance,
      fees: {
        feesUnderlying,
        feesBond,
        percentFee,
        percentFeeGov,
        governanceFeesBond,
        governanceFeesUnderlying,
      },
      term: {
        start,
        end,
        duration,
      },
      factory: zx
        .address()
        .category("convergentCurvePoolFactoryV1_1")
        .conform()
        .parse(factory),
    };
  }

  return { metadata, addresses };
};
