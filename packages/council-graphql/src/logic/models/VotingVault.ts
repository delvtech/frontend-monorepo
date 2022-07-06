import { VotingVaultContract } from "src/datasources/VotingVaultContract";
import { VotingVault } from "src/generated";
import { CouncilContext } from "../context";

interface VotingVaultModel {
  getAll: (options: {
    context: CouncilContext;
  }) => (VotingVault | undefined)[];
  getByAddress: (options: {
    address: string;
    context: CouncilContext;
  }) => VotingVault | undefined;

  getByAddresses: (options: {
    addresses: string[];
    context: CouncilContext;
  }) => (VotingVault | undefined)[];
}

export const VotingVaultModel: VotingVaultModel = {
  getAll({ context }) {
    return context.councilDataSources.votingVaults.map(({ address }) =>
      this.getByAddress({ address, context })
    );
  },
  getByAddress({ address }) {
    return { address };
  },
  getByAddresses({ addresses }): VotingVault[] {
    return addresses.map((address) => ({
      address,
    }));
  },
};
