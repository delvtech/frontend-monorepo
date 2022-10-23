import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { CoreVoting, CoreVoting__factory } from "@elementfi/council-typechain";
import { BigNumberish } from "ethers";
import { parseEther } from "ethers/lib/utils";
import { HardhatRuntimeEnvironment } from "hardhat/types";

import { syncContractWithEthernal } from "src/ethernal/syncContractWithEthernal";

export async function deployCoreVoting(
  hre: HardhatRuntimeEnvironment,
  signer: SignerWithAddress,
  votingVaultAddresses: string[],
  timeLockAddress: string,
  baseQuorum: string,
  minProposalPower: string,
  gscVaultAddress: string,
  // can start executing after 10 blocks
  lockDuration: BigNumberish = "10",
  // can vote for 15 blocks
  extraVotingTime: BigNumberish = "150",
): Promise<CoreVoting> {
  const coreVotingDeployer = new CoreVoting__factory(signer);
  const coreVotingContract = await coreVotingDeployer.deploy(
    timeLockAddress,
    parseEther(baseQuorum),
    parseEther(minProposalPower),
    gscVaultAddress,
    votingVaultAddresses,
  );

  await syncContractWithEthernal(hre, "CoreVoting", coreVotingContract.address);

  (await coreVotingContract.setLockDuration(lockDuration)).wait(1);
  (await coreVotingContract.changeExtraVotingTime(extraVotingTime)).wait(1);

  return coreVotingContract;
}
