import { BaseContract } from "ethers";

export interface VoterWithPower {
  voter: string;
  power: string;
}

/**
 * The interface all voting vault data sources must implement for the models to
 * work correctly.
 */
export interface VotingVaultDataSource {
  address: string;
  contract: BaseContract;
  getBalance: (voter: string) => Promise<string>;
  getVotingPower: (voter: string, blockNumber: number) => Promise<string>;
  /**
   * Get's the voter's voting power at a given block without taking into account
   * the staleBlockLag. This is useful for showing the user's current voting
   * power in the system. If you wish to see the user's voting power for a given
   * proposal, use getVotingPower instead.
   */
  getVotingPowerView: (voter: string, blockNumber: number) => Promise<string>;
  getAllVotersWithPower: (
    fromBlock?: string | number,
    toBlock?: string | number,
  ) => Promise<VoterWithPower[]>;
}
