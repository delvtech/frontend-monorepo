import { SonraCategoryInfo, zx } from "sonra";
import { elementModel, ElementModel } from ".";
import { YVaultAssetProxy__factory } from "../typechain";
import { provider } from "./provider";
import { log } from "./utils";
import { WrappedPositionInfo } from "./wrappedPosition";

export type YVaultAssetProxyInfo = SonraCategoryInfo<
  ElementModel,
  "yVaultAssetProxy"
>;

export const buildYVaultAssetProxyInfo = async (
  wrappedPositionInfo: WrappedPositionInfo,
): Promise<YVaultAssetProxyInfo> => {
  log("Building yVaultAssetProxy...");
  // currently all wrapped positions are yearn based so these are 1:1 for now
  const addresses = wrappedPositionInfo.addresses;

  const metadata = zx.addressRecord(elementModel.yVaultAssetProxy).parse(
    Object.fromEntries(
      await Promise.all(
        addresses.map(async (address) => {
          const yVaultAssetProxy = YVaultAssetProxy__factory.connect(
            address,
            provider,
          );
          const vault = await yVaultAssetProxy
            .vault()
            .then(zx.address().category("yearnVault").conform().parse);
          return [address, { vault }];
        }),
      ),
    ),
  );

  log("Finished building yVaultAssetProxy...");
  return { metadata, addresses };
};
