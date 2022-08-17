import { filter } from "fuzzaldrin";
import { CouncilContext } from "src/context";
import { Resolvers, Voter } from "src/generated";
import { ProposalModel } from "src/models/Proposal";
import { TotalVotingPowerModel } from "src/models/TotalVotingPower";
import { VoteModel } from "src/models/Vote";
import { VoterModel } from "src/models/Voter";
import { VotingContractModel } from "src/models/VotingContract";
import { VotingPowerModel } from "src/models/VotingPower";
import { VotingVaultModel } from "src/models/VotingVault";

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
    voters: async (_, { addresses, search }, context) => {
      let voters: (Voter | undefined)[] = [];

      if (addresses) {
        voters = await VoterModel.getByAddresses({ addresses });
      } else {
        voters = await VoterModel.getAll({ context });
      }

      if (search) {
        const candidates: string[] = [];

        voters = await Promise.all(
          voters.map(async (voter) => {
            if (!voter) {
              return;
            }

            candidates.push(voter.address);

            const ensName = await VoterModel.getEnsName({ voter, context });
            if (ensName) {
              candidates.push(ensName);
            }

            return {
              ...voter,
              ensName,
            };
          }),
        );

        const matches = filter(candidates, search);

        voters = voters.filter((voter) =>
          voter
            ? matches.includes(voter.address) ||
              matches.includes(voter.ensName || "")
            : false,
        );
      }

      return voters.map((voter) => voter || null);
    },
  },
  VotingContract: {
    balance: async (votingContract, { voter: voterAddress }, context) => {
      const voter = VoterModel.getByAddress({ address: voterAddress });
      const balance = await VoterModel.getBalance({
        voter,
        votingVaults: votingContract.votingVaults,
        context,
      });
      return balance || null;
    },
    proposal: async (votingContract, { id }, context) => {
      const proposal = await ProposalModel.getById({
        id,
        votingContract,
        context,
      });
      return proposal || null;
    },
    proposals: async (votingContract, { ids, isActive }, context) => {
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
      if (typeof isActive !== "undefined") {
        proposals = proposals.filter(
          (proposal) => proposal?.isActive === isActive,
        );
      }
      return proposals.map((proposal) => proposal || null);
    },
    proposalCount: async (votingContract, { isActive }, context) => {
      const allProposals = await ProposalModel.getByVotingContract({
        votingContract,
        context,
      });
      if (typeof isActive !== "undefined") {
        return allProposals.filter((proposal) => proposal.isActive === isActive)
          .length;
      }
      return allProposals.length;
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
    voterCount: async ({ votingVaults }, _, context) => {
      const allVoters = await VoterModel.getByVotingVaults({
        votingVaults: votingVaults,
        context,
      });
      return allVoters.length;
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
    balance: async (votingVault, { voter: voterAddress }, context) => {
      const voter = VoterModel.getByAddress({ address: voterAddress });
      const balance = await VoterModel.getBalance({
        voter,
        votingVaults: [votingVault],
        context,
      });
      return balance || null;
    },
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
    voterCount: async (votingVault, _, context) => {
      const allVoters = await VoterModel.getByVotingVault({
        votingVault: votingVault,
        context,
      });
      return allVoters.length;
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
    voterCount: async ({ votingContract }, _, context) => {
      const allVoters = await VoterModel.getByVotingVaults({
        votingVaults: votingContract.votingVaults,
        context,
      });
      return allVoters.length;
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
    balance: async (voter, { votingVault: votingVaultAddress }, context) => {
      const votingVault = VotingVaultModel.getByAddress({
        address: votingVaultAddress,
        context,
      });
      if (!votingVault) {
        return null;
      }
      const balance = await VoterModel.getBalance({
        voter,
        votingVaults: [votingVault],
        context,
      });
      return balance || null;
    },
    balances: async (
      voter,
      { votingVaults: votingVaultAddresses },
      context,
    ) => {
      const votingVaults = VotingVaultModel.getByAddresses({
        addresses: votingVaultAddresses,
        context,
      });
      const balances = [];
      for (const votingVault of votingVaults) {
        let balance = null;
        if (votingVault) {
          balance = await VoterModel.getBalance({
            voter,
            votingVaults: [votingVault],
            context,
          });
        }
        balances.push(balance || null);
      }
      return balances;
    },
    ensName: (voter, _, context) => {
      return VoterModel.getEnsName({ voter, context });
    },
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
    votingPower: (
      voter,
      { votingVault: votingVaultAddress, blockNumber },
      context,
    ) => {
      const votingVault = VotingVaultModel.getByAddress({
        address: votingVaultAddress,
        context,
      });
      if (!votingVault) {
        return null;
      }
      return VotingPowerModel.getByVoter({
        voter,
        votingVaults: [votingVault],
        blockNumber,
        context,
      });
    },
    votingPowers: (
      voter,
      { votingVaults: votingVaultAddresses, blockNumber },
      context,
    ) => {
      const votingVaults = VotingVaultModel.getByAddresses({
        addresses: votingVaultAddresses,
        context,
      });
      return votingVaults.map((votingVault) => {
        return votingVault
          ? VotingPowerModel.getByVoter({
              voter,
              votingVaults: [votingVault],
              blockNumber,
              context,
            })
          : null;
      });
    },
  },
};
