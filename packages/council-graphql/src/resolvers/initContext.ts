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
export async function initContext(
  context: ResolverContext,
): Promise<CouncilContext> {
  const { addresses, chainId, dataSources, provider } = context;
  const councilAddresses = getAddresses(chainId);
  const lockingVault = new LockingVaultContract(
    addresses.lockingVault,
    provider,
  );
  const vestingVault = new VestingVaultContract(
    addresses.vestingVault,
    provider,
  );
  const gscVault = new GSCVaultContract(addresses.gscVault, provider);
  return {
    ...context,
    addresses: {
      ...addresses,
      ...councilAddresses,
    },
    dataSources: {
      ...dataSources,
      coreVoting: new CoreVotingContract(addresses.coreVoting, provider, [
        lockingVault,
        vestingVault,
      ]),
      gscVoting: new CoreVotingContract(addresses.gscCoreVoting, provider, [
        gscVault,
      ]),
      lockingVault,
      vestingVault,
      gscVault,
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
