import { CouncilContext } from "src/logic/context";

export function getVotingVaultDataSourceByAddress(
  address: string,
  dataSources: CouncilContext["councilDataSources"]
) {
  return dataSources.votingVaults.find(
    (votingVault) => votingVault.address === address
  );
}

export function getVotingContractDataSourceByAddress(
  address: string,
  dataSources: CouncilContext["councilDataSources"]
) {
  return dataSources.votingContracts.find(
    (votingContract) => votingContract.address === address
  );
}
