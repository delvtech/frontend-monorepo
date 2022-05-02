import { Timelock, Timelock__factory } from "@elementfi/elf-council-typechain";
import { BigNumberish, Signer } from "ethers";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { syncContractWithEthernal } from "src/ethernal/syncContractWithEthernal";

export async function deployTimelock(
  hre: HardhatRuntimeEnvironment,
  signer: Signer,
  waitTime: BigNumberish,
  governanceAddress: string,
  gscVaultAddress: string,
): Promise<Timelock> {
  const timeLockDeployer = new Timelock__factory(signer);
  const timeLockContract = await timeLockDeployer.deploy(
    waitTime,
    governanceAddress,
    gscVaultAddress,
  );

  await syncContractWithEthernal(hre, "Timelock", timeLockContract.address);

  return timeLockContract;
}
