import { ResolverContext } from "@elementfi/graphql";
import { CoreVotingContract } from "src/datasources/CoreVotingContract";
import { GSCVaultContract } from "src/datasources/GSCVaultContract";
import { LockingVaultContract } from "src/datasources/LockingVaultContract";
import { VestingVaultContract } from "src/datasources/VestingVaultContract";

export type CouncilContext = ResolverContext<{
  addresses: Record<string, string>;
  dataSources: {
    coreVoting: CoreVotingContract;
    gscVoting: CoreVotingContract;
    lockingVault: LockingVaultContract;
    vestingVault: VestingVaultContract;
    gscVault: GSCVaultContract;
  };
}>;
