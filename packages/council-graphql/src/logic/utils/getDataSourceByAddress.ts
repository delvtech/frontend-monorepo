import type { CoreVotingContract } from "src/datasources/CoreVotingContract";
import type { VotingVaultDataSource } from "src/datasources/VotingVaultDataSource";
import { CouncilContext } from "src/logic/context";

export function getVotingVaultDataSourceByAddress(
  address: string,
  dataSources: CouncilContext["councilDataSources"],
): VotingVaultDataSource | undefined {
  return dataSources.votingVaults.find(
    (votingVault) => votingVault.address === address,
  );
}

export function getVotingContractDataSourceByAddress(
  address: string,
  dataSources: CouncilContext["councilDataSources"],
): CoreVotingContract | undefined {
  return dataSources.votingContracts.find(
    (votingContract) => votingContract.address === address,
  );
}
