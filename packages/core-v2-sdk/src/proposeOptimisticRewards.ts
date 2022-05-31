import { OptimisticRewards__factory } from "elf-council-typechain";
import { ContractTransaction, Signer } from "ethers";

export async function proposeOptimisticRewards(
  contractAddress: string,
  merkleRoot: string,
  // TODO: use this once we have baseUrl as a part of optimisitic rewards
  baseUrl: string,
  signer: Signer,
): Promise<ContractTransaction> {
  const optimisticRewards = OptimisticRewards__factory.connect(
    contractAddress,
    signer,
  );

  return optimisticRewards.proposeRewards(merkleRoot);
}
