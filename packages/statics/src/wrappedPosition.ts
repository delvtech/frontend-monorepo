import { SonraCategoryInfo, zx } from "sonra";
import { elementModel, ElementModel } from ".";
import { WrappedPosition__factory } from "../typechain";
import { PrincipalTokenInfo } from "./principalToken";
import { provider } from "./provider";
import { log } from "./utils";

export type WrappedPositionInfo = SonraCategoryInfo<
  ElementModel,
  "wrappedPosition"
>;
const buildWrappedPositionMetadataEntry = async (
  address: zx.Address,
  tranches: zx.CategorisedAddress<"principalToken">[],
): Promise<WrappedPositionInfo["metadata"][zx.Address]> => {
  const wrappedPosition = WrappedPosition__factory.connect(address, provider);

  const [name, symbol, decimals, token] = await Promise.all([
    wrappedPosition.name(),
    wrappedPosition.symbol(),
    wrappedPosition.decimals(),
    wrappedPosition.token().then(zx.address().parse),
  ]);

  return { name, symbol, decimals, token, tranches };
};

export const buildWrappedPositionInfo = async (
  principalTokenInfo: PrincipalTokenInfo,
): Promise<WrappedPositionInfo> => {
  log("Building wrappedPosition...");
  const principalTokenAddressesByPosition: Record<
    zx.Address,
    zx.CategorisedAddress<"principalToken">[]
  > = {};

  for (const [principalTokenAddress, { position }] of Object.entries(
    principalTokenInfo.metadata,
  )) {
    const wpAddress = zx.address().conform().parse(position);
    if (!Array.isArray(principalTokenAddressesByPosition[wpAddress])) {
      principalTokenAddressesByPosition[wpAddress] = [];
    }

    principalTokenAddressesByPosition[wpAddress] = [
      ...principalTokenAddressesByPosition[wpAddress],
      zx
        .address()
        .category("principalToken")
        .conform()
        .parse(principalTokenAddress),
    ];
  }

  const addresses = zx
    .address()
    .conform()
    .array()
    .nonempty()
    .parse(Object.keys(principalTokenAddressesByPosition));

  const metadata = zx.addressRecord(elementModel.wrappedPosition).parse(
    Object.fromEntries(
      await Promise.all(
        addresses.map(async (address) => {
          const wrappedPositionMetadataEntry =
            await buildWrappedPositionMetadataEntry(
              address,
              principalTokenAddressesByPosition[address],
            );
          return [address, wrappedPositionMetadataEntry];
        }),
      ),
    ),
  );

  log("Finished building wrappedPosition...");
  return { metadata, addresses };
};
