import { formatEther } from "ethers/lib/utils";
import { CouncilContext } from "src/context";
import { Voter, VotingPower, VotingVault } from "src/generated";
import { getVotingVaultDataSourceByAddress } from "src/utils/getDataSourceByAddress";
import { getLatestBlockNumber } from "src/utils/getLatestBlockNumber";

interface VotingPowerModel {
  getByVoter: (options: {
    voter: Voter;
    blockNumber?: number | null;
    votingVaults: VotingVault[];
    context: CouncilContext;
  }) => Promise<VotingPower>;

  getByVoters: (options: {
    voters: Voter[];
    blockNumber?: number | null;
    votingVaults: VotingVault[];
    context: CouncilContext;
  }) => Promise<VotingPower[]>;

  getIsStale: (options: {
    votingPower: VotingPower;
    context: CouncilContext;
  }) => Promise<boolean | undefined>;
}

export const VotingPowerModel: VotingPowerModel = {
  async getByVoter({
    voter,
    blockNumber,
    votingVaults,
    context: { councilDataSources, provider },
  }) {
    blockNumber = blockNumber || (await getLatestBlockNumber(provider));
    let aggregateValue = BigInt(0);
    const validVaults: VotingVault[] = [];

    for (const vault of votingVaults) {
      const { address } = vault;
      const dataSource = getVotingVaultDataSourceByAddress(
        address,
        councilDataSources,
      );
      if (dataSource) {
        const vaultPower = await dataSource.getVotingPowerView(
          voter.address,
          blockNumber,
        );
        aggregateValue += BigInt(vaultPower);
        validVaults.push(vault);
      }
    }

    return {
      value: formatEther(aggregateValue),
      voter,
      votingVaults: validVaults,
      blockNumber,
    };
  },

  getByVoters({ voters, votingVaults, blockNumber, context }) {
    return Promise.all(
      voters.map((voter) =>
        this.getByVoter({ voter, votingVaults, blockNumber, context }),
      ),
    );
  },

  async getIsStale({
    votingPower: { value, voter, votingVaults, blockNumber },
    context: { councilDataSources, provider },
  }) {
    const latestBlock = await getLatestBlockNumber(provider);
    if (blockNumber === latestBlock) {
      return false;
    } else {
      let isStale;
      for (const { address } of votingVaults) {
        const dataSource = getVotingVaultDataSourceByAddress(
          address,
          councilDataSources,
        );

        if (dataSource) {
          const valueAtBlock = await dataSource?.getVotingPower(
            voter.address,
            blockNumber,
          );
          if (!Number(valueAtBlock) && Number(value) > 0) {
            return true;
          } else {
            isStale = false;
          }
        }
      }
      return isStale;
    }
  },
};
