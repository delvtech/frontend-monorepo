import { VotingVaultContract } from "src/datasources/VotingVaultContract";
import { Voter, VotingVault } from "src/generated";
import { CouncilContext } from "src/logic/context";
import { getDataSourceByAddress } from "src/logic/utils/getDataSourceByAddress";

interface VoterModel {
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
    const voterPowers: Record<string, bigint> = {};

    for (const votingVault of votingVaults) {
      const dataSource = getDataSourceByAddress(
        votingVault.address,
        councilDataSources,
      ) as VotingVaultContract;
      const powerChanges = await dataSource.getVoteChangeEventArgs(
        undefined,
        blockNumber,
      );
      for (const { to, amount } of powerChanges) {
        voterPowers[to] = voterPowers[0] || BigInt(0);
        voterPowers[to] += BigInt(amount);
      }
    }

    const voterAddressesWithPower = Object.entries(voterPowers)
      .filter(([, power]) => power > 0)
      .map(([address]) => address);

    return this.getByAddresses({ addresses: voterAddressesWithPower });
  },
};
