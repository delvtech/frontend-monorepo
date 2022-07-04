import { formatEther } from "ethers/lib/utils";
import { Ballot, Proposal, Vote } from "src/generated";
import { AddressType } from "src/logic/addresses";
import { CouncilResolverContext } from "src/resolvers/context";

export const VoteModel = {
  async getByVoter(
    voter: string,
    { id, votingContract }: Proposal,
    { dataSources }: CouncilResolverContext,
  ): Promise<Vote> {
    let dataSource = getDataSourceByName(
      votingContract.name as AddressType,
      dataSources,
    );

    const { votingPower, castBallot } = await dataSource.getVote(voter, id);
    return {
      voter,
      power: formatEther(votingPower),
      castBallot:
        votingPower.toBigInt() > 0
          ? (["Yes", "No", "Abstain"][castBallot] as Ballot)
          : null,
    };
  },

  getByVoters(
    voters: string[],
    proposal: Proposal,
    context: CouncilResolverContext,
  ): Promise<Vote[]> {
    return Promise.all(
      voters.map((voter) => this.getByVoter(voter, proposal, context)),
    );
  },
};

function getDataSourceByName(
  name: AddressType,
  dataSources: CouncilResolverContext["dataSources"],
) {
  switch (name) {
    case "gscCoreVoting":
      return dataSources.gscVoting;
    case "coreVoting":
    default:
      return dataSources.coreVoting;
  }
}
