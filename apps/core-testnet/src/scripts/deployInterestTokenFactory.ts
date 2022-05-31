import { Signer } from "ethers";

import { InterestTokenFactory__factory } from "src/types/factories/InterestTokenFactory__factory";
import { InterestTokenFactory } from "src/types";

export async function deployInterestTokenFactory(
  signer: Signer,
): Promise<InterestTokenFactory> {
  const tokenFactoryDeployer = new InterestTokenFactory__factory(signer);
  const tokenFactoryContract = await tokenFactoryDeployer.deploy();
  await tokenFactoryContract.deployed();

  return tokenFactoryContract;
}
