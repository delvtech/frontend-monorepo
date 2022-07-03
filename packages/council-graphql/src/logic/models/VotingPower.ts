import { formatEther } from "ethers/lib/utils";
import { VotingPower, VotingVault } from "src/generated";
import { CouncilResolverContext } from "src/resolvers/context";
import { AddressType } from "src/logic/addresses";
import { getLatestBlock } from "src/logic/blockNumbers";

export const VotingPowerModel = {
  async getByVoters(
    voters: string[],
    votingVaults: VotingVault[],
    blockNumber: number | undefined | null,
    { dataSources, provider }: CouncilResolverContext,
  ): Promise<VotingPower[]> {
    blockNumber = blockNumber || (await getLatestBlock(provider));
    const votingPowers = [];

    for (const voter of voters) {
      let aggregateValue = BigInt(0);

      for (const { name } of votingVaults) {
        let value;
        switch (name) {
          case "lockingVault":
            value = await dataSources.lockingVault.getVotingPowerView(
              voter,
              blockNumber,
            );
            break;
          case "vestingVault":
            value = await dataSources.vestingVault.getVotingPowerView(
              voter,
              blockNumber,
            );
            break;
          case "gscVault":
            value = await dataSources.gscVault.getVotingPower(
              voter,
              blockNumber,
            );
            break;
        }
        aggregateValue += BigInt(value || 0);
      }
      votingPowers.push({
        value: formatEther(aggregateValue),
        voter,
        votingVaults,
        blockNumber,
      });
    }

    return votingPowers;
  },
  async getByVoter(
    voter: string,
    votingVaults: VotingVault[],
    blockNumber: number | undefined | null,
    context: CouncilResolverContext,
  ): Promise<VotingPower> {
    const votingPowers = await this.getByVoters(
      [voter],
      votingVaults,
      blockNumber,
      context,
    );
    return votingPowers[0];
  },
  async getIsStale(
    { value, voter, votingVaults, blockNumber }: VotingPower,
    { dataSources, provider }: CouncilResolverContext,
  ): Promise<boolean | null> {
    const latestBlock = await getLatestBlock(provider);
    if (blockNumber === latestBlock) {
      return false;
    } else {
      for (const { name } of votingVaults) {
        const dataSource = getDataSourceByName(
          name as AddressType,
          dataSources,
        );
        const valueAtBlock = await dataSource?.getVotingPower(
          voter,
          blockNumber,
        );
        if (Number(valueAtBlock) === 0 && Number(value) > 0) {
          return true;
        }
        return false;
      }
      return null;
    }
  },
};

function getDataSourceByName(
  name: AddressType,
  dataSources: CouncilResolverContext["dataSources"],
) {
  switch (name) {
    case "lockingVault":
      return dataSources.lockingVault;
    case "vestingVault":
      return dataSources.vestingVault;
    case "gscVault":
      return dataSources.gscVault;
  }
}
