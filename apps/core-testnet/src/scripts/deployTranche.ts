import { Signer } from "ethers";
import { getTerms } from "src/helpers/getTerms";
import { Tranche__factory } from "src/types/factories/Tranche__factory";
import { Tranche } from "src/types/Tranche";
import { TrancheFactory } from "src/types/TrancheFactory";
import { YVaultAssetProxy } from "src/types/YVaultAssetProxy";

export async function deployTranche(
  signer: Signer,
  trancheFactoryContract: TrancheFactory,
  yearnVaultAssetProxy: YVaultAssetProxy,
  expirationTimeInUnixSeconds: number,
): Promise<Tranche> {
  const txReceipt = await trancheFactoryContract.deployTranche(
    expirationTimeInUnixSeconds,
    yearnVaultAssetProxy.address,
  );
  await txReceipt.wait(1);

  const trancheAddresses = await getTerms(
    trancheFactoryContract.address,
    yearnVaultAssetProxy.address,
    signer,
  );

  const lastTrancheDeployed = trancheAddresses[trancheAddresses.length - 1];
  const trancheContract = Tranche__factory.connect(lastTrancheDeployed, signer);
  return trancheContract;
}
