import { formatEther } from "ethers/lib/utils";
import { VotingVaultContract } from "src/datasources/VotingVaultContract";
import { Voter, VotingPower, VotingVault } from "src/generated";
import { getLatestBlockNumber } from "src/logic/utils/getLatestBlockNumber";
import { CouncilContext } from "../context";
import { getDataSourceByAddress } from "../utils/getDataSourceByAddress";

interface VotingPowerModel {
  getByVoter: (options: {
    voter: Voter;
    blockNumber?: number | undefined | null;
    votingVaults: VotingVault[];
    context: CouncilContext;
  }) => Promise<VotingPower>;

  getByVoters: (options: {
    voters: Voter[];
    votingVaults: VotingVault[];
    blockNumber: number | undefined | null;
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
    for (const { address } of votingVaults) {
      const dataSource = getDataSourceByAddress(address, councilDataSources);
      if (dataSource instanceof VotingVaultContract) {
        const vaultPower = await dataSource.getVotingPowerView(
          voter.address,
          blockNumber,
        );
        aggregateValue += BigInt(vaultPower);
      }
    }
    return {
      value: formatEther(aggregateValue),
      voter,
      votingVaults,
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
        const dataSource = getDataSourceByAddress(address, councilDataSources);

        if (dataSource instanceof VotingVaultContract) {
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
