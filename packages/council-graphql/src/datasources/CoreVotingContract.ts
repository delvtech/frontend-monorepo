import { Provider } from "@ethersproject/providers";
import LRUCache from "lru-cache";
import { cached, getCacheKey } from "@elementfi/base";
import { CoreVoting__factory, CoreVoting } from "@elementfi/council-typechain";
import { VotingVaultDataSource } from "./VotingVaultDataSource";

// TODO: implement Dataloader (https://github.com/graphql/dataloader)
export class CoreVotingContract {
  address: string;
  contract: CoreVoting;
  votingVaults: VotingVaultDataSource[];
  cache: LRUCache<string, any>;

  constructor(
    address: string,
    provider: Provider,
    votingVaults: VotingVaultDataSource[],
  ) {
    this.address = address;
    this.contract = CoreVoting__factory.connect(address, provider);
    this.votingVaults = votingVaults || [];
    this.cache = new LRUCache({
      max: 500,
    });
  }

  async getProposalCreatedEventArgs(
    fromBlock?: string | number,
    toBlock?: string | number,
  ): Promise<
    {
      proposalId: string;
      created: number;
      execution: number;
      expiration: number;
    }[]
  > {
    return cached({
      cache: this.cache,
      cacheKey: getCacheKey("getProposalCreatedEventArgs", [
        fromBlock,
        toBlock,
      ]),
      callback: async () => {
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
      },
    });
  }

  async getProposalById(id: string): Promise<{
    proposalHash: string;
    created: number;
    unlock: number;
    expiration: number;
    lastCall: number;
    quorum: string;
  }> {
    return cached({
      cache: this.cache,
      cacheKey: getCacheKey("getProposalById", [id]),
      callback: async () => {
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
      },
    });
  }

  async getVote(
    voter: string,
    proposalId: string,
  ): Promise<{
    votingPower: string;
    castBallot: number;
  }> {
    return cached({
      cache: this.cache,
      cacheKey: getCacheKey("getVote", [voter, proposalId]),
      callback: async () => {
        const { votingPower, castBallot } = await this.contract.functions.votes(
          voter,
          proposalId,
        );
        return {
          votingPower: votingPower.toString(),
          castBallot,
        };
      },
    });
  }
}
