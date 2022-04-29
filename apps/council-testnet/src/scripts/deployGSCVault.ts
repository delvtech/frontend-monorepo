import { GSCVault, GSCVault__factory } from "@elementfi/elf-council-typechain";
import { Signer } from "ethers";
import { parseEther } from "ethers/lib/utils";
import { HardhatRuntimeEnvironment } from "hardhat/types";

import { syncContractWithEthernal } from "src/ethernal/syncContractWithEthernal";

export async function deployGSCVault(
  hre: HardhatRuntimeEnvironment,
  signer: Signer,
  coreVotingAddress: string,
  votingPowerBound: string,
  governanceOwnerAddress: string,
): Promise<GSCVault> {
  const GSCDeployer = new GSCVault__factory(signer);
  const GSCContract = await GSCDeployer.deploy(
    coreVotingAddress,
    parseEther(votingPowerBound),
    governanceOwnerAddress,
  );

  await syncContractWithEthernal(hre, "GSCVault", GSCContract.address);

  return GSCContract;
}
