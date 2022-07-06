import { VotingVaultContract } from "src/datasources/VotingVaultContract";
import { VotingVault } from "src/generated";
import { CouncilContext } from "../context";

interface VotingVaultModel {
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
  getByAddress({ address }) {
    return { address };
  },
  getByAddresses({ addresses }): VotingVault[] {
    return addresses.map((address) => ({
      address,
    }));
  },
};
