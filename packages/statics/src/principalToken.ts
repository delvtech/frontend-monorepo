import { SonraCategoryInfo, zx } from "sonra";
import { elementModel, ElementModel } from ".";
import { Tranche__factory } from "../typechain";
import { ccPoolFactoryV1_1Address } from "./constants";
import { ConvergentPoolFactoryInfo } from "./convergentPoolFactory";
import { provider } from "./provider";
import { TrancheFactoryEvent, TrancheFactoryInfo } from "./trancheFactory";
import { log } from "./utils";

export type PrincipalTokenInfo = SonraCategoryInfo<
  ElementModel,
  "principalToken"
>;

const buildPrincipalTokenMetadataEntry = async (
  {
    trancheAddress: address,
    blockTimestamp: start,
    expiration: end,
    wrappedPositionAddress,
  }: TrancheFactoryEvent,
  convergentCurvePool:
    | zx.CategorisedAddress<"convergentCurvePoolV1">
    | zx.CategorisedAddress<"convergentCurvePoolV1_1">,
): Promise<PrincipalTokenInfo["metadata"][zx.Address]> => {
  const principalToken = Tranche__factory.connect(address, provider);
  const [name, symbol, decimals, underlying, interestToken] = await Promise.all(
    [
      principalToken.name(),
      principalToken.symbol(),
      principalToken.decimals(),
      principalToken
        .underlying()
        .then(zx.address().category("baseToken").conform().parse),
      principalToken
        .interestToken()
        .then(zx.address().category("yieldToken").conform().parse),
    ],
  );

  const duration = (end.getTime() - start.getTime()) / 1000;

  const position = zx
    .address()
    .category("wrappedPosition")
    .conform()
    .parse(wrappedPositionAddress);
  return {
    name,
    symbol,
    decimals,
    underlying,
    term: {
      start,
      end,
      duration,
    },
    interestToken,
    position,
    convergentCurvePool,
  };
};

export const buildPrincipalTokenInfo = async (
  trancheFactoryInfo: TrancheFactoryInfo,
  convergentPoolFactoryInfo: ConvergentPoolFactoryInfo,
): Promise<PrincipalTokenInfo> => {
  log("Building principalToken...");
  const ccPoolAddressByTrancheAddress = Object.fromEntries(
    convergentPoolFactoryInfo.addresses
      .map(
        (address) =>
          convergentPoolFactoryInfo.metadata[address].certifiedEvents,
      )
      .flat()
      .map(({ convergentCurvePool, bond, factory }) => {
        const pool = zx
          .address()
          .category(
            factory === ccPoolFactoryV1_1Address
              ? "convergentCurvePoolV1_1"
              : "convergentCurvePoolV1",
          )
          .conform()
          .parse(convergentCurvePool);

        return [bond, pool];
      }),
  ) as Record<
    zx.Address,
    | zx.CategorisedAddress<"convergentCurvePoolV1_1">
    | zx.CategorisedAddress<"convergentCurvePoolV1">
  >;

  const allCertifiedEvents =
    trancheFactoryInfo.metadata[trancheFactoryInfo.addresses[0]]
      .certifiedEvents;

  const addresses = zx
    .address()
    .array()
    .nonempty()
    .parse(allCertifiedEvents.map(({ trancheAddress }) => trancheAddress));

  const metadata = zx.addressRecord(elementModel.principalToken).parse(
    Object.fromEntries(
      await Promise.all(
        allCertifiedEvents.map(async (event) => {
          const principalTokenMetadataEntry =
            await buildPrincipalTokenMetadataEntry(event, ccPoolAddressByTrancheAddress[event.trancheAddress]);
          return [event.trancheAddress, principalTokenMetadataEntry];
        }),
      ),
    ),
  );

  log("Finished building principalToken...");
  return { addresses, metadata };
};
