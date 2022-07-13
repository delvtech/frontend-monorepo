import { AddressesJsonFile } from "@elementfi/council-tokenlist";
import { ResolverContext } from "@elementfi/graphql";
import { CoreVotingContract } from "src/datasources/CoreVotingContract";
import { GSCVaultContract } from "src/datasources/GSCVaultContract";
import { LockingVaultContract } from "src/datasources/LockingVaultContract";
import { VestingVaultContract } from "src/datasources/VestingVaultContract";
import { CouncilContext } from "src/logic/context";
import {
  goerliAddressList,
  mainnetAddressList,
  testnetAddressList,
  waffleAddressList,
} from "src/addressLists";

// TODO: What's the right way to prevent collisions with other packages.
// Namespace?
export async function initContext({
  chainId,
  provider,
}: ResolverContext): Promise<CouncilContext> {
  const councilAddresses = getAddresses(chainId);
  const lockingVault = new LockingVaultContract(
    councilAddresses.lockingVault,
    provider,
  );
  const vestingVault = new VestingVaultContract(
    councilAddresses.vestingVault,
    provider,
  );
  const gscVault = new GSCVaultContract(councilAddresses.gscVault, provider);
  const coreVoting = new CoreVotingContract(
    councilAddresses.coreVoting,
    provider,
    [lockingVault, vestingVault],
  );
  const gscCoreVoting = new CoreVotingContract(
    councilAddresses.gscCoreVoting,
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

export function getAddresses(chainId: number): AddressesJsonFile["addresses"] {
  switch (chainId) {
    case mainnetAddressList.chainId:
      return mainnetAddressList.addresses;
    case goerliAddressList.chainId:
      return goerliAddressList.addresses;
    default:
      // TODO: When and how should mainnetForkAddressList be used?
      return process.env.NODE_ENV === "test"
        ? waffleAddressList.addresses
        : testnetAddressList.addresses;
  }
}
