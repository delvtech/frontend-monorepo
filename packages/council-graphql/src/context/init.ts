import { ResolverContext } from "@elementfi/graphql";
import { getAddressList } from "src/addressLists";
import { CouncilContext } from "src/context";
import { CoreVotingContract } from "src/datasources/CoreVotingContract";
import { GSCVaultContract } from "src/datasources/GSCVaultContract";
import { LockingVaultContract } from "src/datasources/LockingVaultContract";
import { VestingVaultContract } from "src/datasources/VestingVaultContract";

// TODO: What's the right way to prevent collisions with other packages.
// Namespace?
export async function initContext({
  chainId,
  provider,
}: ResolverContext): Promise<CouncilContext> {
  const { addresses } = getAddressList(chainId);
  const lockingVault = new LockingVaultContract(
    addresses.lockingVault,
    provider,
  );
  const vestingVault = new VestingVaultContract(
    addresses.vestingVault,
    provider,
  );
  const gscVault = new GSCVaultContract(addresses.gscVault, provider);
  const coreVoting = new CoreVotingContract(addresses.coreVoting, provider, [
    lockingVault,
    vestingVault,
  ]);
  const gscCoreVoting = new CoreVotingContract(
    addresses.gscCoreVoting,
    provider,
    [gscVault],
  );
  return {
    chainId,
    provider,
    councilDataSources: {
      votingContracts: [coreVoting, gscCoreVoting],
      votingVaults: [lockingVault, vestingVault, gscVault],
    },
  };
}
