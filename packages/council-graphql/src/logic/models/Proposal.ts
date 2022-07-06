import { CoreVotingContract } from "src/datasources/CoreVotingContract";
import { Proposal, VotingContract } from "src/generated";
import { CouncilContext } from "src/logic/context";
import { getDataSourceByAddress } from "src/logic/utils/getDataSourceByAddress";
import { getFromBlockNumber } from "src/logic/utils/getFromBlockNumber";

const EXECUTED_PROPOSAL_HASH =
  "0x0000000000000000000000000000000000000000000000000000000000000000";

// type GetByIdsOptions =

interface ProposalModel {
  getByIds: (options: {
    ids: string[];
    votingContract: VotingContract;
    context: CouncilContext;
  }) => Promise<(Proposal | undefined)[]>;

  getById: (options: {
    id: string;
    votingContract: VotingContract;
    context: CouncilContext;
  }) => Promise<Proposal | undefined>;

  getByVotingContract: (options: {
    votingContract: VotingContract;
    context: CouncilContext;
  }) => Promise<Proposal[]>;

  getIsActive: (options: {
    proposal: Proposal;
    context: CouncilContext;
  }) => Promise<boolean>;

  getLastCall: (options: {
    proposal: Proposal;
    context: CouncilContext;
  }) => Promise<Proposal["lastCall"]>;

  getQuorum: (options: {
    proposal: Proposal;
    context: CouncilContext;
  }) => Promise<Proposal["quorum"]>;
}

export const ProposalModel: ProposalModel = {
  async getByIds({ ids, votingContract, context }) {
    const allProposals = await this.getByVotingContract({
      votingContract,
      context,
    });

    return ids.map((id) => allProposals.find((proposal) => proposal.id === id));
  },

  async getById({ id, votingContract, context }) {
    const proposals = await this.getByIds({
      ids: [id],
      votingContract,
      context,
    });
    return proposals[0];
  },

  async getIsActive({ proposal, context }) {
    const dataSource = getDataSourceByAddress(
      proposal.votingContract.address,
      context.councilDataSources,
    ) as CoreVotingContract;
    const { proposalHash } = await dataSource.getProposalById(proposal.id);
    return proposalHash !== EXECUTED_PROPOSAL_HASH;
  },

  async getLastCall({ proposal, context }) {
    const dataSource = getDataSourceByAddress(
      proposal.votingContract.address,
      context.councilDataSources,
    ) as CoreVotingContract;

    const { proposalHash, lastCall } = await dataSource.getProposalById(
      proposal.id,
    );

    if (proposalHash === EXECUTED_PROPOSAL_HASH) {
      return lastCall;
    }
  },

  async getQuorum({ proposal, context }) {
    const dataSource = getDataSourceByAddress(
      proposal.votingContract.address,
      context.councilDataSources,
    ) as CoreVotingContract;

    const { proposalHash, quorum } = await dataSource.getProposalById(
      proposal.id,
    );

    if (proposalHash === EXECUTED_PROPOSAL_HASH) {
      return quorum;
    }
  },

  async getByVotingContract({ votingContract, context }) {
    const dataSource = getDataSourceByAddress(
      votingContract.address,
      context.councilDataSources,
    ) as CoreVotingContract;

    if (!dataSource) {
      return [];
    }
    const args = await dataSource.getProposalCreatedEventArgs(
      getFromBlockNumber(context.chainId),
    );
    return args.map(({ created, execution, expiration, proposalId }) => {
      return {
        id: proposalId,
        votingContract,
        created,
        expiration,
        unlock: execution,
      };
    });
  },
};
