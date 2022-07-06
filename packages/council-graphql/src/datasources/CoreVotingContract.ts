import { Provider } from "@ethersproject/providers";
import { CoreVoting__factory, CoreVoting } from "@elementfi/council-typechain";
import { VotingVaultContract } from "./VotingVaultContract";

// TODO: implement Dataloader (https://github.com/graphql/dataloader)
export class CoreVotingContract {
  address: string;
  contract: CoreVoting;
  votingVaults: VotingVaultContract[];

  constructor(
    address: string,
    provider: Provider,
    votingVaults: VotingVaultContract[],
  ) {
    this.address = address;
    this.contract = CoreVoting__factory.connect(address, provider);
    this.votingVaults = votingVaults || [];
  }

  async getProposalCreatedEventArgs(
    fromBlock?: string | number,
    toBlock?: string | number,
  ) {
    const proposalCreatedEvents = await this.contract.queryFilter(
      this.contract.filters.ProposalCreated(),
      fromBlock,
      toBlock,
    );
    return proposalCreatedEvents.map(
      ({ args: { proposalId, created, execution, expiration } }) => {
        return {
          proposalId: proposalId.toString(),
          created: created.toNumber(),
          execution: execution.toNumber(),
          expiration: expiration.toNumber(),
        };
      },
    );
  }

  async getProposalById(id: string) {
    const { proposalHash, created, unlock, expiration, quorum, lastCall } =
      await this.contract.functions.proposals(id);
    return {
      proposalHash,
      created: created.toNumber(),
      unlock: unlock.toNumber(),
      expiration: expiration.toNumber(),
      lastCall: lastCall.toNumber(),
      quorum: quorum.toString(),
    };
  }

  async getVote(voter: string, proposalId: string) {
    return this.contract.functions.votes(voter, proposalId);
  }
}
