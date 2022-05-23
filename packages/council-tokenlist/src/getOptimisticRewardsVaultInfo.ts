import { Provider } from "@ethersproject/abstract-provider";
import { OptimisticRewards__factory } from "elf-council-typechain";
import { ethers } from "ethers";

import { OptimisticRewardsVaultInfo } from "src/types";

export async function getOptimisticRewardsVaultInfo(
  provider: Provider,
  chainId: number,
  tokenAddress: string,
  name: string,
): Promise<OptimisticRewardsVaultInfo | undefined> {
  if (!tokenAddress || tokenAddress === ethers.constants.AddressZero) {
    console.error("Invavlid Token Address for ", name, tokenAddress);
    return;
  }

  const optimisticRewardsVaultContract = OptimisticRewards__factory.connect(
    tokenAddress,
    provider,
  );

  const pendingRootPromise = optimisticRewardsVaultContract.pendingRoot();
  const proposalTimePromise = optimisticRewardsVaultContract.proposalTime();
  const proposerPromise = optimisticRewardsVaultContract.proposer();
  const challengePeriodPromise =
    optimisticRewardsVaultContract.challengePeriod();
  const rewardsRootPromise = optimisticRewardsVaultContract.rewardsRoot();
  const lockingVaultPromise = optimisticRewardsVaultContract.lockingVault();
  const tokenPromise = optimisticRewardsVaultContract.token();

  const [
    pendingRoot,
    proposalTime,
    proposer,
    challengePeriod,
    rewardsRoot,
    lockingVault,
    token,
  ] = await Promise.all([
    pendingRootPromise,
    proposalTimePromise,
    proposerPromise,
    challengePeriodPromise,
    rewardsRootPromise,
    lockingVaultPromise,
    tokenPromise,
  ]);

  return {
    chainId,
    address: tokenAddress,
    name,
    decimals: 0,
    symbol: "",
    extensions: {
      pendingRoot,
      proposalTime: proposalTime.toNumber(),
      proposer,
      challengePeriod: challengePeriod.toNumber(),
      rewardsRoot,
      lockingVault,
      token,
    },
  };
}
