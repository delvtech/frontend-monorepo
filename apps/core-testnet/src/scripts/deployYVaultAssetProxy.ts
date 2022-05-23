import { Signer } from "ethers";
import { YVaultAssetProxy } from "src/types";

import { YVaultAssetProxy__factory } from "src/types/factories/YVaultAssetProxy__factory";

export async function deployYearnVaultAssetProxy(
  signer: Signer,
  yearnVaultAddress: string,
  baseAssetAddress: string,
  name: string,
  symbol: string,
): Promise<YVaultAssetProxy> {
  const deployer = new YVaultAssetProxy__factory(signer);
  return await deployer.deploy(
    yearnVaultAddress,
    baseAssetAddress,
    name,
    symbol,
  );
}
