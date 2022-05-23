import { Signer } from "ethers";
import { parseEther } from "ethers/lib/utils";

import { ConvergentPoolFactory__factory } from "src/types/factories/ConvergentPoolFactory__factory";
import { ConvergentPoolFactory, Vault } from "src/types";

export async function deployConvergentPoolFactory(
  signer: Signer,
  balancerVaultContract: Vault,
): Promise<ConvergentPoolFactory> {
  const signerAddress = await signer.getAddress();
  const convergentPoolFactoryDeployer = new ConvergentPoolFactory__factory(
    signer,
  );
  const convergentPoolFactoryContract =
    await convergentPoolFactoryDeployer.deploy(
      balancerVaultContract.address,
      signerAddress,
    );
  await convergentPoolFactoryContract.deployed();

  // set the fee to 0.1%
  const setFeeTx = await convergentPoolFactoryContract.setGovFee(
    parseEther("0.01"),
  );
  await setFeeTx.wait(1);

  return convergentPoolFactoryContract;
}
