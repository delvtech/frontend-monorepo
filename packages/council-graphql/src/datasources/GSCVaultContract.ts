import { BigNumber } from "ethers";
import { Provider } from "@ethersproject/providers";
import LRUCache from "lru-cache";
import { cached, getCacheKey } from "@elementfi/base";
import { GSCVault, GSCVault__factory } from "@elementfi/council-typechain";
import { VoterWithPower } from "./VotingVaultDataSource";
import { VotingVaultContract } from "./VotingVaultContract";

// TODO: implement Dataloader (https://github.com/graphql/dataloader)
export class GSCVaultContract extends VotingVaultContract {
  contract: GSCVault;
  cache: LRUCache<string, any>;

  constructor(address: string, provider: Provider) {
    const contract = GSCVault__factory.connect(address, provider);
    const cache = new LRUCache<string, any>({ max: 500 });
    super(address, contract, cache);
    this.contract = contract;
    this.cache = cache;
  }

  async getAllVotersWithPower(
    fromBlock?: string | number,
    toBlock?: string | number,
  ): Promise<VoterWithPower[]> {
    return cached({
      cache: this.cache,
      cacheKey: getCacheKey("getAllVotersWithPower", [fromBlock, toBlock]),
      callback: async () => {
        const latestJoinTimestampByMember: Record<string, BigNumber> = {};
        const joinEvents = await this.contract.queryFilter(
          this.contract.filters.MembershipProved(),
          fromBlock,
          toBlock,
        );
        for (const { args } of joinEvents) {
          const { who, when } = args;
          if (
            !latestJoinTimestampByMember[who] ||
            when.gt(latestJoinTimestampByMember[who])
          ) {
            latestJoinTimestampByMember[who] = when;
          }
        }
        const kickEvents = await this.contract.queryFilter(
          this.contract.filters.Kicked(),
          fromBlock,
          toBlock,
        );
        for (const { args } of kickEvents) {
          const { who, when } = args;
          if (
            latestJoinTimestampByMember[who] &&
            when.gt(latestJoinTimestampByMember[who])
          ) {
            // if they were kicked after their latest join timestamp, remove them
            // from the record.
            delete latestJoinTimestampByMember[who];
          }
        }
        return Object.keys(latestJoinTimestampByMember).map((voter) => ({
          voter,
          power: "1", // all active GSC members have 1 voting power
        }));
      },
    });
  }
}
