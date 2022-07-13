import { Resolvers } from "src/generated";
import { CouncilContext } from "src/logic/context";
import { ProposalModel } from "src/logic/models/Proposal";
import { TotalVotingPowerModel } from "src/logic/models/TotalVotingPower";
import { VoteModel } from "src/logic/models/Vote";
import { VoterModel } from "src/logic/models/Voter";
import { VotingContractModel } from "src/logic/models/VotingContract";
import { VotingPowerModel } from "src/logic/models/VotingPower";
import { VotingVaultModel } from "src/logic/models/VotingVault";

export const resolvers: Resolvers<CouncilContext> = {
  Query: {
    votingContract: (_, { address }, context) => {
      return VotingContractModel.getByAddress({ address, context }) || null;
    },
    votingContracts: (_, { addresses }, context) => {
      // Get all the votingContracts by default if no addresses arg is provided
      if (!addresses) {
        return VotingContractModel.getAll({ context }).map(
          (votingContract) => votingContract || null,
        );
      }

      // TODO: VotingContractModel.getByAddresses
      return addresses.map(
        (address) =>
          VotingContractModel.getByAddress({ address, context }) || null,
      );
    },
    votingVaults: (_, { addresses }, context) => {
      // Get all the votingVaults by default if no addresses arg is provided
      if (!addresses) {
        return VotingVaultModel.getAll({ context }).map(
          (votingVault) => votingVault || null,
        );
      }

      // TODO: VotingVaultModel.getByAddresses
      return addresses.map(
        (address) =>
          VotingVaultModel.getByAddress({ address, context }) || null,
      );
    },
    votingVault: (_, { address }, context) => {
      const result =
        VotingVaultModel.getByAddress({ address, context }) || null;
      return result;
    },
    voter: (_, { address }) => {
      return VoterModel.getByAddress({ address });
    },
    voters: (_, { addresses }, context) => {
      if (addresses) {
        return VoterModel.getByAddresses({ addresses });
      } else {
        return VoterModel.getAll({ context });
      }
    },
  },
  VotingContract: {
    proposal: async (votingContract, { id }, context) => {
      const proposal = await ProposalModel.getById({
        id,
        votingContract,
        context,
      });
      return proposal || null;
    },
    proposals: async (votingContract, { ids }, context) => {
      let proposals = [];
      if (ids) {
        proposals = await ProposalModel.getByIds({
          ids,
          votingContract,
          context,
        });
      } else {
        proposals = await ProposalModel.getByVotingContract({
          votingContract,
          context,
        });
      }
      return proposals.map((proposal) => proposal || null);
    },
    totalVotingPower: ({ votingVaults }, { blockNumber }, context) => {
      return TotalVotingPowerModel.getByVotingVaults({
        votingVaults,
        blockNumber,
        context,
      });
    },
    voters: ({ votingVaults }, _, context) => {
      return VoterModel.getByVotingVaults({
        votingVaults: votingVaults,
        context,
      });
    },
    votingPower: ({ votingVaults }, { voter, blockNumber }, context) => {
      return VotingPowerModel.getByVoter({
        voter: VoterModel.getByAddress({ address: voter }),
        votingVaults,
        blockNumber,
        context,
      });
    },
    votingPowers: async (
      { votingVaults },
      { voters: addresses, blockNumber },
      context,
    ) => {
      const voters = addresses
        ? VoterModel.getByAddresses({ addresses })
        : await VoterModel.getByVotingVaults({ votingVaults, context });

      return VotingPowerModel.getByVoters({
        voters,
        votingVaults,
        blockNumber,
        context,
      });
    },
  },
  VotingVault: {
    totalVotingPower: (votingVault, { blockNumber }, context) => {
      return TotalVotingPowerModel.getByVotingVault({
        votingVault,
        blockNumber,
        context,
      });
    },
    voters: (votingVault, _, context) => {
      return VoterModel.getByVotingVault({ votingVault, context });
    },
    votingPower: (votingVault, { voter: address, blockNumber }, context) => {
      const voter = VoterModel.getByAddress({ address });
      return VotingPowerModel.getByVoter({
        voter,
        votingVaults: [votingVault],
        blockNumber,
        context,
      });
    },
    votingPowers: async (
      votingVault,
      { voters: addresses, blockNumber },
      context,
    ) => {
      const voters = addresses
        ? VoterModel.getByAddresses({ addresses })
        : await VoterModel.getByVotingVault({ votingVault, context });

      return VotingPowerModel.getByVoters({
        voters,
        votingVaults: [votingVault],
        blockNumber,
        context,
      });
    },
  },
  Proposal: {
    isExecuted: (proposal, _, context) => {
      return ProposalModel.getIsExecuted({ proposal, context });
    },
    lastCall: async (proposal, _, context) => {
      return (await ProposalModel.getLastCall({ proposal, context })) || null;
    },
    quorum: async (proposal, _, context) => {
      return (await ProposalModel.getQuorum({ proposal, context })) || null;
    },
    vote: async (proposal, { voter: address }, context) => {
      const voter = VoterModel.getByAddress({ address });
      const vote = await VoteModel.getByVoter({ voter, proposal, context });
      return vote || null;
    },
    voters: ({ created, votingContract }, _, context) => {
      return VoterModel.getByVotingVaults({
        votingVaults: votingContract.votingVaults,
        blockNumber: created,
        context,
      });
    },
    votes: async (proposal, { voters: addresses }, context) => {
      let votes;
      if (addresses) {
        const voters = VoterModel.getByAddresses({ addresses });
        votes = await VoteModel.getByVoters({ voters, proposal, context });
      } else {
        votes = await VoteModel.getByProposal({ proposal, context });
      }
      return votes.map((vote) => vote || null);
    },
    votingPower: ({ votingContract, created }, { voter: address }, context) => {
      const voter = VoterModel.getByAddress({ address });
      return VotingPowerModel.getByVoter({
        voter,
        votingVaults: votingContract.votingVaults,
        blockNumber: created,
        context,
      });
    },
    votingPowers: async (
      { votingContract, created },
      { voters: addresses },
      context,
    ) => {
      const { votingVaults } = votingContract;
      const voters = addresses
        ? VoterModel.getByAddresses({ addresses })
        : await VoterModel.getByVotingVaults({
            votingVaults,
            context,
          });
      return VotingPowerModel.getByVoters({
        voters,
        votingVaults,
        blockNumber: created,
        context,
      });
    },
  },
  VotingPower: {
    isStale: async (votingPower, _, context) => {
      return (
        (await VotingPowerModel.getIsStale({ votingPower, context })) || null
      );
    },
  },
  Voter: {
    vote: async (voter, { proposal: id, votingContract: address }, context) => {
      const votingContract = VotingContractModel.getByAddress({
        address,
        context,
      });
      if (!votingContract) {
        return null;
      }
      const proposal = await ProposalModel.getById({
        id,
        votingContract,
        context,
      });
      if (!proposal) {
        return null;
      }
      const vote = await VoteModel.getByVoter({
        voter,
        proposal,
        context,
      });
      return vote || null;
    },
    votes: async (
      voter,
      { proposals: ids, votingContract: address },
      context,
    ) => {
      const votingContract = VotingContractModel.getByAddress({
        address,
        context,
      });
      if (!votingContract) {
        return null;
      }
      const proposals = await ProposalModel.getByIds({
        ids,
        votingContract,
        context,
      });
      const votes = proposals.map(async (proposal) => {
        if (!proposal) {
          return null;
        }
        const vote = await VoteModel.getByVoter({
          voter,
          proposal,
          context,
        });
        return vote || null;
      });
      return Promise.all(votes);
    },
  },
};
