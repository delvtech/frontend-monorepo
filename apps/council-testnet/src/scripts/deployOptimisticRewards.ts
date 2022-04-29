import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import {
  OptimisticRewards,
  OptimisticRewards__factory,
} from "@elementfi/elf-council-typechain";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import MerkleTree from "merkletreejs";
import { syncContractWithEthernal } from "src/ethernal/syncContractWithEthernal";

export async function deployOptimisticRewards(
  hre: HardhatRuntimeEnvironment,
  signer: SignerWithAddress,
  elementTokenAddress: string,
  coreVotingAddress: string,
  merkleTree: MerkleTree,
  lockingVaultAddress: string,
): Promise<OptimisticRewards> {
  const rewardsDeployer = new OptimisticRewards__factory(signer);
  const rewardsContract = await rewardsDeployer.deploy(
    coreVotingAddress,
    merkleTree.getHexRoot(),
    signer.address,
    signer.address,
    elementTokenAddress,
    lockingVaultAddress,
  );

  await syncContractWithEthernal(
    hre,
    "OptimisticRewards",
    rewardsContract.address,
  );

  return rewardsContract;
}
