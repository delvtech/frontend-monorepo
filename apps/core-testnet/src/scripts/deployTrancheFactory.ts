import { Signer } from "ethers";
import { TrancheFactory } from "src/types";

import { TrancheFactory__factory } from "src/types/factories/TrancheFactory__factory";
import { InterestTokenFactory } from "src/types/InterestTokenFactory";
import { TestDate } from "src/types/TestDate";

export async function deployTrancheFactory(
  signer: Signer,
  interestTokenFactoryContract: InterestTokenFactory,
  dateLibraryContract: TestDate,
): Promise<TrancheFactory> {
  const interestTokenFactoryAddress = interestTokenFactoryContract.address;
  const dateLibraryAddress = dateLibraryContract.address;
  const trancheFactoryDeployer = new TrancheFactory__factory(signer);
  const trancheFactoryContract = await trancheFactoryDeployer.deploy(
    interestTokenFactoryAddress,
    dateLibraryAddress,
  );

  await trancheFactoryContract.deployed();

  return trancheFactoryContract;
}
