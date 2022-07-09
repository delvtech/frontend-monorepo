import { formatEther, parseEther } from "ethers/lib/utils";
import { VotingVaultContract } from "src/datasources/VotingVaultContract";
import { TotalVotingPower, VotingVault } from "src/generated";
import { CouncilContext } from "src/logic/context";
import { getVotingVaultDataSourceByAddress } from "src/logic/utils/getDataSourceByAddress";
import { getFromBlockNumber } from "src/logic/utils/getFromBlockNumber";
import { getLatestBlockNumber } from "src/logic/utils/getLatestBlockNumber";

// TODO: Should this come from method arguments as `excludeAddresses`?
const nonVoters = [
  "0x0000000000000000000000000000000000000000",
  "0x0000000000000000000000000000000000000001",
];

interface TotalVotingPowerModel {
  getByVotingVault: (options: {
    votingVault: VotingVault;
    blockNumber: number | undefined | null;
    context: CouncilContext;
  }) => Promise<TotalVotingPower>;

  getByVotingVaults: (options: {
    votingVaults: VotingVault[];
    blockNumber: number | undefined | null;
    context: CouncilContext;
  }) => Promise<TotalVotingPower>;
}

export const TotalVotingPowerModel: TotalVotingPowerModel = {
  async getByVotingVault({ votingVault, blockNumber, context }) {
    const { chainId, councilDataSources, provider } = context;
    const dataSource = getVotingVaultDataSourceByAddress(
      votingVault.address,
      councilDataSources,
    ) as VotingVaultContract;

    let total = BigInt(0);
    blockNumber = blockNumber || (await getLatestBlockNumber(provider));

    const powerChanges = await dataSource.getVoteChangeEventArgs(
      getFromBlockNumber(chainId),
      blockNumber,
    );
    if (powerChanges) {
      for (const { to, amount } of powerChanges) {
        if (!nonVoters.includes(to)) {
          total += BigInt(amount);
        }
      }
    }
    return {
      blockNumber,
      value: formatEther(total),
      votingVaults: [votingVault],
    };
  },

  async getByVotingVaults({ votingVaults, blockNumber, context }) {
    blockNumber = blockNumber || (await getLatestBlockNumber(context.provider));
    let aggregateValue = BigInt(0);
    await Promise.all(
      votingVaults.map(async (votingVault) => {
        const vaultVotingPower = await this.getByVotingVault({
          votingVault,
          blockNumber,
          context,
        });
        aggregateValue += parseEther(vaultVotingPower.value).toBigInt();
      }),
    );
    return {
      blockNumber,
      value: formatEther(aggregateValue),
      votingVaults,
    };
  },
};
