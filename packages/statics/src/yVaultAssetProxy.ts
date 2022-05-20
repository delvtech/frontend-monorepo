import { YVaultAssetProxy__factory } from "../typechain";
import { SonraCategoryInfo, zx } from "sonra";
import { ElementModel } from ".";
import { provider } from "./provider";
import { WrappedPositionInfo } from "./wrappedPosition";
import { log } from "./utils";

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
  const metadata: YVaultAssetProxyInfo["metadata"] = {};

  for (const address of addresses) {
    const yVaultAssetProxy = YVaultAssetProxy__factory.connect(
      address,
      provider,
    );
    const vault = await yVaultAssetProxy
      .vault()
      .then(zx.address().category("yearnVault").conform().parse);
    metadata[address] = { vault };
  }

  log("Finished building yVaultAssetProxy...");
  return { metadata, addresses };
};
