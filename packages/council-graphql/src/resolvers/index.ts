import { VotingVaultContract } from "src/datasources/VotingVaultContract";
import { Resolvers } from "src/generated";
import { CouncilContext } from "src/logic/context";
import { ProposalModel } from "src/logic/models/Proposal";
import { TotalVotingPowerModel } from "src/logic/models/TotalVotingPower";
import { VoteModel } from "src/logic/models/Vote";
import { VoterModel } from "src/logic/models/Voter";
import { VotingContractModel } from "src/logic/models/VotingContract";
import { VotingPowerModel } from "src/logic/models/VotingPower";
import { VotingVaultModel } from "src/logic/models/VotingVault";

// TODO: revisit use of name field vs address and potentially remove name fields
// from typeDefs.

export const resolvers: Resolvers<CouncilContext> = {
  Query: {
    coreVoting: (_, __, context) => {
      return (
        VotingContractModel.getByAddress({
          address: context.dataSources.coreVoting.address,
          context,
        }) || null
      );
    },
    gscVoting: (_, __, context) => {
      return (
        VotingContractModel.getByAddress({
          address: context.dataSources.gscVoting.address,
          context,
        }) || null
      );
    },
    lockingVault: (_, __, context) => {
      return (
        VotingVaultModel.getByAddress({
          address: context.dataSources.lockingVault.address,
          context,
        }) || null
      );
    },
    vestingVault: (_, __, context) => {
      return (
        VotingVaultModel.getByAddress({
          address: context.dataSources.vestingVault.address,
          context,
        }) || null
      );
    },
    gscVault: (_, __, context) => {
      return (
        VotingVaultModel.getByAddress({
          address: context.dataSources.gscVault.address,
          context,
        }) || null
      );
    },
    voter: (_, { address }) => {
      return VoterModel.getByAddress({ address });
    },
    voters: (_, { addresses }, context) => {
      if (addresses) {
        return VoterModel.getByAddresses({ addresses });
      } else {
        const votingVaults = VotingVaultModel.getByAddresses({
          addresses: [
            context.dataSources.lockingVault.address,
            context.dataSources.vestingVault.address,
            context.dataSources.gscVault.address,
          ],
          context,
        });
        return VoterModel.getByVotingVaults({
          votingVaults: votingVaults.filter(
            (vault) => !!vault,
          ) as VotingVaultContract[],
          context,
        });
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
    isActive: (proposal, _, context) => {
      return ProposalModel.getIsActive({ proposal, context });
    },
    lastCall: async (proposal, _, context) => {
      return (await ProposalModel.getLastCall({ proposal, context })) || null;
    },
    quorum: async (proposal, _, context) => {
      return (await ProposalModel.getQuorum({ proposal, context })) || null;
    },
    vote: (proposal, { voter: address }, context) => {
      const voter = VoterModel.getByAddress({ address });
      return VoteModel.getByVoter({ voter, proposal, context });
    },
    voters: ({ created, votingContract }, _, context) => {
      return VoterModel.getByVotingVaults({
        votingVaults: votingContract.votingVaults,
        blockNumber: created,
        context,
      });
    },
    votes: (proposal, { voters: addresses }, context) => {
      const voters = VoterModel.getByAddresses({ addresses });
      return VoteModel.getByVoters({ voters, proposal, context });
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
      return VoteModel.getByVoter({
        voter,
        proposal,
        context,
      });
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
      return Promise.all(
        proposals.map((proposal) => {
          if (!proposal) {
            return null;
          }
          return VoteModel.getByVoter({
            voter,
            proposal,
            context,
          });
        }),
      );
    },
  },
};
