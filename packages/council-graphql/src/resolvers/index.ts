import { Resolvers } from "src/generated";
import { ProposalModel } from "src/logic/models/Proposal";
import { VoteModel } from "src/logic/models/Vote";
import { VotingContractModel } from "src/logic/models/VotingContract";
import { VotingPowerModel } from "src/logic/models/VotingPower";
import { VotingVaultModel } from "src/logic/models/VotingVault";
import { CouncilResolverContext } from "./context";

export const resolvers: Resolvers<CouncilResolverContext> = {
  Query: {
    coreVoting: (_, __, context) => {
      return VotingContractModel.getByName("coreVoting", context);
    },
    gscVoting: (_, __, context) => {
      return VotingContractModel.getByName("gscCoreVoting", context);
    },
    lockingVault: (_, __, context) => {
      return VotingVaultModel.getByName("lockingVault", context);
    },
    vestingVault: (_, __, context) => {
      return VotingVaultModel.getByName("vestingVault", context);
    },
    gscVault: (_, __, context) => {
      return VotingVaultModel.getByName("gscVault", context);
    },
  },
  VotingContract: {
    proposal: (votingContract, { id }, context) => {
      return ProposalModel.getById(id, votingContract, context);
    },
    proposals: async (votingContract, { ids, isVerified }, context) => {
      let unfiltered = [];
      if (ids) {
        unfiltered = await ProposalModel.getByIds(ids, votingContract, context);
      } else {
        unfiltered = await ProposalModel.getByVotingContract(
          votingContract,
          context,
        );
      }
      if (typeof isVerified === "undefined") {
        return unfiltered;
      }
      return unfiltered.filter(
        (proposal) => proposal.isVerified === isVerified,
      );
    },
    votingPower: ({ votingVaults }, { voter, blockNumber }, context) => {
      return VotingPowerModel.getByVoter(
        voter,
        votingVaults,
        blockNumber,
        context,
      );
    },
    votingPowers: ({ votingVaults }, { voters, blockNumber }, context) => {
      return VotingPowerModel.getByVoters(
        voters,
        votingVaults,
        blockNumber,
        context,
      );
    },
  },
  VotingVault: {
    votingPower: (votingVault, { voter, blockNumber }, context) => {
      return VotingPowerModel.getByVoter(
        voter,
        [votingVault],
        blockNumber,
        context,
      );
    },
    votingPowers: (votingVault, { voters, blockNumber }, context) => {
      return VotingPowerModel.getByVoters(
        voters,
        [votingVault],
        blockNumber,
        context,
      );
    },
  },
  Proposal: {
    vote: (proposal, { voter }, context) => {
      return VoteModel.getByVoter(voter, proposal, context);
    },
    votes: (proposal, { voters }, context) => {
      return VoteModel.getByVoters(voters, proposal, context);
    },
    votingPower: ({ votingContract, created }, { voter }, context) => {
      return VotingPowerModel.getByVoter(
        voter,
        votingContract.votingVaults,
        created,
        context,
      );
    },
    votingPowers: ({ votingContract, created }, { voters }, context) => {
      return VotingPowerModel.getByVoters(
        voters,
        votingContract.votingVaults,
        created,
        context,
      );
    },
  },
  VotingPower: {
    isStale: (votingPower, _, context) => {
      return VotingPowerModel.getIsStale(votingPower, context);
    },
  },
};
