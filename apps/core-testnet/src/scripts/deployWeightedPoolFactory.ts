import { Signer } from "ethers";
import { WeightedPoolFactory } from "src/types";

import { WeightedPoolFactory__factory } from "src/types/factories/WeightedPoolFactory__factory";
import { Vault } from "src/types/Vault";

export async function deployWeightedPoolFactory(
  signer: Signer,
  balancerVaultContract: Vault,
): Promise<WeightedPoolFactory> {
  const signerAddress = await signer.getAddress();
  const balancerVaultAddress = balancerVaultContract.address;
  const deployer = new WeightedPoolFactory__factory(signer);
  const weightedPoolFactoryContract = await deployer.deploy(
    balancerVaultAddress,
  );

  await weightedPoolFactoryContract.deployed();
  await balancerVaultContract.setRelayerApproval(
    signerAddress,
    weightedPoolFactoryContract.address,
    true,
  );

  return weightedPoolFactoryContract;
}
