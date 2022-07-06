import { CoreVotingContract } from "src/datasources/CoreVotingContract";
import { VotingContract } from "src/generated";
import { CouncilContext } from "src/logic/context";
import { getDataSourceByAddress } from "src/logic/utils/getDataSourceByAddress";

interface VotingContractModel {
  getByAddress: (options: {
    address: string;
    context: CouncilContext;
  }) => VotingContract | undefined;
}

export const VotingContractModel: VotingContractModel = {
  getByAddress({ address, context }) {
    const dataSource = getDataSourceByAddress(address, context.dataSources);
    if (dataSource instanceof CoreVotingContract) {
      return {
        address: dataSource.address,
        votingVaults: dataSource.votingVaults.map(({ address }) => ({
          address,
        })),
      };
    }
  },
};
