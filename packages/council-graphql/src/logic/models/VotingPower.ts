import { formatEther } from "ethers/lib/utils";
import { TotalVotingPower, VoterPower, VotingVault } from "src/generated";
import {
  AddressType,
  foundationAddress,
  teamAddress,
} from "src/logic/addresses";
import { getFromBlock, getLatestBlock } from "src/logic/blockNumbers";
import LockingVaultContract from "src/datasources/LockingVaultContract";
import VestingVaultContract from "src/datasources/VestingVaultContract";
import { CouncilResolverContext } from "src/resolvers/context";

// VoterPower & TotalVotingPower
export const VotingPowerModel = {
  async getByVotingVault(
    votingVault: VotingVault,
    blockNumber: number | undefined | null,
    { chainId, dataSources, provider }: CouncilResolverContext,
  ): Promise<TotalVotingPower> {
    blockNumber = blockNumber || (await getLatestBlock(provider));
    let value = BigInt(0);
    const dataSource = getDataSourceByName(
      votingVault.name as AddressType,
      dataSources,
    );
    const hasVoteChangeEvents =
      dataSource instanceof LockingVaultContract ||
      dataSource instanceof VestingVaultContract;
    if (hasVoteChangeEvents) {
      const powerChanges = await dataSource.getVoteChangeEventArgs(
        getFromBlock(chainId),
        blockNumber,
      );
      for (const { to, amount } of powerChanges) {
        // The foundation an team deposits are delegated to the 0x0000...0001
        // address so they can't vote.
        const isVoter = to !== teamAddress && to !== foundationAddress;
        if (isVoter) {
          value += BigInt(amount);
        }
      }
    } else {
      // TODO: how to get TVP for other vaults that don't have a `voteChange`
      // event? GSC voterPowers are a fixed number except for the owner, so a
      // contract call could probably be avoided.
    }
    return {
      blockNumber,
      value: value.toString(),
      votingVaults: [votingVault],
    };
  },

  async getByVotingVaults(
    votingVaults: VotingVault[],
    blockNumber: number | undefined | null,
    context: CouncilResolverContext,
  ): Promise<TotalVotingPower> {
    blockNumber = blockNumber || (await getLatestBlock(context.provider));
    let aggregateValue = BigInt(0);
    await Promise.all(
      votingVaults.map(async (votingVault) => {
        const vaultVotingPower = await this.getByVotingVault(
          votingVault,
          blockNumber,
          context,
        );
        aggregateValue += BigInt(vaultVotingPower.value);
      }),
    );
    return {
      blockNumber,
      value: aggregateValue.toString(),
      votingVaults,
    };
  },

  async getByVoter(
    voter: string,
    votingVaults: VotingVault[],
    blockNumber: number | undefined | null,
    { dataSources, provider }: CouncilResolverContext,
  ): Promise<VoterPower> {
    blockNumber = blockNumber || (await getLatestBlock(provider));
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
          value = await dataSources.gscVault.getVotingPower(voter, blockNumber);
          break;
      }
      aggregateValue += BigInt(value || 0);
    }
    return {
      value: formatEther(aggregateValue),
      voter,
      votingVaults,
      blockNumber,
    };
  },

  getByVoters(
    voters: string[],
    votingVaults: VotingVault[],
    blockNumber: number | undefined | null,
    context: CouncilResolverContext,
  ): Promise<VoterPower[]> {
    return Promise.all(
      voters.map((voter) =>
        this.getByVoter(voter, votingVaults, blockNumber, context),
      ),
    );
  },

  async getIsStale(
    { value, voter, votingVaults, blockNumber }: VoterPower,
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
