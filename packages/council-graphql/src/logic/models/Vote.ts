import { formatEther } from "ethers/lib/utils";
import { Ballot, Proposal, Vote, Voter } from "src/generated";
import { CouncilContext } from "src/logic/context";
import { getVotingContractDataSourceByAddress } from "src/logic/utils/getDataSourceByAddress";
import { VoterModel } from "./Voter";

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

  getByProposal: (options: {
    proposal: Proposal;
    context: CouncilContext;
  }) => Promise<Vote[]>;
}

export const VoteModel: VoteModel = {
  async getByVoter({ voter, proposal, context: { councilDataSources } }) {
    const { id, votingContract } = proposal;
    const dataSource = getVotingContractDataSourceByAddress(
      votingContract.address,
      councilDataSources,
    );
    const { votingPower, castBallot } = await dataSource.getVote(
      voter.address,
      id,
    );
    return {
      voter,
      proposal,
      power: formatEther(votingPower),
      castBallot:
        BigInt(votingPower) > 0
          ? (["Yes", "No", "Abstain"][castBallot] as Ballot)
          : null,
    };
  },

  getByVoters({ voters, proposal, context }) {
    return Promise.all(
      voters.map((voter) => this.getByVoter({ voter, proposal, context })),
    );
  },

  async getByProposal({ proposal, context }) {
    const voters = await VoterModel.getByVotingVaults({
      votingVaults: proposal.votingContract.votingVaults,
      context,
    });
    return this.getByVoters({
      voters,
      proposal,
      context,
    });
  },
};
