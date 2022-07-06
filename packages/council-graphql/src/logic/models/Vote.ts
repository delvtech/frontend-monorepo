import { formatEther } from "ethers/lib/utils";
import { CoreVotingContract } from "src/datasources/CoreVotingContract";
import { Ballot, Proposal, Vote, Voter } from "src/generated";
import { CouncilContext } from "src/logic/context";
import { getDataSourceByAddress } from "src/logic/utils/getDataSourceByAddress";

interface VoteModel {
  getByVoter: (options: {
    voter: Voter;
    proposal: Proposal;
    context: CouncilContext;
  }) => Promise<Vote>;

  getByVoters: (options: {
    voters: Voter[];
    proposal: Proposal;
    context: CouncilContext;
  }) => Promise<Vote[]>;
}

export const VoteModel: VoteModel = {
  async getByVoter({ voter, proposal, context: { councilDataSources } }) {
    const { id, votingContract } = proposal;
    let dataSource = getDataSourceByAddress(
      votingContract.address,
      councilDataSources,
    ) as CoreVotingContract;
    const { votingPower, castBallot } = await dataSource.getVote(
      voter.address,
      id,
    );
    return {
      voter,
      proposal,
      power: formatEther(votingPower),
      castBallot:
        votingPower.toBigInt() > 0
          ? (["Yes", "No", "Abstain"][castBallot] as Ballot)
          : null,
    };
  },

  getByVoters({ voters, proposal, context }) {
    return Promise.all(
      voters.map((voter) => this.getByVoter({ voter, proposal, context })),
    );
  },
};
