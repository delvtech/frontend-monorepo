import { Voter, VotingVault } from "src/generated";
import { CouncilContext } from "src/logic/context";
import { getVotingVaultDataSourceByAddress } from "src/logic/utils/getDataSourceByAddress";
import { VotingVaultModel } from "./VotingVault";

interface VoterModel {
  getAll: (options: { context: CouncilContext }) => Promise<Voter[]>;
  getByAddress: (options: { address: string }) => Voter;
  getByAddresses: (options: { addresses: string[] }) => Voter[];
  getByVotingVault: (options: {
    votingVault: VotingVault;
    blockNumber?: number;
    context: CouncilContext;
  }) => Promise<Voter[]>;
  getByVotingVaults: (options: {
    votingVaults: VotingVault[];
    blockNumber?: number;
    context: CouncilContext;
  }) => Promise<Voter[]>;
}

export const VoterModel: VoterModel = {
  getAll({ context }) {
    const votingVaults = VotingVaultModel.getAll({ context });
    return this.getByVotingVaults({ votingVaults, context });
  },
  getByAddress({ address }) {
    return { address };
  },
  getByAddresses({ addresses }) {
    return addresses.map((address) => this.getByAddress({ address }));
  },
  getByVotingVault({ votingVault, blockNumber, context }) {
    return this.getByVotingVaults({
      votingVaults: [votingVault],
      blockNumber,
      context,
    });
  },
  async getByVotingVaults({
    votingVaults,
    blockNumber,
    context: { councilDataSources },
  }) {
    const addresses = new Set<string>();

    for (const votingVault of votingVaults) {
      const dataSource = getVotingVaultDataSourceByAddress(
        votingVault.address,
        councilDataSources,
      );
      if (dataSource) {
        const allVotersWithPower = await dataSource.getAllVotersWithPower(
          undefined,
          blockNumber,
        );
        for (const { voter } of allVotersWithPower) {
          addresses.add(voter);
        }
      }
    }

    return this.getByAddresses({ addresses: Array.from(addresses) });
  },
};
