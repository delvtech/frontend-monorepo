import { ResolverContext } from "@elementfi/graphql";
import { CoreVotingContract } from "src/datasources/CoreVotingContract";
import { VotingVaultContract } from "src/datasources/VotingVaultContract";

export type CouncilContext = ResolverContext<{
  councilAddresses: Record<string, string>;
  councilDataSources: {
    votingContracts: CoreVotingContract[];
    votingVaults: VotingVaultContract[];
    // coreVoting: CoreVotingContract;
    // gscVoting: CoreVotingContract;
    // lockingVault: LockingVaultContract;
    // vestingVault: VestingVaultContract;
    // gscVault: GSCVaultContract;
  };
}>;
