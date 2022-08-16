import { CouncilContext } from "src/context";
import { VotingVault } from "src/generated";

interface VotingVaultModel {
  getAll: (options: { context: CouncilContext }) => VotingVault[];
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
    return context.councilDataSources.votingVaults.map(
      ({ address }) => this.getByAddress({ address, context }) as VotingVault,
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
