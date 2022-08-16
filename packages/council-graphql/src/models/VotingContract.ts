import { CouncilContext } from "src/context";
import { VotingContract } from "src/generated";
import { getVotingContractDataSourceByAddress } from "src/utils/getDataSourceByAddress";

interface VotingContractModel {
  getAll: (options: {
    context: CouncilContext;
  }) => (VotingContract | undefined)[];
  getByAddress: (options: {
    address: string;
    context: CouncilContext;
  }) => VotingContract | undefined;
}

export const VotingContractModel: VotingContractModel = {
  getAll({ context }) {
    return context.councilDataSources.votingContracts.map(({ address }) =>
      this.getByAddress({ address, context }),
    );
  },
  getByAddress({ address, context }) {
    const dataSource = getVotingContractDataSourceByAddress(
      address,
      context.councilDataSources,
    );
    if (dataSource) {
      return {
        address: dataSource.address,
        votingVaults: dataSource.votingVaults.map(({ address }) => ({
          address,
        })),
      };
    }
  },
};
