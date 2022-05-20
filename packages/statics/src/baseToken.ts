import uniq from "lodash.uniq";
import { SonraCategoryInfo, zx } from "sonra";
import { elementModel, ElementModel } from ".";
import { ERC20__factory } from "../typechain";
import { PrincipalTokenInfo } from "./principalToken";
import { provider } from "./provider";
import { log } from "./utils";

type BaseTokenInfo = SonraCategoryInfo<ElementModel, "baseToken">;

const buildBaseTokenMetadataEntry = async (
  address: zx.Address,
  tranches: zx.CategorisedAddress<"principalToken">[],
): Promise<BaseTokenInfo["metadata"][zx.Address]> => {
  const baseToken = ERC20__factory.connect(address, provider);

  const [name, symbol, decimals, totalSupply] = await Promise.all([
    baseToken.name(),
    baseToken.symbol(),
    baseToken.decimals(),
    baseToken.totalSupply(),
  ]);

  return { name, symbol, decimals, totalSupply, tranches };
};

export const buildBaseTokenInfo = async (
  principalTokenInfo: PrincipalTokenInfo,
): Promise<BaseTokenInfo> => {
  log("Building baseToken...");

  const principalTokenAddressesByUnderlying: Record<
    zx.Address,
    zx.CategorisedAddress<"principalToken">[]
  > = {};

  for (const [principalTokenAddress, { underlying }] of Object.entries(
    principalTokenInfo.metadata,
  )) {
    const address = zx.address().conform().parse(underlying);
    if (!Array.isArray(principalTokenAddressesByUnderlying[address])) {
      principalTokenAddressesByUnderlying[address] = [];
    }

    principalTokenAddressesByUnderlying[address] = [
      ...principalTokenAddressesByUnderlying[address],
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
    .parse(Object.keys(principalTokenAddressesByUnderlying));

  const metadata = zx.addressRecord(elementModel.baseToken).parse(
    Object.fromEntries(
      await Promise.all(
        addresses.map(async (address) => {
          const baseTokenMetadataEntry = await buildBaseTokenMetadataEntry(
            address,
            principalTokenAddressesByUnderlying[address],
          );
          return [address, baseTokenMetadataEntry];
        }),
      ),
    ),
  );

  log("Finished building baseToken...");
  return { metadata, addresses };
};
