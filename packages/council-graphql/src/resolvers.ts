import { Resolvers, Ballot } from "src/generated";
import { CoreVoting__factory } from "@elementfi/council-typechain";
import { ProposalsJson } from "@elementfi/council-proposals";
import { getAddressList } from "src/addresses";

const MAINNET_FROM_BLOCK = 14496292;

export const resolvers: Resolvers = {
  Query: {
    // TODO: Remove once codegen operation bug fix has landed
    ping: () => {
      return "pong";
    },
    coreVoting: async (_, __, { provider }) => {
      const { chainId } = await provider.getNetwork();
      return {
        address: getAddressList(chainId).addresses.coreVoting,
      };
    },
  },
  VotingContract: {
    proposals: async (
      { address },
      { ids: idsFilter, verified: verifiedFilter },
      { provider },
    ) => {
      const coreVotingContract = CoreVoting__factory.connect(address, provider);

      const proposalCreatedEvents = await coreVotingContract.queryFilter(
        coreVotingContract.filters.ProposalCreated(),
        MAINNET_FROM_BLOCK,
      );

      const { chainId } = await provider.getNetwork();
      const proposalsUrl = getProposalsJsonUrl(chainId);
      const res = await fetch(proposalsUrl);
      const { proposals: coreProposals } = (await res.json()) as ProposalsJson;
      // proposals with a snapshot id are considered verified, as they have been
      // synced up with their off-chain snapshot proposal.
      // const verifiedProposals = proposalsJson.proposals.filter(({snapshotId}) => !!snapshotId);

      const proposals = proposalCreatedEvents.map((event) => {
        const id = event.args.proposalId.toString();
        const proposalInfo = coreProposals.find(
          ({ proposalId }) => proposalId === id,
        );
        return {
          id,
          votingContract: address,
          verified: !!proposalInfo?.snapshotId,
          title: proposalInfo?.title,
          description: proposalInfo?.description,
          quorum: proposalInfo?.quorum,
        };
      });

      if (idsFilter?.length || typeof verifiedFilter !== "undefined") {
        return proposals;
      }

      return proposals.filter((proposal) => {
        if (!idsFilter?.includes(proposal.id)) {
          return false;
        }
        if (verifiedFilter && !proposal.verified) {
          return false;
        }
      });
    },
  },
  Proposal: {
    vote: async (
      { id, votingContract: votingContractAddress },
      { voter },
      { provider },
    ) => {
      const coreVotingContract = CoreVoting__factory.connect(
        votingContractAddress,
        provider,
      );

      const votes = await coreVotingContract.functions.votes(voter, id);

      // TODO: Make custom scalar for Ballot
      const castBallot = ["Yes", "No", "Abstain"][votes.castBallot] as Ballot;

      return {
        votingPower: votes.votingPower.toString(),
        castBallot,
      };
    },
  },
};

function getProposalsJsonUrl(chainId: number) {
  if (chainId === 1) {
    return "https://elementfi.s3.us-east-2.amazonaws.com/mainnet.proposals.json";
  }

  if (chainId === 5) {
    return "https://elementfi.s3.us-east-2.amazonaws.com/goerli.proposals.json";
  }

  // default to local
  return "https://elementfi.s3.us-east-2.amazonaws.com/testnet.proposals.json";
}

function getGscProposalsJsonUrl(chainId: number) {
  if (chainId === 1) {
    return "https://elementfi.s3.us-east-2.amazonaws.com/mainnet-gsc.proposals.json";
  }
  if (chainId === 5) {
    return "https://elementfi.s3.us-east-2.amazonaws.com/goerli-gsc.proposals.json";
  }
  if (chainId === 31337) {
    return "https://elementfi.s3.us-east-2.amazonaws.com/testnet-gsc.proposals.json";
  }
}
