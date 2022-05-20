import uniq from "lodash.uniq";
import { SonraCategoryInfo, zx } from "sonra";
import { ElementModel } from ".";
import { ERC20__factory, IYearnVault__factory } from "../typechain";
import { provider } from "./provider";
import { log } from "./utils";
import { YVaultAssetProxyInfo } from "./yVaultAssetProxy";

type YearnVaultInfo = SonraCategoryInfo<ElementModel, "yearnVault">;

export const buildYearnVaultInfo = async (
  yVaultAssetProxyInfo: YVaultAssetProxyInfo,
): Promise<YearnVaultInfo> => {
  log("Building yearnVault...");

  const addresses = zx
    .address()
    .conform()
    .array()
    .nonempty()
    .parse(
      uniq(
        Object.values(yVaultAssetProxyInfo.metadata).map(({ vault }) => vault),
      ),
    );

  const metadata: YearnVaultInfo["metadata"] = {};

  for (const address of addresses) {
    const yearnVault = IYearnVault__factory.connect(address, provider);

    const [
      name,
      symbol,
      decimals,
      totalSupply,
      totalAssets,
      pricePerShare,
      governance,
      apiVersion,
    ] = await Promise.all([
      ERC20__factory.connect(address, provider).name(),
      yearnVault.symbol(),
      yearnVault.decimals(),
      yearnVault.totalSupply(),
      yearnVault.totalAssets(),
      yearnVault.pricePerShare(),
      yearnVault.governance().then(zx.address().parse),
      yearnVault.apiVersion(),
    ]);

    metadata[address] = {
      name,
      symbol,
      decimals,
      totalSupply,
      totalAssets,
      pricePerShare,
      governance,
      apiVersion,
    };
  }

  log("Finished building yearnVault...");
  return { metadata, addresses };
};
