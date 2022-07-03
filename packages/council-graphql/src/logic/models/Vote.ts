import { formatEther } from "ethers/lib/utils";
import { Ballot, Proposal, Vote } from "src/generated";
import { CouncilResolverContext } from "src/resolvers/context";
import CoreVotingContract from "src/datasources/CoreVotingContract";

export const VoteModel = {
  async getByVoters(
    voters: string[],
    { id, votingContract }: Proposal,
    { dataSources }: CouncilResolverContext,
  ): Promise<Vote[]> {
    let dataSource: CoreVotingContract | undefined;
    if (votingContract.name === "coreVoting") {
      dataSource = dataSources.coreVoting;
    } else if (votingContract.name === "gscCoreVoting") {
      dataSource = dataSources.gscVoting;
    }

    if (!dataSource) {
      return [];
    }

    return await Promise.all(
      voters.map(async (voter) => {
        const { votingPower, castBallot } = await (
          dataSource as CoreVotingContract
        ).getVote(voter, id);
        return {
          voter,
          power: formatEther(votingPower),
          castBallot:
            votingPower.toBigInt() > 0
              ? (["Yes", "No", "Abstain"][castBallot] as Ballot)
              : null,
        };
      }),
    );
  },
  async getByVoter(
    voter: string,
    proposal: Proposal,
    context: CouncilResolverContext,
  ): Promise<Vote> {
    const votes = await this.getByVoters([voter], proposal, context);
    return votes[0];
  },
};
