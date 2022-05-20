import uniq from "lodash.uniq";
import { SonraCategoryInfo, zx } from "sonra";
import { elementModel, ElementModel } from ".";
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

  const metadata = zx.addressRecord(elementModel.yearnVault).parse(
    Object.fromEntries(
      await Promise.all(
        addresses.map(async (address) => {
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

          return [
            address,
            {
              name,
              symbol,
              decimals,
              totalSupply,
              totalAssets,
              pricePerShare,
              governance,
              apiVersion,
            },
          ];
        }),
      ),
    ),
  );

  log("Finished building yearnVault...");
  return { metadata, addresses };
};
