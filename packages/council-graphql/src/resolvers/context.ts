import { ResolverContext } from "@elementfi/graphql";
import AmazonS3API from "src/datasources/AmazonS3API";
import CoreVotingContract from "src/datasources/CoreVotingContract";
import GSCVaultContract from "src/datasources/GSCVaultContract";
import LockingVaultContract from "src/datasources/LockingVaultContract";
import VestingVaultContract from "src/datasources/VestingVaultContract";
import { getAddresses } from "src/logic/addresses";

export type CouncilResolverContext = ResolverContext<{
  dataSources: {
    coreVoting: CoreVotingContract;
    gscVoting: CoreVotingContract;
    lockingVault: LockingVaultContract;
    vestingVault: VestingVaultContract;
    gscVault: GSCVaultContract;
    elementS3: AmazonS3API;
  };
}>;

export async function initContext(
  context: ResolverContext,
): Promise<CouncilResolverContext> {
  const { chainId, dataSources, provider } = context;
  const addresses = getAddresses(chainId);
  return {
    ...context,
    dataSources: {
      ...dataSources,
      coreVoting: new CoreVotingContract(addresses.coreVoting, provider),
      gscVoting: new CoreVotingContract(addresses.gscCoreVoting, provider),
      lockingVault: new LockingVaultContract(addresses.lockingVault, provider),
      vestingVault: new VestingVaultContract(addresses.vestingVault, provider),
      gscVault: new GSCVaultContract(addresses.gscVault, provider),
      elementS3: new AmazonS3API(
        "https://elementfi.s3.us-east-2.amazonaws.com/",
      ),
    },
  };
}
