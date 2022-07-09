import { VotingVaultContract } from "src/datasources/VotingVaultContract";
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
  // TODO: Revisit logic for calculating voting power based on vault type, eg:
  // disambiguate the list of vaults, instead of falling through
  async getByVotingVaults({
    votingVaults,
    blockNumber,
    context: { councilDataSources },
  }) {
    const voterPowers: Record<string, bigint> = {};

    for (const votingVault of votingVaults) {
      const dataSource = getVotingVaultDataSourceByAddress(
        votingVault.address,
        councilDataSources,
      ) as VotingVaultContract;

      // any change of voting power (delegating, depositing more ELFI, etc..)
      // will trigger this event on certain voting vaults.
      const powerChanges = await dataSource.getVoteChangeEventArgs(
        undefined,
        blockNumber,
      );
      if (powerChanges) {
        for (const { to, amount } of powerChanges) {
          voterPowers[to] = voterPowers[to] || BigInt(0);
          voterPowers[to] += BigInt(amount);
        }
      }

      // voting power can be calculated on voting vaults that don't have a
      // VoteChange event by looking at membershipProved events.
      const members = await dataSource.getMembershipProvedEventArgs(
        undefined,
        blockNumber,
      );
      if (members) {
        for (const { who } of members) {
          voterPowers[who] = voterPowers[who] || BigInt(0);
          voterPowers[who] += BigInt(1);
        }
      }
    }

    const voterAddressesWithPower = Object.entries(voterPowers)
      .filter(([, power]) => power > 0)
      .map(([address]) => address);

    return this.getByAddresses({ addresses: voterAddressesWithPower });
  },
};
