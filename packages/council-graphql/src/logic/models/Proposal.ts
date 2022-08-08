import { CoreVotingContract } from "src/datasources/CoreVotingContract";
import { Proposal, VotingContract } from "src/generated";
import { CouncilContext } from "src/logic/context";
import { getVotingContractDataSourceByAddress } from "src/logic/utils/getDataSourceByAddress";
import { getFromBlockNumber } from "src/logic/utils/getFromBlockNumber";
import { getLatestBlockNumber } from "src/logic/utils/getLatestBlockNumber";

const EXECUTED_PROPOSAL_HASH =
  "0x0000000000000000000000000000000000000000000000000000000000000000";

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

  getIsExecuted: (options: {
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

  async getByVotingContract({ votingContract, context }) {
    const dataSource = getVotingContractDataSourceByAddress(
      votingContract.address,
      context.councilDataSources,
    );

    if (!dataSource) {
      return [];
    }
    const latestBlock = await getLatestBlockNumber(context.provider);
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
        isActive: expiration >= latestBlock,
      };
    });
  },

  async getIsExecuted({ proposal, context }) {
    const { proposalHash } = await getByIdFromDataSource(proposal, context);
    return proposalHash === EXECUTED_PROPOSAL_HASH;
  },

  async getLastCall({ proposal, context }) {
    const { proposalHash, lastCall } = await getByIdFromDataSource(
      proposal,
      context,
    );
    if (proposalHash !== EXECUTED_PROPOSAL_HASH) {
      return lastCall;
    }
  },

  async getQuorum({ proposal, context }) {
    const { proposalHash, quorum } = await getByIdFromDataSource(
      proposal,
      context,
    );
    if (proposalHash !== EXECUTED_PROPOSAL_HASH) {
      return quorum;
    }
  },
};

// TODO: Remove type casting
function getByIdFromDataSource(proposal: Proposal, context: CouncilContext) {
  const dataSource = getVotingContractDataSourceByAddress(
    proposal.votingContract.address,
    context.councilDataSources,
  ) as CoreVotingContract;

  return dataSource.getProposalById(proposal.id);
}
