import LRUCache from "lru-cache";
import { formatEther } from "ethers/lib/utils";
import { CouncilContext } from "src/context";
import { Voter, VotingVault } from "src/generated";
import { getVotingVaultDataSourceByAddress } from "src/utils/getDataSourceByAddress";
import { VotingVaultModel } from "./VotingVault";
import { cached, getCacheKey } from "@elementfi/base";

const cache = new LRUCache<string, string>({ max: 500 });
interface VoterModel {
  getAll: (options: { context: CouncilContext }) => Promise<Voter[]>;
  getBalance: (options: {
    voter: Voter;
    votingVaults: VotingVault[];
    context: CouncilContext;
  }) => Promise<string | undefined>;
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
  getEnsName: (options: {
    voter: Voter;
    context: CouncilContext;
  }) => Promise<string | null>;
}

export const VoterModel: VoterModel = {
  getAll({ context }) {
    const votingVaults = VotingVaultModel.getAll({ context });
    return this.getByVotingVaults({ votingVaults, context });
  },
  async getBalance({ voter, votingVaults, context }) {
    let balance = BigInt(0);
    for (const votingVault of votingVaults) {
      const dataSource = getVotingVaultDataSourceByAddress(
        votingVault.address,
        context.councilDataSources,
      );
      if (dataSource) {
        const vaultBalance = await dataSource.getBalance(voter.address);
        balance += BigInt(vaultBalance);
      }
    }
    return formatEther(balance);
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
  getEnsName({ voter, context }) {
    return cached({
      cache,
      cacheKey: getCacheKey("getEnsName", [voter.address]),
      callback: () => context.provider.lookupAddress(voter.address),
    });
  },
};
