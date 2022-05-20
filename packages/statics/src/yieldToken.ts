import { SonraCategoryInfo, zx } from "sonra";
import { elementModel, ElementModel } from ".";
import { InterestToken__factory } from "../typechain";
import { PrincipalTokenInfo } from "./principalToken";
import { provider } from "./provider";
import { log } from "./utils";

export type YieldTokenInfo = SonraCategoryInfo<ElementModel, "yieldToken">;

const buildYieldTokenMetadataEntry = async (
  address: zx.Address,
  tranche: zx.CategorisedAddress<"principalToken">,
): Promise<YieldTokenInfo["metadata"][zx.Address]> => {
  const yieldToken = InterestToken__factory.connect(address, provider);
  const [name, symbol, decimals] = await Promise.all([
    yieldToken.name(),
    yieldToken.symbol(),
    yieldToken.decimals(),
  ]);

  return { name, symbol, decimals, tranche };
};

export const buildYieldTokenInfo = async (
  principalTokenInfo: PrincipalTokenInfo,
): Promise<YieldTokenInfo> => {
  log("Building yieldToken...");

  const principalTokenAddressByYieldTokenAddress = Object.fromEntries(
    principalTokenInfo.addresses.map((principalTokenAddress) => {
      const yieldTokenAddress = zx
        .address()
        .conform()
        .parse(
          principalTokenInfo.metadata[principalTokenAddress].interestToken,
        );
      return [
        yieldTokenAddress,
        zx
          .address()
          .category("principalToken")
          .conform()
          .parse(principalTokenAddress),
      ];
    }),
  ) as Record<zx.Address, zx.CategorisedAddress<"principalToken">>;

  const addresses = zx
    .address()
    .array()
    .nonempty()
    .parse(Object.keys(principalTokenAddressByYieldTokenAddress));

  const metadata = zx.addressRecord(elementModel.yieldToken).parse(
    Object.fromEntries(
      await Promise.all(
        addresses.map(async (address) => {
          const yieldTokenMetadataEntry = await buildYieldTokenMetadataEntry(
            address,
            principalTokenAddressByYieldTokenAddress[address],
          );
          return [address, yieldTokenMetadataEntry];
        }),
      ),
    ),
  );

  log("Finished building yieldToken...");
  return { metadata, addresses };
};
